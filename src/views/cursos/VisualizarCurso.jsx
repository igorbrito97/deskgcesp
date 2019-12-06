import React from 'react';
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import { getVideoAulasCurso,realizarInscricao,isUserInscrito } from "services/cursosService";
// reactstrap components
import {
  Button,
  CardHeader,
  CardBody,
  Container,
  Table,
  Row,
} from "reactstrap";
// core components
import {
    Grid,
    Card,
    CardMedia,
    CardActions,
    Typography
} from "@material-ui/core";
import Header from "components/Headers/Header.jsx";
import MultilineText from "components/MultilineText.jsx";
import {PermissibleRender} from "@brainhubeu/react-permissible";

class VisualizarCurso extends React.Component {
    state = {
        user: null,
        userPermissions: [],
        titulo: "",
        subtitulo: "",
        descricao: "",
        id: "",
        idArea: "",
        img: null,
        visivel: Boolean,
        videos: [],
        inscricao: null
    }
    constructor(props) {
        super(props);
        this.onChange.bind(this);
    }

    onChange = (myState,value) => {
        this.setState({
            [myState]:value
        });
    }

    componentDidMount= () => {
        if(this.props.location.state && this.props.location.state.id) {
            this.setState({
                titulo: this.props.location.state.titulo,
                subtitulo: this.props.location.state.subtitulo,
                descricao: this.props.location.state.descricao,
                id: this.props.location.state.id,
                idArea: this.props.location.state.idArea,
                img: this.props.location.state.img,
                visivel: this.props.location.state.visivel
            })
            const responseVideos = getVideoAulasCurso(this.props.location.state.id);
            responseVideos.then(videos => {
                console.log("videosNoVisjualizarCurso",videos);
              if(videos)
                this.onChange('videos',videos);
            })
            .catch(function(error) {
    
            })
        }
        if(this.props.authState && this.props.authState.loggedIn) {
            this.onChange("user",this.props.authState.user.user.uid);
        }
        if(this.props.authState.permissions) {
            this.onChange("userPermissions",this.props.authState.permissions);
        }
        const responseInscricao = isUserInscrito(this.props.location.state.id,this.props.authState.user.user.uid);
        responseInscricao.then(inscrito => {
            if(inscrito)
                this.onChange("inscricao",inscrito);
        })
        .catch(function(error){
        })
    }

    getData() {
        return new Date().getDate() + '/' + (new Date().getMonth()+1) + '/' + new Date().getFullYear();
    }
    
    render() {
        const {videos,inscricao} = this.state;
        console.log('stateeis',this.state);
        return (
            <>
                <Header />
                <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                    <Card className="shadow">
                        <CardHeader className=" bg-transparent">
                        <h3 className=" mb-0"> Detalhes do curso </h3>
                        </CardHeader>
                        <CardBody className="px-lg-5 py-lg-5">
                            <Grid container>
                                <Grid item xs="8">
                                <Grid container direction="column" spacing={2}>
                                    <Grid item>
                                        <Typography align="center" variant="h2">{this.state.titulo ? this.state.titulo : null}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <MultilineText align="center" variant="subtitle2" text={this.state.subtitulo ? this.state.subtitulo : null} />
                                    </Grid>
                                    <Grid item>
                                        <MultilineText text={this.state.descricao ? this.state.descricao : null} /> 
                                    </Grid>
                                    <Grid item>
                                        <Typography align="center">Conteúdo do curso:</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Table className="align-items-center table-flush" responsive>
                                            <thead className="thead-light">
                                            <tr>
                                                <th scope="col">Título</th>
                                                <th scope="col">Duração</th>
                                                <th scope="col" />
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                videos && videos!==null &&
                                                Object.keys(videos).map((item,index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                {videos[item].video_titulo}
                                                            </td>
                                                            <td>
                                                                -
                                                            </td>
                                                            <td>
                                                            {
                                                                inscricao && inscricao!== null &&
                                                                <Link to={{pathname: '/admin/visualizar-video',state:{
                                                                    idCurso: this.state.id,
                                                                    tituloCurso: this.state.titulo,
                                                                    videoAula: videos[item],
                                                                    path: '/admin/visualizar-curso'
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
                                                            }
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                            </tbody>
                                        </Table>
                                    </Grid>
                                </Grid>
                                </Grid>
                                <Grid item xs="4">
                                    <Card>
                                        <CardMedia component="img" height={360} width={360} image={this.state.img ? this.state.img : null}/>
                                        <CardActions>
                                            <Grid container spacing={2} justify="center">
                                            {
                                                this.state.inscricao === null ? 
                                                <Grid item>
                                                    <Button
                                                        outline
                                                        className="my-4"
                                                        color="primary"   
                                                        type="button"
                                                        onClick={() => {
                                                            realizarInscricao(this.state.id,this.state.user,this.getData())
                                                        }}
                                                    >
                                                        Inscrever em curso
                                                    </Button> 
                                                </Grid>
                                                :
                                                <Typography>Inscrição realizada!</Typography>
                                            }
                                                                                           
                                            </Grid>
                                        </CardActions>
                                    </Card>
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
export default connect(mapStateToProps)(VisualizarCurso);