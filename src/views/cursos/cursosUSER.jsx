import React from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";

import {getCursosVisiveis,getImgCurso} from "services/cursosService";
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
  Typography,
  Divider
} from '@material-ui/core';
import Header from "components/Headers/Header.jsx";
import MultilineText from "components/MultilineText.jsx";

class Cursos extends React.Component {
    state = {
      deleteModal: false,
      cursos: [],
      selectedItem: null
    };
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.getLink = this.getLink.bind(this);
    }

    onChange = (myState,obj) => {
      this.setState({
        [myState]: obj
      });
    }

    componentDidMount() {
      const responseCurso = getCursosVisiveis();
      responseCurso.then((cursos) => {
        this.onChange("cursos",cursos);
        Object.keys(cursos).map((item) => {
            console.log('buscandoImg:', cursos[item]);
            const responseImg = getImgCurso(cursos[item].curso_cod);
            responseImg.then((url) => {
                if(url)
                  cursos[item].img = url;
                else
                  cursos[item].img = ""; //se nao tiver adiciona um faker (?)

              this.onChange("cursos",cursos);
            })
            .catch(function(error){
              console.log('nao encontrou imagem');
            })
        });
      });
    };

    componentWillUnmount() {
      //tirar as funções asincrona, ta dando um warning/erro
    }


    getLink = (curso) => {
      return {
          pathname: '/admin/visualizar-curso', state:{
            id: curso.curso_cod,
            titulo:curso.curso_titulo,
            subtitulo:curso.curso_subtitulo,
            descricao: curso.curso_descricao,
            idArea: curso.areacurso_cod,
            visivel: curso.curso_visivel,
            img: curso.img
          }
      };
    }

  render() {
    const { cursos } = this.state;
    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                    <GridList cols={3} cellHeight="auto">
                    {
                        cursos && cursos!==undefined &&
                        Object.keys(cursos).map((item,index) => {
                            console.log('cursos',cursos[item],item);
                            return (
                              // <GridListTile key={index}>
                              //   <Card style={{borderStyle: 'solid'}}>
                              //     <Grid container direction="column">
                              //       <Grid item>
                              //         <img src={cursos[item].img ? cursos[item].img : null} height={360} width={480} title={cursos[item].curso_titulo}/>
                              //       </Grid>
                              //       <Grid item>
                              //         <Typography variant="h6" align="center"> {cursos[item].curso_titulo} </Typography>
                              //       </Grid>
                              //       <Grid item>
                              //         <MultilineText text={cursos[item].curso_subtitulo} align="center"/>
                              //       </Grid>
                              //       <Divider/>
                              //       <Grid item>
                              //         <Link to={this.getLink(cursos[item],index)}>
                              //             <Button size="small" color="primary">
                              //                 Ver curso
                              //             </Button>
                              //         </Link> 
                              //       </Grid>
                              //     </Grid>
                              //   </Card>
                              // </GridListTile>
                                <GridListTile key={index}>
                                    <Card style={{width: 'auto', borderStyle: 'solid 1px'}}>
                                        <CardMedia component="img" height={360} width={360} image={cursos[item].img ? cursos[item].img : null}/>
                                        {/* <img src={cursos[item].img ? cursos[item].img : null} height={360} width={480} title={cursos[item].curso_titulo}/> */}
                                        <CardContent>
                                          <div>
                                            <Typography variant="h6" align="center">{cursos[item].curso_titulo}</Typography>
                                            <MultilineText text={cursos[item].curso_subtitulo}/>
                                          </div>
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
