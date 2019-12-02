import React from 'react';
import { connect } from "react-redux";
import {getVideo} from "services/cursosService";
import ReactPlayer from 'react-player'
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

class VisualizarVideo extends React.Component {
    state = {
        user: null,
        userPermissions: [],
        idCurso: "",
        tituloCurso: "",
        path: "",
        videoAula: null,
        videoURL: null
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
        if(this.props.location.state && this.props.location.state.idCurso) {
            this.setState({
                idCurso: this.props.location.state.idCurso,
                tituloCurso: this.props.location.state.tituloCurso,
                videoAula: this.props.location.state.videoAula,
                path: this.props.location.state.path
            })
            const responseVideo = getVideo(this.props.location.state.idCurso,this.props.location.state.videoAula.video_cod);
            responseVideo.then(video => {
                if(video)
                    this.onChange('videoURL',video);
            })
        }
        if(this.props.authState && this.props.authState.loggedIn) {
            this.onChange("user",this.props.authState.user.user.uid);
        }
        if(this.props.authState.permissions) {
            this.onChange("userPermissions",this.props.authState.permissions);
        }
    }

    getData() {
        return new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear();
    }
    
    render() {
        const {videoAula,videoURL} = this.state;
        console.log('vidAul',videoAula);
        return (
            <>
                <Header />
                <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                    <Card className="shadow">
                        <CardHeader className=" bg-transparent">
                        <h3 className=" mb-0"> Vídeo aula - Curso: {this.state.tituloCurso}</h3>
                        </CardHeader>
                        <CardBody className="px-lg-5 py-lg-5">
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography variant="h4" align="center">{videoAula!== null ? videoAula.video_titulo : null}</Typography>
                                </Grid>
                                <Grid item>
                                    <ReactPlayer 
                                        url={videoURL}
                                        controls={true}
                                        width="100%"
                                    />
                                </Grid>
                                <br/>
                                <Grid item>
                                    <MultilineText text={videoAula!==null ? videoAula.video_descricao : null} />
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
export default connect(mapStateToProps)(VisualizarVideo);