import React from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {getAllCursos,deleteCurso,getAllAreaCursos,mudarVisibilidade,getImgCurso} from "services/cursosService";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Modal,
  Table,
  Container,
  Row
} from "reactstrap";
import {
  Grid,
  Typography
} from "@material-ui/core";
import Header from "components/Headers/Header.jsx";
import {PermissibleRender} from "@brainhubeu/react-permissible";

class Cursos extends React.Component {
    state = {
      deleteModal: false,
      cursos: [],
      areas: [],
      selectedItem: null,
      userPermissions: []
    };
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    toggleModal = state => {
      this.setState({
        [state]: !this.state[state]
      });
    };

    onChange = (myState,obj) => {
      this.setState({
        [myState]: obj
      });
    }

    componentDidMount() {
      if(this.props.authState && this.props.authState.permissions) {
          this.onChange("userPermissions",this.props.authState.permissions);
      }
      const responseCurso = getAllCursos();
      const responseArea = getAllAreaCursos();
      responseArea.then((areas) => {
        this.onChange("areas",areas);
      })
      responseCurso.then((cursos) => {
        this.onChange("cursos",cursos);
        Object.keys(cursos).map((item) => {
            const responseImg = getImgCurso(cursos[item].curso_cod);
            responseImg.then((url) => {
                if(url)
                  cursos[item].img = url;
                else
                  cursos[item].img = ""; //se nao tiver adiciona um faker (?)

              this.onChange("cursos",cursos);
            })
            .catch(function(error){
              console.log('nao encontrou imagem');
            })
        });
      });
    };

    getLinkAlterar() {
      if(this.state.selectedItem) {
        return {
          pathname: '/admin/add-cursos', state:{
            id: this.state.selectedItem.curso_cod,
            titulo: this.state.selectedItem.curso_titulo,
            subtitulo: this.state.selectedItem.curso_subtitulo,
            descricao: this.state.selectedItem.curso_descricao,
            dataInicio: this.state.selectedItem.curso_dataInicio,
            dataFim: this.state.selectedItem.curso_dataFim,
            idArea: this.state.selectedItem.areacurso_cod
        }};
      }
      else
      return {
        pathname: '/admin/cursos'
      };
    }

  getLinkAddVideoAula() {
    if(this.state.selectedItem) {
      return {
        pathname: '/admin/add-videoaula', state:{
          id: this.state.selectedItem.curso_cod,
          titulo: this.state.selectedItem.curso_titulo,
          subtitulo: this.state.selectedItem.curso_subtitulo,
          descricao: this.state.selectedItem.curso_descricao,
          visivel: this.state.selectedItem.curso_visivel
      }};
    }
    else
    return {
      pathname: '/admin/cursos'
    };
  }

  getLinkVisualizar(curso) {
    return {
      pathname: '/admin/visualizar-curso', state:{
        id: curso.curso_cod,
        titulo:curso.curso_titulo,
        subtitulo:curso.curso_subtitulo,
        descricao: curso.curso_descricao,
        idArea: curso.areacurso_cod,
        visivel: curso.curso_visivel,
        img: curso.img,
      }
  };
  }

  getName() {
    if(this.state.selectedItem) 
      return this.state.selectedItem.curso_titulo;
    else
      return '';
  }
  
    
    
