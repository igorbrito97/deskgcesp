import React from "react";
import { Link } from "react-router-dom" 
import { connect } from "react-redux";
import {} from "services/cursosService";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Container,
    Col,
    CustomInput,
    FormGroup,
    Form,
    Row,
  } from "reactstrap";
  import {
    Typography,
    Divider,
    TextField,
    Grid
  } from "@material-ui/core";
  import Header from "components/Headers/Header.jsx";
  import MultilineText from "components/MultilineText.jsx";

class addVideoAula extends React.Component {
    state = {
        id: "",
        titulo: "",
        subtitulo: "",
        visivel: Boolean,
        descricao: "",
        tituloAula : "",
        descricaoAula: "",
        file: null
    };

    onChange = (myState,value) => {
        this.setState({
            [myState]: value
        });
    };

    componentDidMount = () => {
      console.log('porpi',this.props);
        if(this.props.location.state && this.props.location.state.id){
            this.setState({
                id: this.props.location.state.id,
                titulo: this.props.location.state.titulo,
                subtitulo: this.props.location.state.subtitulo,
                descricao: this.props.location.state.descricao,
                visivel: this.props.location.state.visivel,
            })
        }
    }

    handleFile() {
      const file = document.getElementById('fileInput').files[0];
      if (file)
        this.onChange("arquivo", file);
    }

    getFileLabel() {
      if(this.state.file)
        return this.state.file.name;
      else
        return 'Selecionar';
    }
    
    render() {
      console.log('state',this.state);
        return (
            <>
            <Header />
            {/* Page content */}
            <Container className=" mt--7" fluid>
              {/* Table */}
              <Row>
              <div className=" col">
                  <Card className=" shadow">
                    <CardHeader className=" bg-transparent">
                      <h3 className=" mb-0"> Adicionar vídeo aula </h3>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <Grid container spacing={2} direction="column" alignContent="center">
                        <Grid item>
                          <Typography variant="h3">{this.state.titulo} - {this.state.visivel ? 'VISÍVEL' : 'INVISÍVEL'}</Typography>
                        </Grid>
                        <Grid item>
                          <MultilineText text={this.state.subtitulo} variant={'subtitle1'} align={'center'}/>
                        </Grid>
                        <Grid item> 
                          <MultilineText text={this.state.descricao} align={'center'}/>
                        </Grid>
                      </Grid>
                      <br/>
                      <Divider/>
                      <Row>
                        <Col>
                          <Typography>Título da video aula: </Typography>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <TextField
                            margin="normal"
                            variant="outlined"
                            value={this.state.tituloAula}
                            onChange={e => this.onChange("tituloAula", e.target.value)}
                            fullWidth={true}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Typography>Descrição da video aula:</Typography>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <TextField
                            margin="normal"
                            variant="outlined"
                            multiline
                            rowsMax="4"
                            value={this.state.descricaoAula}
                            onChange={e => this.onChange("descricaoAula", e.target.value)}
                            fullWidth={true}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Typography>Selecione o arquivo correspondente a essa video aula:</Typography>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup className="mb-3">
                            <CustomInput
                              label={this.getFileLabel()}
                              id="fileInput"
                              type="file"
                              label={this.getFileLabel()}
                              onChange={() => {this.handleFile()}}
                            />
                          </FormGroup>      
                        </Col>
                      </Row>
                      <Grid container justify="center" spacing={3}>
                        <Grid item>
                          <Link to='/admin/cursos'>
                            <Button className="my-4"
                                color="primary"
                                type="button"
                            >
                                Voltar
                            </Button>
                          </Link>
                        </Grid>
                        <Grid item>
                          <Button
                            className="my-4"
                            color="primary"
                            type="button"
                            onClick={() => {}}
                          >
                            Salvar
                          </Button>
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
export default connect(mapStateToProps)(addVideoAula);
