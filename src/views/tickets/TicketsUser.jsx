import React from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {getTicketsByUser,deletarTicket} from "services/ticketsService";
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

class TicketsUSER extends React.Component {
    state = {
        tickets: null,
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
        const response = getTicketsByUser(this.props.authState.user.user.uid);
        response.then(tickets => {
          if(tickets)
            this.onChange("tickets",tickets);
        })
        .catch(error => { //nao tem tickets com esse usuario
          return 
        })
      }
    };

    renderData() {
      const {tickets} = this.state;
      if(tickets === null) {
        return (
          <div>
            <Row>
              <Typography>Nenhum ticket enviado!</Typography>
            </Row>
          </div>
        );
      }
      else {
        return (
          <div>
          {
            tickets &&
            Object.keys(tickets).map((item,index) => {
              return (
                  <ExpansionPanel key={index}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Grid container spacing={2}>
                      <Grid item>
                        <Typography>Assunto: {tickets[item].ticket_assunto}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>Status: {tickets[item].ticket_status}</Typography>
                      </Grid>
                    </Grid>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                  <div>
                    <Row>
                      <Col>
                        <Typography>Enviado em: {tickets[item].ticket_dataAbertura}</Typography>
                      </Col>
                    </Row>
                    {
                      tickets[item].ticket_status === 'Fechado' &&
                      <Row>
                        <Col>
                          <Typography>Fechado em: {tickets[item].fechamento.fechamento_data}</Typography>
                        </Col>
                      </Row>
                    }
                    <Row>
                      <Col>
                        <Typography></Typography>
                      </Col>
                    </Row>
                  </div>
                  </ExpansionPanelDetails>
                  <Divider />
                  <ExpansionPanelActions>
                    {
                      tickets[item].ticket_status === 'Aberto' && 
                      <div>
                        <Button size="small" color="primary"
                          onClick={() => {
                            this.onChange('selectedItem',tickets[item]);
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
                          <div className="modal-body">Deseja confirmar exlusão deste ticket?</div>
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
                                deletarTicket(this.state.selectedItem.ticket_cod);
                                this.toggleModal("deleteModal");
                              }}
                            >
                              Confirmar
                        </Button>
                          </div>
                        </Modal>
                      </div>
                    }
                    <Link to={{
                              pathname:'/admin/ver-ticket', state:{
                                ticket: tickets[item],
                                path: "/admin/ticketsUSER"
                            }}}>
                      <Button size="small" color="primary">
                        Visualizar detalhes
                      </Button>
                    </Link>
                  </ExpansionPanelActions>
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
                  <Link to="/admin/abrir-ticket">
                    <Button
                      className="my-4"
                      color="primary"
                      type="button"
                      
                    >
                      Abrir novo ticket
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
export default connect(mapStateToProps)(TicketsUSER);
