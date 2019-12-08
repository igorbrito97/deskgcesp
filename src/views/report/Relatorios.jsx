import React from "react";
import { connect } from "react-redux";
import { getAllCapitulos } from "services/superadmService";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PdfDocument } from "utility/ReportSaver.js";
import { 
  getTopicosArea,
  getTopicosAreaByName,
  getTicketsArea,
  getDocsEle,
  getDocEleByCap,
  getDocEleByStatus,
  getRegsInt,
  getRegsIntByCap,
  getRegsIntByStatus,
  getIndicacoes,
  getIndicacoesByCap,
  getDownloads,
  getInscritos
} from "services/reportService";
import {
  Container,
  CardHeader,
  Button,
  Table,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Row
} from "reactstrap";
import {
  Button as ButtonIcon,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Paper,
  Divider
} from "@material-ui/core";
import PrintIcon from '@material-ui/icons/Print';
import Header from "components/Headers/Header.jsx";

const reports = [
  {
    value: 'topicoArea',
    label: 'Tópicos criados por área',
    columns: ['Nome da área','Quantidade de tópicos'],
    dropdownCap: false,
    filterLabel: 'Nome da área',
    dropdownStatus: null
  },
  {
    value: 'ticketArea',
    label: 'Tickets enviados por área',
    columns: ['Nome da área','Quantidade de tickets'],
    dropdownCap: false,
    filterLabel: 'Nome da área',
    dropdownStatus: null
  },
  {
    value: 'docEleitoral',
    label: 'Documento Eleitoral',
    columns: ['Capítulo','Cidade', 'Data envio', 'Status'],
    dropdownCap: true,
    filterLabel: null,
    dropdownStatus: ['Enviado','Aprovado','Reprovado']
  },
  {
    value: 'regInterno',
    label: 'Regimento Interno',
    columns: ['Capítulo','Cidade', 'Data envio', 'Status'],
    dropdownCap: true,
    filterLabel: null,
    dropdownStatus: ['Enviado','Aprovado','Reprovado']
  },
  {
    value: 'chevalier',
    label: 'Chaveliers Indicados',
    columns: ['Nome indicado', 'Capítulo', 'Data envio', 'Status'],
    dropdownCap: true,
    filterLabel: 'Nome indicado',
    dropdownStatus: ['Enviado','Encaminhado','Votacao','Aprovado','Reprovado']
  },
  {
    value: 'downloads',
    label: 'Arquivos baixados',
    columns: ['Nome','Quantidade de downloads'],
    dropdownCap: false,
    filterLabel: 'Nome arquivo',
    dropdownStatus: null
  },
  {
    value: 'curso',
    label: 'Inscritos em cursos',
    dropdownCap: false,
    columns: ['Título do curso','Status','Inscritos'],
    filterLabel: 'Título curso',
    dropdownStatus: ['Visível','Invisível']
  }
]

class Relatorios extends React.Component {
  state = {
    selectedReport: null,
    searchedReport: null,
    filter: "",
    capitulos: [],
    selectedCap: null,
    selectedStatus: null,
    tableData: null
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
    this.getTableHeaders = this.getTableHeaders.bind(this);
    this.getTableRows = this.getTableRows.bind(this);
    this.fillTableData = this.fillTableData.bind(this);
  }

  onChange = (myState, obj) => {
    this.setState({
      [myState]: obj
    });
  }

  fillTableData = (report,data) => {
    console.log('fillinf',report,data);
    this.setState({
      searchedReport: report,
      tableData: data
    })
  }

  componentDidMount() {
    const responseCap = getAllCapitulos();
    responseCap.then(caps => {
      if (caps)
        this.onChange('capitulos', caps);
    });
  };

