import React from "react";
import { Link } from "react-router-dom" 
import { connect } from "react-redux";
import {addVideo,getVideoAulasCurso,updateVideo,deleteVideo} from "services/cursosService";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Container,
    Col,
    CustomInput,
    FormGroup,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Modal,
    Table,
    Row,
  } from "reactstrap";
  import {
    Typography,
    Divider,
    TextField,
    Grid
  } from "@material-ui/core";
  import Header from "components/Headers/Header.jsx";
  import MultilineText from "components/MultilineText.jsx";

class addVideoAula extends React.Component {
    state = {
        id: "",
        titulo: "",
        subtitulo: "",
        visivel: Boolean,
        descricao: "",
        idAula: "",
        tituloAula : "",
        descricaoAula: "",
        file: null,
        videos: [],
        deleteModal: false,
        selectedItem: null
    };

    onChange = (myState,value) => {
        this.setState({
            [myState]: value
        });
    };

    componentDidMount = () => {
      if(this.props.location.state && this.props.location.state.id){
        this.setState({
            id: this.props.location.state.id,
            titulo: this.props.location.state.titulo,
            subtitulo: this.props.location.state.subtitulo,
            descricao: this.props.location.state.descricao,
            visivel: this.props.location.state.visivel,
        })
        const responseVideos = getVideoAulasCurso(this.props.location.state.id);
        responseVideos.then(videos => {
          if(videos)
            this.onChange('videos',videos);
        })
        .catch(function(error) {

        })
      }
    }

    resetPage = () => {
      this.setState({
        idAula: "",
        tituloAula: "",
        descricaoAula: "",
        file: null
      })
    }

    toggleModal = state => {
      this.setState({
        [state]: !this.state[state]
      });
    };

    handleFile() {
      const file = document.getElementById('fileInput').files[0];
      if (file)
        this.onChange("file", file);
    }

    getFileLabel() {
      if(this.state.file)
        return this.state.file.name;
      else
        return 'Selecionar';
    }
    
