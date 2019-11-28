import React from "react";
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import ReactDatetime from "react-datetime";
import { addCurso, updateCurso, getAllAreaCursos, getImgCurso } from "services/cursosService";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Col,
  CustomInput,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  UncontrolledDropdown,
  Row,
} from "reactstrap";
import {
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
  TextField
} from "@material-ui/core";
import Header from "components/Headers/Header.jsx";

class AddCurso extends React.Component {
  state = {
    id: "",
    titulo: "",
    subtitulo : "",
    descricao: "",
    idArea: "",
    dataInicio: null,
    dataFim: null,
    areas: [],
    selectedItem: null,
    file: null,
    prevFile: null,
    visivel: true
  };

  onChange = (stateName, value) => {
    this.setState({
      [stateName]: value
    });
  };

  componentDidMount = () => {
    const response = getAllAreaCursos();
    response.then((arr) => {
      this.onChange("areas", arr);
      if (this.props.location.state && this.props.location.state.id) { //seleciona a area
        Object.keys(arr).map((item) => {
          if (this.state.idArea === arr[item].areacurso_cod)
            this.onChange("selectedItem", arr[item]);
        });
      }
    });

    if (this.props.location.state && this.props.location.state.id) {
      const responseImg = getImgCurso(this.props.location.state.id);
      responseImg.then((img) => {
        if (img)
          this.onChange("prevFile", img);
      });

      this.setState({
        id: this.props.location.state.id,
        nome: this.props.location.state.nome,
        descricao: this.props.location.state.descricao,
        dataInicio: this.props.location.state.dataInicio,
        dataFim: this.props.location.state.dataFim,
        idArea: this.props.location.state.idArea
      });
    }

  }

  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  getName = () => {
    if (this.state.selectedItem)
      return this.state.selectedItem.areacurso_nome;
    else
      return 'Área do curso';
  }

  handleFile = () => {
    const file = document.getElementById('fileInput').files[0];
    if (file) {
      this.onChange("file", file);
    }

  }

  getImg = () => {
    if (this.state.file)
      return <img src={URL.createObjectURL(this.state.file)} height={360} width={480} />
    else if (this.state.prevFile)
      return <img src={this.state.prevFile} height={360} width={480} />
    else
      return
  }

  getFileLabel() {
    if (this.state.file)
      return this.state.file.name;
    else
      return 'Selecionar';
  }
  render() {
    const header = this.props.location.state && this.props.location.state.id ? 'Alterar curso' : 'Adicionar curso';
    const { areas } = this.state;
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
                  <h3 className=" mb-0">{header}</h3>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  <Grid container direction="column" spacing={1}>
                    <Grid container>
                      <Grid item xs="9">
                        <Typography>Título:</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>Área do curso:</Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                      <Grid item xs="9">
                        <TextField
                          margin="normal"
                          variant="outlined"
                          value={this.state.titulo}
                          onChange={e => this.onChange("titulo", e.target.value)}
                          fullWidth={true}
                        />
                      </Grid>
                      <Grid item>
                        <UncontrolledDropdown>
                          <DropdownToggle caret defaultValue="Área do curso">
                            {this.getName()}
                          </DropdownToggle>
                          <DropdownMenu>
                            {
                              // POPULATE DROPDOWN
                              areas && areas !== undefined &&
                              Object.keys(areas).map((item, index) => {
                                return (
                                  <DropdownItem key={index} onClick={() => { this.onChange("selectedItem", areas[item]) }}>
                                    {areas[item].areacurso_nome}
                                  </DropdownItem>
                                );
                              })
                            }
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography>Subtítulo:</Typography>
                    </Grid>
                    <Grid item xs="12" sm>
                      <TextField
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows="2"
                        rowsMax="3"
                        value={this.state.subtitulo}
                        onChange={e => this.onChange("subtitulo", e.target.value)}
                        fullWidth={true}
                      />
                    </Grid>
                    <Grid item>
                      <Typography>Descrição:</Typography>
                    </Grid>
                    <Grid item xs="12" sm>
                      <TextField
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows="6"
                        rowsMax="9"
                        value={this.state.descricao}
                        onChange={e => this.onChange("descricao", e.target.value)}
                        fullWidth={true}
                      />
                    </Grid>
                    <Grid item>
                      <Typography>Vísivel:</Typography>
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.visivel}
                            onClick={() => this.onChange('visivel', !this.state.visivel)}
                            color="primary"
                          />
                        }
                        label="Visível"
                      />
                    </Grid>
                    <Grid item>
                      <Typography>Selecione a imagem de capa:</Typography>
                    </Grid>
                    <Grid item>
                      <FormGroup className="mb-3">
                        <CustomInput
                          id="fileInput"
                          type="file"
                          label={this.getFileLabel()}
                          onChange={() => { this.handleFile() }}
                        />
                      </FormGroup>
                    </Grid>
                    <Grid item>
                      {this.getImg()}
                    </Grid>
                  </Grid>
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
                        onClick={() => {
                          if (this.state.titulo === "")
                            alert('Digite um título para o curso!');
                          if (this.state.subtitulo === "")
                            alert('Digite um subtítulo para o curso!');
                          else if (this.state.descricao === "")
                            alert('Digite uma descrição para o curso!');
                          else if (this.state.selectedItem === null)
                              alert('Selecione uma área para o curso!');
                          else {
                            if (this.state.id) {
                              updateCurso(
                                this.state.id,
                                this.state.titulo,
                                this.state.subtitulo,
                                this.state.descricao,
                                this.state.selectedItem.areacurso_cod,
                                this.state.visivel,
                                this.state.file,
                                this.state.prevFile
                              )
                            }
                            else {
                              addCurso(
                                this.state.titulo,
                                this.state.subtitulo,
                                this.state.descricao,
                                this.state.selectedItem.areacurso_cod,
                                this.state.visivel,
                                this.state.file,
                              )
                            }
                          }
                        }}
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
export default connect(mapStateToProps)(AddCurso);