  search() {
    const { selectedReport,searchedReport } = this.state;
    // console.log('selected',selectedReport);
    // console.log('serached',searchedReport);
    if (selectedReport === null) {
      alert('Selecione um relatório!');
      return null;
    }
    switch (selectedReport.value) {
      case 'topicoArea':
        if(this.state.filter === "" ) {
          const responseTopico = getTopicosArea();
          responseTopico.then(topicos => this.fillTableData(selectedReport,topicos))
        }
        else {
          console.log('buscandoTA',this.state.filter)
          const responseTopicoName = getTopicosAreaByName(this.state.filter);
          responseTopicoName.then(topicos => {
            console.log('topicosAAAA',topicos);
            this.setState({
              searchedReport: selectedReport,
              tableData: topicos
            })
          })
          .catch(function(error){
            console.log('errrrrrrrrrrrrrrou')
          })
        }
        
        break;
      case 'ticketArea':
        const responseTicket = getTicketsArea();
        responseTicket.then(tickets => this.fillTableData(selectedReport,tickets))
        break;
      case 'docEleitoral':
        if(this.state.selectedCap === null && this.state.selectedStatus === null) { //sem filtro nenhum
          const responseDoc = getDocsEle();
          responseDoc.then(docs => this.fillTableData(selectedReport,docs))
        }
        else if(this.state.selectedCap !== null) { //capitulo
          console.log('capzoaoao');
          const responseDocCap = getDocEleByCap(this.state.selectedCap.cap_cod);
          responseDocCap.then(docs => {
            if(this.state.selectedStatus !== null) { // status tbm
              var obj = Object;
              console.log('capzoaoao&&&status');
              Object.keys(docs).map(item => {
                if(docs[item].status === this.state.selectedStatus)
                  Object.keys(obj).push(docs[item]);
              })
              this.fillTableData(selectedReport,obj);
            }
            else {

            console.log('0222222222222');
              this.fillTableData(selectedReport,docs); //só capitulo
            }
          })
          .catch(function(error){

          })
        }
        else { //só status
          const responseDocStatus = getDocEleByStatus(this.state.selectedStatus);
          responseDocStatus.then(docs => this.fillTableData(selectedReport,docs))
          .catch(function(error){

          })
        }
        break;
      case 'regInterno':
        const responseReg = getRegsInt();
        responseReg.then(regs => this.fillTableData(selectedReport,regs))
        break;
      case 'chevalier':
        if(this.state.selectedCap === null) {
          const responseChev = getIndicacoes();
          responseChev.then(indics => this.fillTableData(selectedReport,indics))
        } 
        else {
          const responseChevCap = getIndicacoesByCap(this.state.selectedCap.cap_cod);
          responseChevCap.then(indics => this.fillTableData(selectedReport,indics))
          .catch(function(error){

          })
        } 
        break;

      case 'downloads':
        const responseDownloads = getDownloads();
        responseDownloads.then(downs => this.fillTableData(selectedReport,downs))
        break;

      case 'curso':
        const responseCursos = getInscritos();
        responseCursos.then(cursos => this.fillTableData(selectedReport,cursos))
        break;
    }
  }

  getTableHeaders() {
    const { searchedReport } = this.state;
    console.log('procurs',searchedReport);
    if (searchedReport === null)
      return null;

    switch(searchedReport.value) {
      case 'topicoArea':
          return (
            <tr>
              <th scope="col">Nome da área</th>
              <th scope="col">Quantidade de tópicos</th>
            </tr>
          );
      case 'ticketArea':
        return (
            <tr>
              <th scope="col">Nome da área</th>
              <th scope="col">Quantidade de tickets</th>
            </tr>
          );
      case 'docEleitoral':
          return (
            <tr>
              <th scope="col">Capítulo</th>
              <th scope="col">Cidade</th>
              <th scope="col">Data de envio</th>
              <th scope="col">Status</th>
            </tr>
          );
      case 'regInterno':
          return (
            <tr>
              <th scope="col">Capítulo</th>
              <th scope="col">Cidade</th>
              <th scope="col">Data de envio</th>
              <th scope="col">Status</th>
            </tr>
          );
      case 'chevalier':
        return (
          <tr>
            <th scope="col">Nome indicado</th>
            <th scope="col">Capítulo</th>
            <th scope="col">Data envio</th>
            <th scope="col">Status</th>
          </tr>
        );

      case 'downloads':
        return (
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Quantidade de downloads</th>
          </tr>
        );

      case 'curso': 
        return (
          <tr>
            <th scope="col">Título do curso</th>
            <th scope="col">Status</th>
            <th scope="col">Inscritos</th>
          </tr>
        )
    }
    
  }