    render() {
      const {videos} = this.state;
      console.log('statiVIDIS',this.state);
        return (
            <>
            <Header />
            {/* Page content */}
            <Container className=" mt--7" fluid>
              {/* Table */}
              <Row>
              <div className=" col">
                  <Card className=" shadow">
                    <CardHeader className=" bg-transparent">
                      <h3 className=" mb-0"> Adicionar vídeo aula </h3>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <Grid container spacing={2} direction="column" alignContent="center">
                        <Grid item>
                          <Typography variant="h3">{this.state.titulo} - {this.state.visivel ? 'VISÍVEL' : 'INVISÍVEL'}</Typography>
                        </Grid>
                        <Grid item>
                          <MultilineText text={this.state.subtitulo} variant={'subtitle1'} align={'center'}/>
                        </Grid>
                        <Grid item> 
                          <MultilineText text={this.state.descricao} align={'center'}/>
                        </Grid>
                      </Grid>
                      <br/>
                      <Divider/>
                      <br/>
                      <Typography align="center" variant="h5">Conteúdo do curso:</Typography>
                      <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Título</th>
                            <th scope="col" />
                            <th scope="col" />
                          </tr>
                        </thead>
                        <tbody>
                        {
                          videos && videos!== null && 
                          Object.keys(videos).map((item,index) => {
                            //console.log('vidddd',item,videos[item],videos[item].video_cod,videos[item].video_descricao,videos[item].video_titulo);
                            return (
                              <tr key={index}>
                                <td>
                                  {videos[item].video_titulo}
                                </td>
                                <td>
                                  <Link to={{pathname: '/admin/visualizar-video',state:{
                                    idCurso: this.state.id,
                                    tituloCurso: this.state.titulo,
                                    videoAula: videos[item],
                                    path: '/admin/add-videoaula'
                                  }}}>
                                    <Button
                                      outline
                                      className="my-4"
                                      color="primary"   
                                      type="button"
                                      size="sm"
                                    >
                                        Visualizar
                                    </Button>
                                  </Link>
                                </td>
                                <td className="text-right"> 
                                  <UncontrolledDropdown onClick={() => this.onChange("selectedItem",videos[item])}>
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
                                      <DropdownItem
                                        href="#pablo"
                                        onClick={() => {
                                          if(this.state.tituloAula !== "" || this.state.descricaoAula !== "") {
                                            this.toggleModal("updateModal");
                                          }
                                          else {
                                            this.setState({
                                              idAula: this.state.selectedItem.video_cod,
                                              tituloAula: this.state.selectedItem.video_titulo,
                                              descricaoAula: this.state.selectedItem.video_descricao
                                            })
                                          }
                                        }}
                                      >
                                        Alterar
                                      </DropdownItem>
                                      <Modal
                                        className="modal-dialog-centered"
                                        isOpen={this.state.updateModal}
                                        toggle={() => this.toggleModal("updateModal")}
                                      >
                                        <div className="modal-header">
                                          <h5 className="modal-title" id="updateModalLabel">
                                            Atenção!!
                                          </h5>
                                          <button
                                            aria-label="Close"
                                            className="close"
                                            data-dismiss="modal"
                                            type="button"
                                            onClick={() => this.toggleModal("updateModal")}
                                          >
                                            <span aria-hidden={true}>×</span>
                                          </button>
                                        </div>
                                        <div className="modal-body">Para alterar essa vídeo você perderá a atual. Deseja continuar? </div>
                                        <div className="modal-footer">
                                          <Button
                                            color="secondary"
                                            data-dismiss="modal"
                                            type="button"
                                            onClick={() => this.toggleModal("updateModal")}
                                          >
                                            Cancelar
                                          </Button>
                                          <Button color="primary" type="button" 
                                          onClick={() => {
                                            this.setState({
                                              idAula: this.state.selectedItem.video_cod,
                                              tituloAula: this.state.selectedItem.video_titulo,
                                              descricaoAula: this.state.selectedItem.video_descricao
                                            })
                                            this.toggleModal("updateModal")}}
                                            > 
                                            Confirmar
                                          </Button>
                                        </div>
                                      </Modal>
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
                                        <div className="modal-body">Deseja confirmar exlusão da video aula {this.state.selectedItem ? this.state.selectedItem.video_titulo : null}?</div>
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
                                            deleteVideo(this.state.id,this.state.selectedItem.video_cod);
                                            this.toggleModal("deleteModal")}}
                                            > 
                                            Confirmar
                                          </Button>
                                        </div>
                                      </Modal>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>
                            );
                          }) 
                        }
                        </tbody>
                      </Table>
                      <Divider/>
                      <br/>
                      {
                        this.state.idAula !== "" &&
                        <Row>
                          <Col>
                            <Typography align="center">Alterando vídeo aula: {this.state.selectedItem.video_titulo}</Typography>
                          </Col>
                        </Row>
                      }
                      <Row>
                        <Col>
                          <Typography>Título da video aula: </Typography>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <TextField
                            margin="normal"
                            variant="outlined"
                            value={this.state.tituloAula}
                            onChange={e => this.onChange("tituloAula", e.target.value)}
                            fullWidth={true}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Typography>Descrição da video aula:</Typography>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <TextField
                            margin="normal"
                            variant="outlined"
                            multiline
                            rows="4"
                            rowsMax="6"
                            value={this.state.descricaoAula}
                            onChange={e => this.onChange("descricaoAula", e.target.value)}
                            fullWidth={true}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Typography>Selecione o arquivo correspondente a essa video aula:</Typography>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup className="mb-3">
                            <CustomInput
                              label={this.getFileLabel()}
                              id="fileInput"
                              type="file"
                              label={this.getFileLabel()}
                              onChange={() => {this.handleFile()}}
                            />
                          </FormGroup>      
                        </Col>
                      </Row>
                      <Grid container justify="center" spacing={3}>
                        <Grid item>
                          <Link to='/admin/cursos'>
                            <Button className="my-4"
                                color="primary"
                                type="button"
                            >
                                Voltar
                            </Button>
                          </Link>
                        </Grid>
                        {
                          this.state.idAula !== "" &&
                          <Grid item>
                            <Button
                              className="my-4"
                              color="primary"
                              type="button"
                              onClick={() => {
                                this.setState({
                                  idAula: "",
                                  tituloAula: "",
                                  descricaoAula: ""
                                })
                              }}
                            >
                              Cancelar alteração
                            </Button>
                          </Grid>
                        }
                        <Grid item>
                          <Button
                            className="my-4"
                            color="primary"
                            type="button"
                            onClick={() => {
                              if(this.state.tituloAula === "")
                                alert('Digite o título da vídeo aula!');
                              else if(this.state.descricaoAula === "")
                                alert('Digite a descrição da vídeo aula!');
                              else if(this.state.file === null)
                                alert('Selecione o arquivo');
                              else {
                                if(this.state.idAula){//alterando
                                  updateVideo(this.state.id,this.state.idAula,this.state.tituloAula,this.state.descricaoAula,this.state.file);
                                  this.resetPage();
                                }
                                else {//adicionando
                                  addVideo(this.state.id,this.state.tituloAula,this.state.descricaoAula,this.state.file);
                                  this.resetPage();
                                }
                              }
                            }}
                          >
                            Salvar
                          </Button>
                        </Grid>
                      </Grid>
                </CardBody>
                </Card> 
                </div>
              </Row>
            </Container>
          </>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state
});
export default connect(mapStateToProps)(addVideoAula);