  render() {
    const { cursos, areas, userPermissions} = this.state;
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Grid container spacing={3} jutify="flex-start">
                    <Grid item>
                      <Typography>Cursos</Typography>
                    </Grid>
                    <Grid item>
                      <Link to="/admin/area-cursos">
                        <Button className="pull-right" color="primary" size="sm" type="button">
                            Visualizar Áreas do curso
                        </Button>
                      </Link>
                    </Grid>
                    <PermissibleRender 
                      userPermissions={userPermissions ? userPermissions : []}
                      requiredPermissions={['CRUD_CURSO']}
                    >
                      <Grid item>
                        <Link to="/admin/add-cursos">
                          <Button className="pull-right" color="primary" size="sm" type="button">
                              Adicionar curso
                          </Button>
                        </Link>
                      </Grid>
                    </PermissibleRender>
                  </Grid>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Título</th>
                      <th scope="col">Área</th>
                      <th scope="col">Vísivel</th>
                      <th scope="col" />
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {
                
                cursos && cursos!==undefined &&
                Object.keys(cursos).map((item,index) => {
                  if(areas) {
                    Object.keys(areas).map((item2) => {
                      //console.log("tipo:",index,tipos[item]);
                      if(cursos[item].areacurso_cod === areas[item2].areacurso_cod) {
                        cursos[item].areacurso_nome = areas[item2].areacurso_nome;
                      }
                    });
                  }
                   return (
                      <tr key={index} id="rowCurso">
                       <td> 
                        {cursos[item].curso_titulo}
                       </td>
                       <td>
                         {cursos[item].areacurso_nome}
                       </td>
                       <td>
                         {cursos[item].curso_visivel ? 'Sim' : 'Não'}
                       </td>
                       <td>
                        <Link to={this.getLinkVisualizar(cursos[item])}>
                          <Button color="primary" type="button"> 
                            Visualizar 
                          </Button>
                        </Link>
                       </td>
                       <PermissibleRender
                        userPermissions={userPermissions ? userPermissions : []}
                        requiredPermissions={['CRUD_CURSO']}
                        renderOtherwise={<td></td>}
                       >
                        <td className="text-right">
                          <UncontrolledDropdown onClick={() => this.onChange("selectedItem",cursos[item])}>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              href="#pablo"
                              role="button"
                              size="sm"
                              color=""
                              onClick={e => e.preventDefault()}
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <Link  to={this.getLinkAddVideoAula()} >
                                <DropdownItem
                                  href="#pablo">
                                  Adicionar video aula
                                </DropdownItem>
                              </Link>
                              <DropdownItem
                                onClick={() => {
                                  mudarVisibilidade(this.state.selectedItem.curso_cod,!this.state.selectedItem.curso_visivel);
                                  //refresh -> window.location.reload(false); => funciona mas nao mantem logado, por enquanto gambi
                                }}
                              >
                                {cursos[item].curso_visivel ? "Tornar invisível" : "Tornar visível"}
                                </DropdownItem>
                              <Link  to={this.getLinkAlterar()} >
                                  <DropdownItem
                                    href="#pablo">
                                    Alterar
                                  </DropdownItem>
                                </Link>
                              <DropdownItem
                                href="#pablo"
                                onClick={e => {this.toggleModal("deleteModal")}}
                              >
                                Excluir
                              </DropdownItem>
                              <Modal
                                className="modal-dialog-centered"
                                isOpen={this.state.deleteModal}
                                toggle={() => this.toggleModal("deleteModal")}
                              >
                                <div className="modal-header">
                                  <h5 className="modal-title" id="deleteModalLabel">
                                    Atenção!!
                                  </h5>
                                  <button
                                    aria-label="Close"
                                    className="close"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={() => this.toggleModal("deleteModal")}
                                  >
                                    <span aria-hidden={true}>×</span>
                                  </button>
                                </div>
                                <div className="modal-body">Deseja confirmar exlusão do curso {this.getName()}?</div>
                                <div className="modal-footer">
                                  <Button
                                    color="secondary"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={() => this.toggleModal("deleteModal")}
                                  >
                                    Cancelar
                                  </Button>
                                  <Button color="primary" type="button" 
                                  onClick={() => {
                                    deleteCurso(this.state.selectedItem.curso_cod);
                                    this.toggleModal("deleteModal")}}
                                    > 
                                    Confirmar
                                  </Button>
                                </div>
                              </Modal>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                       </PermissibleRender>
                       
                     </tr>
                   );
                 })
               }
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});
export default connect(mapStateToProps)(Cursos);