  getTableRows(dataRow,index) {
    const {searchedReport} = this.state;
    switch(searchedReport.value) {
      case 'topicoArea':
            return (
              <tr key={index}>
                <td>
                  {dataRow.area.areaforum_nome}
                </td>
                <td>
                  {dataRow.qntdTopicos}
                </td>
              </tr>
            );
      case 'ticketArea':
        return (
          <tr key={index}>
            <td>
              {dataRow.area.areaticket_nome}
            </td>
            <td>
              {dataRow.qntdTickets}
            </td>
          </tr>
        )
      case 'docEleitoral':
          return (
            <tr key={index}>
              <td>
                {dataRow.capitulo.cap_nome} n° {dataRow.capitulo.cap_numero}
              </td>
              <td>
                {dataRow.capitulo.cap_cidade}
              </td>
              <td>
                {dataRow.data}
              </td>
              <td>
                {dataRow.status}
              </td>
            </tr>
          );
      case 'regInterno':
          return (
            <tr key={index}>
              <td>
                {dataRow.capitulo.cap_nome} n° {dataRow.capitulo.cap_numero}
              </td>
              <td>
                {dataRow.capitulo.cap_cidade}
              </td>
              <td>
                {dataRow.data}
              </td>
              <td>
                {dataRow.status}
              </td>
            </tr>
          );
      case 'chevalier':
        return (
          <tr key={index}>
            <td>
              {dataRow.nome}
            </td>
            <td>
            {dataRow.capitulo.cap_nome} n° {dataRow.capitulo.cap_numero}
            </td>
            <td>
              {dataRow.dataEnvio}
            </td>
            <td>
            { dataRow.status }
            </td>
          </tr>
       );

      case 'downloads': 
        return (
          <tr key={index}>
            <td>
              {dataRow.nome}
            </td>
            <td>
              {dataRow.downloaded}
            </td>
          </tr>
        );
      
      case 'curso':
        return (
          <tr key={index}>
            <td>
              {dataRow.titulo}
            </td>
            <td>
              {dataRow.status}
            </td>
            <td>
              {dataRow.inscritos}
            </td>
          </tr>
        );
    }
  }

