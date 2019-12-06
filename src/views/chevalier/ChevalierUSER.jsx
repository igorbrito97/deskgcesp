import React from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {getIndicacoesByUser,downloadFicha,deleteIndicacao} from "services/chevalierService";
import { saveAs } from 'file-saver';
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

class ChevalierUSER extends React.Component {
    state = {
        indicacoes: null,
        user: null,
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
        const response = getIndicacoesByUser(this.props.authState.user.user.uid);
        response.then(indicacoes => {
          if(indicacoes)
            this.onChange("indicacoes",indicacoes);
        })
        .catch(error => { //nao tem tickets com esse usuario
          return 
        })
      }
    };

    renderData() {
      const {indicacoes} = this.state;
      if(indicacoes === null) {
        return (
          <div>
            <Row>
              <Typography>Nenhuma indicação enviada!</Typography>
            </Row>
          </div>
        );
      }
      else {
        return (
          <div>
          {
            indicacoes &&
            Object.keys(indicacoes).map((item,index) => {
              console.log(index,indicacoes[item]);
              return (
                  <ExpansionPanel key={index}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Grid container spacing={2}>
                      <Grid item>
                        <Typography>Nome: {indicacoes[item].indic_nomeIndicado}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>Capítulo: {indicacoes[item].capitulo.cap_nome} n° {indicacoes[item].capitulo.cap_numero}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>Status: {indicacoes[item].indic_status}</Typography>
                      </Grid>
                    </Grid>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Grid container direction="column">
                      <Grid item>
                        <Typography>Enviado em: {indicacoes[item].indic_dataEnvio}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>ID DeMolay do indicado: {indicacoes[item].indic_idIndicado}</Typography>
                      </Grid>
                      <br/>
                      <Grid item>
                        <Typography variant="h6">Informações sobre o Presidente do Conselho:</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>Nome: {indicacoes[item].indic_nomePCC}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>CPF: {indicacoes[item].indic_cpfPCC}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>Email: {indicacoes[item].indic_emailPCC}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>Telefone: {indicacoes[item].indic_telefonePCC}</Typography>
                      </Grid>
                      <Grid item>
                        <Button 
                            outline
                            className="my-4"
                            color="primary"   
                            type="button"
                            onClick={() => {
                              const fileResponse = downloadFicha(indicacoes[item].indic_cod);
                              fileResponse.then((file) => {
                                  saveAs(file,'ficha_' + indicacoes[item].indic_nomeIndicado);
                              })
                            }}
                          >
                            Baixar ficha
                        </Button>
                      </Grid>
                    </Grid>
                  </ExpansionPanelDetails>
                  <Divider />
                  {
                    indicacoes[item].indic_status === 'Enviado' &&
                    <ExpansionPanelActions>
                      <Button size="small" color="primary"
                        onClick={() => {
                          this.onChange('selectedItem',indicacoes[item]);
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
                        <div className="modal-body">Deseja confirmar exlusão da indicacao de {this.state.selectedItem ? this.state.selectedItem.indic_nomeIndicado : null}? </div>
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
                              deleteIndicacao(this.state.selectedItem.indic_cod);
                              this.toggleModal("deleteModal");
                            }}
                          >
                            Confirmar
                      </Button>
                        </div>
                      </Modal>
                    </ExpansionPanelActions>
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
                  <Link to="/admin/indicarChevalier">
                    <Button
                      className="my-4"
                      color="primary"
                      type="button"
                      
                    >
                      Indicar membro
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
export default connect(mapStateToProps)(ChevalierUSER);
