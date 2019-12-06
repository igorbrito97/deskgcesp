import React from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {getDocByUser,deleteDoc,downloadAtaDoc} from "services/docEleitoralService";
// reactstrap components
import {
  Button,
  Col,
  Card,
  CardBody,
  Container,
  Modal,
  Row,
} from "reactstrap";
import {
  Divider,
  Grid,
  ExpansionPanelActions,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Header from "components/Headers/Header.jsx";
import MultilineText from "components/MultilineText.jsx";
import { saveAs } from 'file-saver';

class DocumentosUSER extends React.Component {
    state = {
      doc: null,
      user: "",
      deleteModal: false,
      selectedItem: null
    };
    constructor(props) {
        super(props);
        this.toggleModal.bind(this);
        this.onChange = this.onChange.bind(this);
        this.renderData = this.renderData.bind(this);
    }

    onChange = (myState,obj) => {
      this.setState({
        [myState]: obj
      });
    }

    toggleModal = state => {
      this.setState({
        [state]: !this.state[state]
      });
    };

    componentDidMount() {
      if(this.props.authState && this.props.authState.loggedIn) {
        this.onChange("user",this.props.authState.user.user.uid);
        const response = getDocByUser(this.props.authState.user.user.uid);
        response.then(doc => {
          if(doc)
            this.onChange("doc",doc);
        })
        .catch(error => { //nao tem doc com esse usuario
          return 
        })
      }
    };

    renderData() {
      const {doc} = this.state;
      if(doc === null) {
        return (
          <div>
            <Row>
              <Typography>Nenhum documento enviado!</Typography>
            </Row>
          </div>
        );
      }
      else {
        return (
          <div>
          {
            doc &&
            Object.keys(doc).map((item,index) => {
              return (
                  <ExpansionPanel key={index}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Grid container spacing={2}>
                    <Grid item>
                      <Typography>Enviado em: {doc[item].doc_dataEnvio}</Typography>
                    </Grid>
                      <Grid item>
                    <Typography>Status: {doc[item].doc_status}</Typography>
                    </Grid>
                  </Grid>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div>
                      <Grid container direction="column">
                        <Grid item>
                          <Typography>Capítulo {doc[item].capitulo.cap_nome} n° {doc[item].capitulo.cap_numero}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography>Cidade: {doc[item].capitulo.cap_cidade}</Typography>
                        </Grid>
                        <br/>
                        <Grid item>
                          <Typography variant="h6">Informações do Mestre Conselheiro:</Typography>
                        </Grid>
                        <Grid item>
                          <Typography>Nome: {doc[item].doc_nomeMC}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography>CPF: {doc[item].doc_cpfMC}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography>Email: {doc[item].doc_emailMC}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography>Telefone: {doc[item].doc_telefoneMC}</Typography>
                        </Grid>
                        <br/>
                        <Grid item>
                          <Typography variant="h6">Informações do Presidente do Conselho Consultivo:</Typography>
                        </Grid> 
                        <Grid item>
                          <Typography>Nome: {doc[item].doc_nomePCC}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography>CPF: {doc[item].doc_cpfPCC}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography>Email: {doc[item].doc_emailPCC}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography>Telefone: {doc[item].doc_telefonePCC}</Typography>
                        </Grid>
                        <br/>
                        <Grid item>
                          <Typography variant="h6">Datas das atividades obrigatórias da gestão:</Typography>
                        </Grid>
                        <Grid container spacing={2}>
                          <Grid item>
                            <Typography>Instalação: {doc[item].atividades.dataInstalacao}</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>Iniciação: {doc[item].atividades.dataIniciacao}</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>Elevação: {doc[item].atividades.dataElevacao}</Typography>
                          </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                          <Grid item>
                            <Typography>Dia dos Pais: {doc[item].atividades.dataDiaPais}</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>Dia do Patriota: {doc[item].atividades.dataDiaPatriota}</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>Dia Educacional: {doc[item].atividades.dataDiaEducacional}</Typography>
                          </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                          <Grid item>
                            <Typography>Dia do Meu Governo: {doc[item].atividades.dataDiaGoverno}</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>Dia DeMolay de Conforto: {doc[item].atividades.dataDiaConforto}</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>Dia em Memória a Frank S. Land: {doc[item].atividades.dataDiaMemoriaFSL}</Typography>
                          </Grid>
                        </Grid>
                        <Grid container spacing={3} alignItems="center">
                          <Grid item>
                            <Typography>Baixar ata de eleição:</Typography>
                          </Grid>
                          <Grid item> 
                            <Button
                              outline
                              className="my-4"
                              color="primary"   
                              type="button"
                              size="sm"
                              onClick={() => {
                                const fileResponse = downloadAtaDoc(doc[item].doc_cod);
                                fileResponse.then((file) => {
                                  saveAs(file,'regimento_' + doc[item].capitulo.cap_nome);
                                })
                              }}
                            >
                              Download
                            </Button>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Typography>IDs dos Conselheiros:</Typography>
                        </Grid>
                        <Grid container spacing={3}>
                          <Grid item>
                            <Typography>MC: {doc[item].doc_idMC}</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>1C: {doc[item].doc_id1C}</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>2C: {doc[item].doc_id2C}</Typography>
                          </Grid>
                        </Grid>
                        <br/>
                        {
                          doc[item].doc_status !== 'Enviado' &&
                          <Grid container direction="column">
                            <Grid item>
                              <Typography variant="h6">Resposta:</Typography>
                            </Grid>
                            <Grid item>
                              <Typography>Data da resposta: {doc[item].resposta.resp_data}</Typography>
                            </Grid>
                            <Grid>
                              <MultilineText text={'Observação: ' + doc[item].resposta.resp_comentario} />
                              </Grid>  
                          </Grid> 
                        }
                      </Grid>
                    </div>
                  </ExpansionPanelDetails>
                  {
                    doc[item].doc_status === 'Enviado' &&
                    <div>
                      <Divider/>
                      <ExpansionPanelActions>
                        <Button size="small" color="primary"
                        onClick={() => {
                          this.onChange('selectedItem',doc[item]);
                          this.toggleModal("deleteModal")
                          }}>
                          Excluir
                        </Button>
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
                          <div className="modal-body">Deseja confirmar exlusão deste documento? </div>
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
                                deleteDoc(this.state.selectedItem.doc_cod);
                                this.toggleModal("deleteModal");
                              }}
                            >
                              Confirmar
                        </Button>
                          </div>
                        </Modal>
                      </ExpansionPanelActions>
                    </div>
                  }
                </ExpansionPanel>
              );
                
            })
          }
          </div>
        );
      }
    }

  render() {
    return (
        <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardBody className="px-lg-5 py-lg-5">
                  {this.renderData()}
                  <div className="text-center">
                  <Link to="/admin/enviar-docEleitoral">
                    <Button
                      className="my-4"
                      color="primary"
                      type="button"
                    >
                      Enviar novo documento
                    </Button>
                  </Link>
                </div>
                </CardBody>
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
export default connect(mapStateToProps)(DocumentosUSER);