  render() {
    const { capitulos, searchedReport, tableData } = this.state;
    return (  
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Paper style={{borderStyle: 'solid 1.5px'}}>
                    <br/>
                    <Grid container direction="column" spacing={4}>
                      <Grid container spacing={3} justify="center">
                        <Grid item>
                          <Typography>Escolha o tipo de relatório: </Typography>
                        </Grid>
                        <Grid item>
                          <UncontrolledDropdown>
                            <DropdownToggle caret>
                              {this.state.selectedReport ? this.state.selectedReport.label : "Relatório"}
                            </DropdownToggle>
                            <DropdownMenu >
                              {
                                reports.map((option, index) => {
                                  return (
                                    <DropdownItem key={index} onClick={() => {
                                      this.setState({
                                        selectedReport: option,
                                        selectedCap: null,
                                        selectedStatus: null,
                                        filter: ""
                                      })
                                      
                                    }}>
                                      {option.label}
                                    </DropdownItem>
                                  );
                                })

                              }
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </Grid>
                      </Grid>
                      <Grid container spacing={3} justify="center" alignItems="center">
                        <Grid item>
                            <Typography>Filtro: </Typography>
                          </Grid>
                          <Grid item>
                            <TextField
                              disabled={this.state.selectedReport ? (this.state.selectedReport.filterLabel === null ? true : false) : true}
                              label={this.state.selectedReport ? this.state.selectedReport.filterLabel : null}
                              variant="outlined"
                              value={this.state.filter}
                              onChange={e => this.onChange("filter", e.target.value)}
                            />
                          </Grid>
                        <Grid item>
                          <Typography>Capítulo:</Typography>
                        </Grid>
                        <Grid item>
                          <UncontrolledDropdown>
                            <DropdownToggle caret disabled={this.state.selectedReport ? !this.state.selectedReport.dropdownCap : true}>
                              {this.state.selectedCap ? this.state.selectedCap.cap_nome + ' n° ' + this.state.selectedCap.cap_numero : 'Capítulo'}
                            </DropdownToggle>
                            <DropdownMenu>
                              {
                                capitulos && capitulos !== null &&
                                Object.keys(capitulos).map((item, index) => {
                                  return (
                                    <DropdownItem key={index} onClick={() => { this.onChange("selectedCap", capitulos[item]) }}>
                                      {capitulos[item].cap_nome} n° {capitulos[item].cap_numero}
                                    </DropdownItem>
                                  );
                                })
                              }
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </Grid>
                        <Grid item>
                          <Typography>Status:</Typography>
                        </Grid>
                        <Grid item>
                          <UncontrolledDropdown>  
                            <DropdownToggle caret 
                              disabled={this.state.selectedReport ? (this.state.selectedReport.dropdownStatus === null ? true : false) : true}
                              >
                                {this.state.selectedStatus ? this.state.selectedStatus : 'Status'}
                            </DropdownToggle>
                            <DropdownMenu>
                                {
                                  
                                  this.state.selectedReport && this.state.selectedReport.dropdownStatus!== null && 
                                  this.state.selectedReport.dropdownStatus.map((item, index) => {
                                      return (
                                        <DropdownItem key={item} onClick={() => { this.onChange("selectedStatus", this.state.selectedReport.dropdownStatus[index]) }}>
                                            {this.state.selectedReport.dropdownStatus[index]}
                                        </DropdownItem>
                                      );
                                  })
                                }
                            </DropdownMenu>
                            </UncontrolledDropdown>
                        </Grid>
                        <Grid item>
                            <Button
                              className="my-4"
                              color="primary"
                              type="button"
                              onClick={() => {
                                this.search();
                              }}
                            >
                              Buscar
                            </Button>
                          </Grid>
                        {
                          this.state.searchedReport!==null &&
                          <Grid item>
                            <ButtonIcon
                              variant="contained"
                              color="secondary"
                              startIcon={<PrintIcon/>}
                            >
                            <PDFDownloadLink
                              document={<PdfDocument data={tableData} report={searchedReport} />}
                              fileName="relatorio.pdf"  
                              style={{
                                color: "white",
                              }}
                            >
                              {({ blob, url, loading, error }) => 
                                loading ? "Carregando documento..." : "Gerar arquivo PDF"
                              }
                            </PDFDownloadLink>
                            </ButtonIcon>
                          </Grid>
                        }
                      </Grid>
                    </Grid>
                  </Paper>
                </CardHeader>
                  {
                    searchedReport!== null &&
                    <div>
                      <br/>
                      <Typography variant="h5" align="center">Relatório de {searchedReport.label}</Typography>
                      <br/>
                      <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                        {/* {this.getTableHeaders()} */}
                        <tr>
                        {
                          searchedReport.columns.map(item => {
                            return (
                              <th scope="col">{item}</th>
                            )
                          })
                        }
                        </tr>
                        </thead>
                        <tbody>
                        {
                          tableData!==null && 
                          Object.keys(tableData).map((item,index) => {
                            return this.getTableRows(tableData[item],index);
                          })
                        }
                        </tbody>
                      </Table>  
                    </div>
                    
                  }
                <br/><br/><br/><br/><br/><br/><br/>
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
export default connect(mapStateToProps)(Relatorios);
