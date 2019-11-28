import React from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";

import {getAllCursos,getImgCurso} from "services/cursosService";
// reactstrap components
import {
  Button, 
  CardHeader,
  Container,
  Row,
} from "reactstrap";
import { 
  Grid,
  GridList,
  GridListTile,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography
} from '@material-ui/core';
import Header from "components/Headers/Header.jsx";
import MultilineText from "components/MultilineText.jsx";

class Cursos extends React.Component {
    state = {
      deleteModal: false,
      cursos: [],
      imgs: [],
      selectedItem: null
    };
    constructor(props) {
        super(props);
        this.activeRoute.bind(this);
        this.changeState = this.changeState.bind(this);
        this.getLink = this.getLink.bind(this);
    }

    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }

    changeState = (myState,obj) => {
      this.setState({
        [myState]: obj
      });
    }

    componentDidMount() {
      const responseCurso = getAllCursos();
      responseCurso.then((cursos) => {
        this.changeState("cursos",cursos);
        Object.keys(cursos).map((item) => {
            const responseImg = getImgCurso(cursos[item].curso_cod);
            responseImg.then((url) => {
                if(url)
                    cursos[item].img = url;
                else
                    cursos[item].img = ""; //se nao tiver adiciona um faker (?)
                this.changeState("cursos",cursos);
            })
        });
      });
    };

    componentWillUnmount() {
      //tirar as funções asincrona, ta dando um warning/erro
    }

    getSrc = (curso) => {
        return curso.img ? curso.img : ""
    }

    getLink = (curso) => {
      return {
          pathname: '/admin/inscricao-curso', state:{
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

  render() {
    const { cursos, imgs } = this.state;
    console.log("cursos",cursos);
    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                    <GridList cols={3}>
                    {
                        cursos && cursos!==undefined &&
                        Object.keys(cursos).map((item,index) => {
                            return (
                                <GridListTile key={index}>
                                    <Card style={{ width: "18rem"}}>
                                        <CardMedia
                                        height={360} width={240}
                                        top
                                        title={cursos[item].curso_titulo}
                                        src={this.getSrc(cursos[item])}
                                        />
                                        <CardContent>
                                            <Typography variant="h6"> {cursos[item].curso_titulo} </Typography>
                                            <MultilineText text={cursos[item].curso_subtitulo}/>
                                        </CardContent>
                                        <CardActions>
                                          <Grid container justify="center">
                                            <Grid item>
                                              <Link to={this.getLink(cursos[item])}>
                                                <Button size="small" color="primary">
                                                    Ver curso
                                                </Button>
                                             </Link> 
                                            </Grid>
                                          </Grid>
                                            
                                        </CardActions>
                                    </Card>
                                </GridListTile> 
                            );
                        })
                    }
                    </GridList>
                </CardHeader>
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
