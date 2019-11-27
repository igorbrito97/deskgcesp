import React from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {getRegByUser,deleteReg,downloadRegInterno} from "services/regInternoService";
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

class RegimentosUSER extends React.Component {
    state = {
        reg: null,
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
        const response = getRegByUser(this.props.authState.user.user.uid);
        response.then(reg => {
          if(reg)
            this.onChange("reg",reg);
        })
        .catch(error => { //nao tem reg com esse usuario
          return 
        })
      }
    };

    renderData() {
      const {reg} = this.state;
      if(reg === null) {
        return (
          <div>
            <Row>
              <Typography>Nenhum regimento enviado!</Typography>
            </Row>
          </div>
        );
      }
      else {
        return (
          <div>
          {
            reg &&
            Object.keys(reg).map((item,index) => {
              console.log('item',reg[item]);
              return (
                  <ExpansionPanel key={index}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                  <Grid container spacing={2}>
                    <Grid item>
                      <Typography>Enviado em: {reg[item].reg_dataEnvio}</Typography>
                    </Grid>
                      <Grid item>
                    <Typography>Status: {reg[item].reg_status}</Typography>
                    </Grid>
                  </Grid>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div>
                      <Grid container direction="column">
                        <Grid item>
                          <Typography>Capítulo {reg[item].capitulo.cap_nome} n° {reg[item].capitulo.cap_numero}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography>Cidade: {reg[item].capitulo.cap_cidade}</Typography>
                        </Grid>
                        <br/>
                        <Grid item>
                          <Typography variant="h6">Informações do Mestre Conselheiro:</Typography>
                        </Grid>
                        <Grid item>
                          <Typography>Nome: {reg[item].reg_nomeMC}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography>CPF: {reg[item].reg_cpfMC}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography>Email: {reg[item].reg_emailMC}</Typography>                          
                        </Grid>
                        <Grid item>
                          <Typography>Telefone: {reg[item].reg_telefoneMC}</Typography>                          
                        </Grid>
                        <br/>
                        <Grid item>
                          <Typography variant="h6">Informações do Presidente do Conselho Consultivo:</Typography>                          
                        </Grid>
                        <Grid item>
                          <Typography>Nome: {reg[item].reg_nomePCC}</Typography>                          
                        </Grid>
                        <Grid item>
                          <Typography>CPF: {reg[item].reg_cpfPCC}</Typography>                          
                        </Grid>
                        <Grid item>
                          <Typography>Email: {reg[item].reg_emailPCC}</Typography>                          
                        </Grid>
                        <Grid item>
                          <Typography>Telefone: {reg[item].reg_telefonePCC}</Typography>                          
                        </Grid>
                        <Grid container spacing={3} alignItems="center">
                          <Grid item>
                            <Typography>Baixar Regimento Interno:</Typography>
                          </Grid>
                          <Grid item> 
                            <Button
                              outline
                              className="my-4"
                              color="primary"   
                              type="button"
                              size="sm"
                              onClick={() => {
                                const fileResponse = downloadRegInterno(reg[item].reg_cod);
                                fileResponse.then((file) => {
                                  saveAs(file,'regimento_' + reg[item].capitulo.cap_nome);
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
                            <Typography>MC: {reg[item].reg_idMC}</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>1C: {reg[item].reg_id1C}</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>2C: {reg[item].reg_id2C}</Typography>
                          </Grid>
                        </Grid>
                        <br/>
                        {
                          reg[item].reg_status !== 'Enviado' && 
                          <Grid container direction="column">
                            <Grid item>
                              <Typography variant="h6">Resposta:</Typography>
                            </Grid>
                            <Grid item>
                              <Typography>Data da resposta: {reg[item].resposta.resp_data}</Typography>
                            </Grid>
                            <Grid>
                              <MultilineText text={'Observação: ' + reg[item].resposta.resp_comentario} />
                              </Grid>  
                          </Grid> 
                        }
                      </Grid>
                    </div>
                  </ExpansionPanelDetails>
                  {
                    reg[item].reg_status === 'Enviado' &&
                    <div>
                      <Divider/>
                      <ExpansionPanelActions>
                        <Button size="small" color="primary"
                        onClick={() => {
                          this.onChange('selectedItem',reg[item]);
                          this.toggleModal("deleteModal")
                        }}>
                          Deletar
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
                          <div className="modal-body">Deseja confirmar exlusão deste regimento?</div>
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
                                deleteReg(this.state.selectedItem.reg_cod);
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
                  <Link to="/admin/enviar-regInterno">
                    <Button
                      className="my-4"
                      color="primary"
                      type="button"
                    >
                      Enviar novo regimento
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
export default connect(mapStateToProps)(RegimentosUSER);
