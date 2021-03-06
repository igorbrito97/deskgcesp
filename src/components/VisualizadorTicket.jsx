import React from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {getConteudoTicket,downloadArqTicket,responderTicket,fecharTicket} from "services/ticketsService";
import { saveAs } from 'file-saver';
import {
  Button,
  Col,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  CustomInput,
  Input,
  InputGroupText,
  Form,
  Modal,
  Row,
} from "reactstrap";
import {
  Divider,
  Grid,
  GridList,
  GridListTile,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import {PermissibleRender} from "@brainhubeu/react-permissible"
import MultilineText from "components/MultilineText.jsx";

class VisualizadorTicket extends React.Component{
    state={
        user: null,
        ticket: null,
        conteudo: [],
        buttonDisabled: true,
        showForm: false,
        descricao: "",
        arquivo: null,
        conteudoLength: 0,
        closeModal: false
    }
    constructor(props){
        super(props);
        this.onChange.bind(this);
        this.handleFile.bind(this);
        this.handleForm.bind(this);
        this.getData.bind(this);
        this.toggleModal.bind(this);
        this.getFileLabel.bind(this);
    }

    componentDidMount() {
        if(this.props.authState && this.props.authState.loggedIn) {
            this.onChange("user",this.props.authState.user.user.uid);
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.ticket !== this.props.ticket) {
            if(this.props.ticket){
                this.onChange('ticket',this.props.ticket);
                const response = getConteudoTicket(this.props.ticket.ticket_cod);
                response.then(arr => {
                    this.onChange('conteudo',arr);
                    this.onChange('conteudoLength',Object.keys(arr).length);
                });
                if(this.props.ticket.ticket_status === 'Aberto' || this.props.ticket.ticket_status === 'Respondido')
                    this.onChange('buttonDisabled',false);
            }
        }
    }

    toggleModal = state => {
        this.setState({
          [state]: !this.state[state]
        });
      };
  

    onChange(myState,val){
        this.setState({
          [myState]: val
        });
    }

    handleFile() {
        const file = document.getElementById('fileInput').files[0];
        if(file)
          this.onChange("arquivo",file);
    }

    getFileLabel() {
        if(this.state.arquivo)
          return this.state.arquivo.name;
        else
          return 'Selecionar';
    }

    handleForm() {
        const form = this.state.showForm;
        this.setState({
            showForm: !form
        });
    }

    getData() {
        return new Date().getDate() + '/' + (new Date().getMonth()+1) + '/' + new Date().getFullYear();
    }

    render(){
        const {conteudo,ticket} = this.state;
        console.log("show",ticket);
        return (
            <>
            <div className="text-center">
                <Row>
                <Col>
                    <Typography variant="h4">Assunto: {ticket ? ticket.ticket_assunto : null }</Typography>
                </Col>
                </Row>
                <Row>
                <Col>
                <Typography variant="h6">Área do ticket: {ticket && ticket.areaticket_cod ? ticket.areaticket_nome : null }</Typography>
                </Col>
                </Row>
                <Row>
                <Col>
                    <Typography variant="h6">Data de abertura: {ticket ? ticket.ticket_dataAbertura : null} - Status: {ticket ? ticket.ticket_status : null }</Typography>
                </Col>
                </Row>
                {
                    ticket && ticket.ticket_status === 'Fechado' && ticket.fechamento && 
                    <Row>
                    <Col>
                        <Typography variant="h6">Data de fechamento: {ticket.fechamento.fechamento_data}</Typography>
                    </Col>
                    </Row>
                }
                <Row>
                <Col>
                    <Typography variant="h6">Enviado por: {ticket ? ticket.ticket_username : null}</Typography>
                </Col>
                </Row>
            <br/>
            <Divider/>
            <br/><br/>
            <GridList cols={1}>
            {
                conteudo && conteudo!==undefined &&
                Object.keys(conteudo).map((item,index) => {
                    return (
                        <GridListTile key={index}>
                            <Card style={{ width: 'full-width'}}>
                                <CardContent>
                                    <Typography variant="h6">Data: {conteudo[item].conteudotic_data} </Typography>
                                    <MultilineText text={conteudo[item].conteudotic_username + ': ' + conteudo[item].conteudotic_descricao} />
                                    <br/>
                                    {
                                        conteudo[item].conteudotic_arquivo ? 
                                        <div>
                                            <Typography variant="body6">Arquivo anexado: </Typography>
                                            <Button
                                                outline
                                                className="my-4"
                                                color="primary"   
                                                type="button"
                                                size="sm"
                                                onClick={() => {
                                                    const fileResponse = downloadArqTicket(ticket.ticket_cod,conteudo[item].conteudotic_cod);
                                                    fileResponse.then((file) => {
                                                        saveAs(file,'ticket_coment'+(index+1));
                                                    })
                                                }}
                                            >
                                                Download
                                            </Button>
                                        </div> : 
                                        <Typography variant="body2">Nenhum arquivo enviado</Typography>
                                    }
                                </CardContent>
                            </Card>
                        </GridListTile> 
                    );
                })
            }
            </GridList>
            <br/><br/>
            <div>
            {
                this.state.showForm && (
                    <div>
                        <Card body inverse color='info' style={{ width: 'full-width'}}>
                            <CardContent>
                            <Form role="form">
                                <Row>
                                <Col>
                                        <Typography>Comentário: </Typography>
                                </Col>
                                </Row>
                                <Row>
                                <Col>
                                    <FormGroup>
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="input-group-alternative mb-4" />
                                        </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                        rows="4"
                                        type="textarea"
                                        required
                                        onChange={e => this.onChange("descricao", e.target.value)}
                                        />
                                    </InputGroup>
                                    </FormGroup>
                                </Col>
                                </Row>
                                <Row>
                                <Col>
                                        <Typography>Se necessário, adicione um arquivo: </Typography>
                                </Col>
                                </Row>
                                <Row>
                                <Col>
                                    <FormGroup className="mb-3">
                                        <CustomInput
                                        label={this.getFileLabel()}
                                        id="fileInput"
                                        type="file"
                                        required
                                        onChange={() => {this.handleFile()}}
                                    />
                                    </FormGroup>
                                </Col>
                                </Row>
                                <div className="text-center">
                                <Row>
                                <Col>
                                    <Button
                                        size="sm"
                                        className="my-4"
                                        color="primary"
                                        type="button"
                                        onClick={() => {
                                            this.onChange("showForm",false);
                                        }}
                                    >
                                    Cancelar
                                    </Button>
                                </Col>
                                <Col>
                                    <Button
                                        size="sm"
                                        className="my-4"
                                        color="primary"
                                        type="button"
                                        onClick={() =>{
                                            responderTicket(ticket.ticket_cod,
                                                this.state.user,
                                                this.props.userDetail.userName,
                                                this.state.descricao,
                                                this.state.arquivo,
                                                this.getData());
                                        }}
                                    >
                                    Enviar
                                    </Button>
                                </Col>
                                </Row>
                                </div>
                            </Form> 
                            </CardContent>
                        </Card>
                        
                    </div>
                )
            }
            </div>
            <br/><br/>
            <Grid container justify="center" spacing={3}>
                <Grid item>
                    <Link to={this.props.path}>
                        <Button
                        className="my-4"
                        color="primary"
                        type="button"
                        id="anchor"
                        >
                        Voltar
                        </Button>
                    </Link>
                </Grid>
                {
                    //para fechar: se tem mais que 1 resposta, nao esta fechado e tem permissao
                    !this.state.buttonDisabled && conteudo && this.state.conteudoLength > 1 &&  
                        <PermissibleRender
                            userPermissions={this.props.userPermissions}
                            requiredPermissions={['CLOSE_TICKET']}
                        >
                            <Grid item>
                                <Button
                                    className="my-4"
                                    color="primary"
                                    type="button"
                                    onClick={() => this.toggleModal("closeModal")}  
                                    >
                                    Fechar
                                </Button>
                                <Modal
                                className="modal-dialog-centered"
                                isOpen={this.state.closeModal}
                                toggle={() => this.toggleModal("closeModal")}
                                >
                                <div className="modal-header">
                                    <h5 className="modal-title" id="closeModalLabel">
                                    Atenção!!
                                </h5>
                                    <button
                                    aria-label="Close"
                                    className="close"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={() => this.toggleModal("closeModal")}
                                    >
                                    <span aria-hidden={true}>×</span>
                                    </button>
                                </div>
                                <div className="modal-body">Deseja realmente fechar este ticket?</div>
                                <div className="modal-footer">
                                    <Button
                                    color="secondary"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={() => this.toggleModal("closeModal")}
                                    >
                                    Cancelar
                                </Button>
                                    <Button color="primary" type="button"
                                    onClick={() => {
                                        fecharTicket(ticket.ticket_cod,this.getData(),this.state.user,this.props.userDetail.userName);
                                        this.toggleModal("closeModal");
                                    }}
                                    >
                                    Confirmar
                                </Button>
                                </div>
                                </Modal>
                            </Grid>
                        </PermissibleRender>
                }
                <Grid item>
                    <Button
                        disabled={this.state.buttonDisabled}
                        className="my-4"
                        color="primary"
                        type="button"
                        onClick={() => {
                            this.handleForm();
                        }}
                        >
                            Responder
                    </Button>
                </Grid>
            </Grid>
            
            </div>
            </>
        );
    }
}


const mapStateToProps = (state) => ({
    ...state
});
export default connect(mapStateToProps)(VisualizadorTicket);