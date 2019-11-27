import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllTipoArquivo, deleteTipoArquivo, addTipoArquivo, updateTipoArquivo } from "services/arquivosService";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Col,
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
  Typography,
  TextField
} from "@material-ui/core";
import Header from "components/Headers/Header.jsx";
import { PermissibleRender } from '@brainhubeu/react-permissible';
import MultilineText from "components/MultilineText.jsx";

class TipoArquivos extends React.Component {
  state = {
    deleteModal: false,
    tipos: [],
    selectedItem: null,
    userPermissions: [],
    addModal: false,
    updateModal: false,
    id: "",
    nome: "",
    descricao: ""
  };
  constructor(props) {
    super(props);
    this.toggleModal.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });

    if (state === "addModal") {
      this.setState({
        id: "",
        nome: "",
        descricao: ""
      });
    }
  };

  onChange = (myState, obj) => {
    this.setState({
      [myState]: obj
    });
  }

  componentDidMount() {
    if (this.props.authState && this.props.authState.permissions) {
      this.onChange("userPermissions", this.props.authState.permissions);
    }
    const response = getAllTipoArquivo();
    response.then((arr) => { this.onChange("tipos", arr) });
  };

  getName() {
    if (this.state.selectedItem)
      return this.state.selectedItem.tipoarquivo_nome;
    else
      return '';
  }


  render() {
    const { tipos, userPermissions } = this.state;
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
                  <Grid container spacing={3} justify="flex-start">
                    <Grid item>
                      <Typography>Tipos de Arquivo</Typography>
                    </Grid>
                    <PermissibleRender
                      userPermissions={userPermissions ? userPermissions : []}
                      requiredPermissions={['CRUD_AREAS']}
                    >
                      <Grid item>
                        <Button className="pull-right" color="primary" size="sm" type="button" onClick={() => this.toggleModal("addModal")}>
                          Adicionar novos tipos
                        </Button>
                        <Modal
                          id="addModal"
                          className="modal-dialog-centered"
                          isOpen={this.state.addModal}
                          toggle={() => this.toggleModal("addModal")}
                        >
                          <div className="modal-header">
                            <h5 className="modal-title">
                              ADICIONAR TIPO DE ARQUIVO
                            </h5>
                            <button
                              aria-label="Close"
                              className="close"
                              data-dismiss="modal"
                              type="button"
                              onClick={() => this.toggleModal("addModal")}
                            >
                              <span aria-hidden={true}>×</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <Row>
                              <Col>
                                <Typography>Nome do tipo:</Typography>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <TextField
                                  margin="normal"
                                  variant="outlined"
                                  value={this.state.nome}
                                  onChange={e => this.onChange("nome", e.target.value)}
                                  fullWidth={true}
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Typography>Descrição do tipo:</Typography>
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
                                  value={this.state.descricao}
                                  onChange={e => this.onChange("descricao", e.target.value)}
                                  fullWidth={true}
                                />
                              </Col>
                            </Row>
                          </div>
                          <div className="modal-footer">
                            <Button
                              color="secondary"
                              data-dismiss="modal"
                              type="button"
                              onClick={() => this.toggleModal("addModal")}
                            >
                              Cancelar
                            </Button>
                            <Button color="primary" type="button"
                              onClick={() => {
                                if (this.state.nome === "")
                                  alert('Digite o nome!!');
                                else if (this.state.descricao === "")
                                  alert('Digite a descrição!!');
                                else {
                                  addTipoArquivo(this.state.nome, this.state.descricao);
                                  this.toggleModal("addModal");
                                }
                              }}
                            >
                              Confirmar
                            </Button>
                          </div>
                        </Modal>
                      </Grid>
                    </PermissibleRender>
                  </Grid>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Nome</th>
                      <th scope="col">Descrição</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {
                      tipos && tipos !== undefined &&
                      Object.keys(tipos).map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <Typography>{tipos[item].tipoarquivo_nome}</Typography>
                            </td>
                            <td>
                              <MultilineText text={tipos[item].tipoarquivo_descricao} />
                            </td>
                            <PermissibleRender
                              userPermissions={userPermissions ? userPermissions : []}
                              requiredPermissions={['CRUD_AREAS']}
                              renderOtherwise={<td></td>}
                            >
                              <td className="text-right">
                                <UncontrolledDropdown onClick={() => {
                                  this.onChange('selectedItem', tipos[item])
                                  this.setState({
                                    id: tipos[item].tipoarquivo_cod,
                                    nome: tipos[item].tipoarquivo_nome,
                                    descricao: tipos[item].tipoarquivo_descricao
                                  })
                                }}>
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
                                      onClick={() => this.toggleModal('updateModal')}
                                    >
                                      Alterar
                                </DropdownItem>
                                    <Modal
                                      id="updateModal"
                                      className="modal-dialog-centered"
                                      isOpen={this.state.updateModal}
                                      toggle={() => this.toggleModal("updateModal")}
                                    >
                                      <div className="modal-header">
                                        <h5 className="modal-title">
                                          ALTERAR TIPO DE ARQUIVO
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
                                      <div className="modal-body">
                                        <Row>
                                          <Col>
                                            <Typography>Nome do tipo:</Typography>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col>
                                            <TextField
                                              margin="normal"
                                              variant="outlined"
                                              value={this.state.nome}
                                              onChange={e => this.onChange("nome", e.target.value)}
                                              fullWidth={true}
                                            />
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col>
                                            <Typography>Descrição do tipo:</Typography>
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
                                              value={this.state.descricao}
                                              onChange={e => this.onChange("descricao", e.target.value)}
                                              fullWidth={true}
                                            />
                                          </Col>
                                        </Row>
                                      </div>
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
                                            if (this.state.nome === "")
                                              alert('Digite o nome!!');
                                            else if (this.state.descricao === "")
                                              alert('Digite a descrição!!');
                                            else {
                                              updateTipoArquivo(this.state.id, this.state.nome, this.state.descricao);
                                              this.toggleModal("updateModal");
                                            }
                                          }}
                                        >
                                          Confirmar
                                        </Button>
                                      </div>
                                    </Modal>
                                    <DropdownItem
                                      href="#pablo"
                                      onClick={e => { this.toggleModal("deleteModal") }}
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
                                      <div className="modal-body">Deseja confirmar exlusão do tipo {this.getName()}?</div>
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
                                            deleteTipoArquivo(this.state.selectedItem.tipoarquivo_cod);
                                            this.toggleModal("deleteModal")
                                          }}
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
export default connect(mapStateToProps)(TipoArquivos);
