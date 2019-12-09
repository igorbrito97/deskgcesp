import React from "react";
import Header from "components/Headers/Header.jsx";

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody
} from "reactstrap";
import {
  Typography,
  Tabs,
  Tab,
  Grid,
  Divider
} from '@material-ui/core';
import TabPanel from "components/TabPanel.jsx";
//RECURSOS COMUNS
import imgRecursosBotao1 from "assets/img/manual/recComBotao1.png";
import imgRecursosBotao2 from "assets/img/manual/recComBotao2.png";
import imgRecursosBotao3 from "assets/img/manual/recComBotao3.png";
import imgRecursosBotaoOpcao from "assets/img/manual/recComBotaoOpcao.png";
import imgRecursosMensagem1 from "assets/img/manual/recComMensagem.png";
import imgRecursosMensagem2 from "assets/img/manual/recComMensagem2.png";
import imgRecursosModal from "assets/img/manual/recComModal.png";
import imgRecursosPainel1 from "assets/img/manual/recComPainel1.png";
import imgRecursosPainel2 from "assets/img/manual/recComPainel2.png";
//CURSOS
import imgCursosAdm from "assets/img/manual/cursoAdm.png";
import imgCursosAddVideo1 from "assets/img/manual/cursoAddVideo.png";
import imgCursosAddVideo2 from "assets/img/manual/cursoAddVideo2.png";
//CRUD
import imgCrudAreaAdd from "assets/img/manual/crudAddArea.png";
import imgCrudAreas from "assets/img/manual/crudArea.png";
import imgCrudCapituloAdd from "assets/img/manual/crudCapituloAdd.png";
import imgCrudCapitulos from "assets/img/manual/crudCapitulos.png";
import imgCrudUsuarios from "assets/img/manual/crudUsuarios.png";
import imgCrudUsuariosAlterarPapel from "assets/img/manual/crudUsuariosAlterarPapel.png";
// Forum
import imgForumPrincipal from "assets/img/manual/forumPrincipal.png";
import imgForumAddTopico from "assets/img/manual/forumAdd.png";
import imgForumAddTopico2 from "assets/img/manual/forumAdd2.png";
import imgForumTopico from "assets/img/manual/forumTopico.png";
import imgForumResponderTopico from "assets/img/manual/forumResponderTopico.png";
//Arquivo
import imgArquivoAdd from "assets/img/manual/arquivoAdd.png";
import imgArquivoAdm from "assets/img/manual/arquivoAdm.png";
import imgArquivoUser from "assets/img/manual/arquivoUser.png";
//CHEVALIER
import imgIndicacaoAdm from "assets/img/manual/indicacoesAdm.png";
import imgIndicacaoAbrirVotacao from "assets/img/manual/indicacaoAbrirVotacao.png";
import imgIndicacaoEncaminhar from "assets/img/manual/indicacaoEncaminhar.png";
import imgIndicacaoEncerrar from "assets/img/manual/indicacaoEncerrarVotacao-VotoComputado.png";
import imgIndicacaoVotar from "assets/img/manual/indicacaoVotar.png";
import imgIndicacaoUser from "assets/img/manual/indicacoesUser.png";
import imgIndicacaoVisualizar from "assets/img/manual/indicacoesVisualizar.png";
import imgIndicacaoIndicar from "assets/img/manual/indicarChevalier.png";
//DOCUMENTO
import imgDocumentoAdm from "assets/img/manual/docAdm.png";
import imgDocumentoEnviar1 from "assets/img/manual/docEnviar1.png";
import imgDocumentoEnviar2 from "assets/img/manual/docEnviar2.png";
import imgDocumentoEnviar3 from "assets/img/manual/docEnviar3.png";
import imgDocumentoResponder from "assets/img/manual/docResponder.png";
import imgDocumentoUser from "assets/img/manual/docUser.png";
import imgDocumentoUser2 from "assets/img/manual/docUser2.png";
//REGIMENTO
import imgRegimentoAdm from "assets/img/manual/regAdm.png";
import imgRegimentoEnviar1 from "assets/img/manual/regEnviar1.png";
import imgRegimentoEnviar2 from "assets/img/manual/regEnviar2.png";
import imgRegimentoResponder from "assets/img/manual/regResponder.png";
import imgRegimentoUser from "assets/img/manual/regUser.png";
//TICKET
import imgTicketAdm from "assets/img/manual/ticketAdm.png";
import imgTicketEnviar from "assets/img/manual/ticketEnviar.png";
import imgTicketResponder from "assets/img/manual/ticketResponder.png";
import imgTicketUser from "assets/img/manual/ticketUser.png";
import imgTicketVisualizar from "assets/img/manual/ticketVisualizar.png";
//RELATORIO
import imgRelatorio from "assets/img/manual/relatorio.png";

class HelpDesk extends React.Component {
  state = {
    selectedTab: 0,
  };

  onChange(stateName, value) {
    this.setState({
      [stateName]: value
    });
  }

  getInicioSecao(array) {
    console.log('ar', array);
    array.map(item => {
      console.log('it', item);
      return <Typography>{item}</Typography>
    })
  }

  showImage(component) {
    return <img src={component} width="100%" />
  }

  render() {
    const { selectedTab } = this.state;
    console.log('selectedTab', selectedTab);
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className=" mt--7" fluid>
          {/* Table */}
          <Row>
            <div className=" col">
              <Card className=" shadow">
                <Grid container spacing={3}>
                  <Grid item xs="3">
                    <Tabs
                      orientation="vertical"
                      value={selectedTab}
                      onChange={(e, value) => this.onChange('selectedTab', value)}
                      centered
                    >
                      {/* O DIVIDER CONTA COMO UM ITEM DA LISTA */}
                      <Tab label="Manual do Usuário" id="0" />
                      <Divider />
                      <Tab label="Recursos comuns das interfaces" id="1" />
                      <Divider />
                      <Tab label="Cadastros básicos" id="2" />
                      <Divider />
                      <Tab label="Arquivos" id="3" />
                      <Tab label="Chevalier" id="4" />
                      <Tab label="Cursos" id="5" />
                      <Tab label="Documento eleitoral" id="6" />
                      <Tab label="Fórum de dúvidas" id="7" />
                      <Tab label="Regimento interno" id="8" />
                      <Tab label="Relatórios" id="9" />
                      <Tab label="Tickets" id="10" />
                    </Tabs>
                  </Grid>
                  <Grid item xs="9">
                    <div>
                      <TabPanel value={selectedTab} index={0} id="manual">
                        <Typography variant="h4" align="center">
                          DeskGCESP
                      </Typography>
                        <br /><br />
                        <Typography paragraph>
                          Este manual faz parte do DeskGCESP, sistema administrativo do GCESP - Grande Conselho Estadual da Ordem DeMolay de São Paulo.
                          Ele esta dividido em seções, onde cada seção explica e detalha uma parte ou função do sistema. As seções são:
                      </Typography>
                        <Typography>- Recursos Comuns das interfaces</Typography>
                        <Typography>- Cadastros Básicos</Typography>
                        <Typography>- Arquivos</Typography>
                        <Typography>- Chevalier</Typography>
                        <Typography>- Cursos</Typography>
                        <Typography>- Documento eleitoral</Typography>
                        <Typography>- Fórum de dúvidas</Typography>
                        <Typography>- Regimento interno</Typography>
                        <Typography>- Relatórios</Typography>
                        <Typography>- Tickets</Typography>
                      </TabPanel>
                      <TabPanel value={selectedTab} index={2} id="recursosComuns">
                        <Typography variant="h4" align="center">
                          Recursos Comuns das interfaces
                        </Typography>
                        <br /><br />
                        <Typography paragraph>
                          Os recursos comuns das interface são recursos que aparecem várias vezes no sistema, sendo esses:
                          Botões (salvar,cancelar,enviar,responder,download) - grande e pequeno
                          Modal para confirmação de ação
                          Mensagem de aviso/ mensagem depois de alguma ação
                          Botão de opção na linha da tabela
                          Seta do botão de expansão
                        </Typography>
                        <Typography variant="h6" align="center">Botões</Typography>
                        <Typography paragraph>
                          Todos os botões do sistema tem uma cor, algo escrito e uma funcionalidade. Eles podem ser azul com letra branca, branco com letra preta ou branco com
                           letra azul que quando passa o mouse por cima fica azul com letra branca. Eles também podem ser pequenos ou grandes e a sua legenda é a sua função.           
                        </Typography>
                        <br/>
                        <Grid container justify="center">
                          <Grid item>
                            {this.showImage(imgRecursosBotao1)}
                            <br/>
                          </Grid>
                          <Grid item>
                            {this.showImage(imgRecursosBotao2)}
                            <br/>
                          </Grid>
                          <Grid item>
                            {this.showImage(imgRecursosBotao3)}
                            <br/>
                          </Grid>
                        </Grid>
                        <Typography variant="h6" align="center">Confirmação de ações</Typography>
                        <Typography paragraph>
                          Algumas ações que envolvem transação com o banco de dados necessitam de uma confirmação antes de serem realizadas. Essa confirmação é uma caixa de 
                          diálogo com uma mensagem, e dois botões: um para confirmar e outro para cancelar a ação. Alguns exemplos de ações são: todas as exclusões, 
                          toas as açções em relação a votação Chevalier, fechar ticket, dentre outras.
                        </Typography>
                        <br/>
                        <Grid container justify="center">
                          <Grid item>
                            {this.showImage(imgRecursosModal)}
                            <br/>
                          </Grid>
                        </Grid>
                        <Typography variant="h6" align="center">Botões de opção</Typography>
                        <Typography paragraph>
                          Os botões de opções estão presentes no final das linhas da tabela e serve para mostrar opções de ações ao serem clicados.
                        </Typography> 
                        <br/>
                        <Grid container justify="center">
                          <Grid item>
                            {this.showImage(imgRecursosBotaoOpcao)}
                            <br/>
                          </Grid>
                        </Grid>
                        <Typography variant="h6" align="center">Páineis de expansão</Typography>
                        <Typography paragraph>
                          Os páineis de expansão são compostos pela cabeçalho que está sempre visível e pela parte expandida que só se torna visível quando se clica na seta
                          que fica no final do cabeçalho do painel.
                        </Typography>       
                        <br/>
                        <Grid container justify="center">
                          <Grid item>
                            {this.showImage(imgRecursosPainel1)}
                            <br/>
                          </Grid>
                          <Grid item>
                            {this.showImage(imgRecursosPainel2)}
                            <br/>
                          </Grid>
                        </Grid>                 
                        <Typography variant="h6" align="center">Mensagens</Typography>
                        <Typography paragraph>
                          Sempre que alguma função do sistema é acionada uma mensagem aparece, essa mensagem pode ser dizendo que falta algum campo a ser preenchido, que a ação foi
                          feita com sucesso ou que teve algum erro e ela é uma caixa de diálogo com um texto e um botão 'OK'
                        </Typography>
                        <br/>
                        <Grid container justify="center">
                          <Grid item>
                            {this.showImage(imgRecursosMensagem1)}
                            <br/>
                          </Grid>
                          <Grid item>
                            {this.showImage(imgRecursosMensagem2)}
                            <br/>
                          </Grid>
                        </Grid>
                      </TabPanel>
                      <TabPanel value={selectedTab} index={4} id="crudBasico">
                        <Typography variant="h4" align="center">
                          Cadastros Básicos
                        </Typography>
                        <br /><br />
                        <Typography paragraph>
                          Os cadastros básicos do sistema são as informações essencias para o funcionamento do sistema e das funções fundamentais, e permite que os dados sejam  
                          adicionados, alterados e excluidos, como por exemplo: os usuários, as permissões, os capítulos e as categorizações (área de curso, fórum e ticket,
                          e tipo de arquivo). Para acessar os cadastros o usuário deve ter permissão para realizar o mesmo.
                       </Typography>
                       <br/><br/>
                       <Typography variant="h6" align="center">
                          Usuários
                        </Typography>
                       <Typography paragraph>
                         Para acessar a tela de usuários só é preciso clicar na opção Usuários na barra lateral. A tela principal dos usuários contém uma tabela com as seguintes colunas: nome do usuário, seu e-mail, seu papel e um botão para alterar seu papel
                         se ele tiver permissão. Para alterar o papel basta clicar no botão e uma janela de diálogo aparecerá com a atual permissão e um botão de seleção para
                         o novo papel, então para finalizar é só escolher o papel e clicar em confirmar. Os papéis são: Usuário, Membro do GCESP, Grande Tesoureiro Estadual, Grande Secretário Estadual, Grande Orador Estadual, 
                         Grande Mestre Estadual, Editor, Moderador, Administrador e Super-Administrador.
                       </Typography>
                        <br /><br />
                        {this.showImage(imgCrudUsuarios)}
                        <br /><br />
                        {this.showImage(imgCrudUsuariosAlterarPapel)}
                        <br /><br />
                        <Typography variant="h6" align="center">
                          Capítulos
                        </Typography>
                        <Typography paragraph>
                          Para acessar a tela de capítulos só é preciso clicar na opção Capítulos na barra lateral. A tela dos capítulos possui uma tabela com as colunas:
                           nome do capítulo, número e a cidade, além de um botão de opção para excluir e alterar se o usuário tiver permissão. Em cima da tabela tem um botão para 
                           adicionar um novo capítulo, que também só aparece se o usuário tiver permissão.
                           Ao clicar no botão de adicionar uma caixa de diálogo aparece, para adicionar basta preencher os campos, que são: o nome, o número e
                           a cidade, e clicar em confirmar. Para alterar deve-se clicar no botão de opção no canto direito da linha e em seguida clicar em alterar, ao clicar 
                           a mesma caixa de diálogo do botão adicionar aparece, porém essa possui os campos ja preenchidos com os dados do capítulo selecionado. 
                           Para finalizar a alteração basta alterar as informações e clicar em confirmar. Para excluir é necessário clicar no botão de opção no canto direito,
                            em seguida em excluir e em confirmar. 
                        </Typography>
                        <br /><br />
                        {this.showImage(imgCrudCapitulos)}
                        <br /><br />
                        {this.showImage(imgCrudCapituloAdd)}
                        <br /><br />
                        <Typography variant="h6" align="center">
                          Categorização
                        </Typography>
                        <Typography paragraph>
                          Como o próprio nome diz, essa categorização serve para separar os dados em categorias. Nesse sistema existe: áreas do curso, áreas do fórum, 
                          áreas do ticket e tipos de arquivo. Os botões para visualizá-los estão sempre na parte de administrador da função específica em cima da tabela
                          ou no cabeçalho. O funcionamento de todos estes cadastros são muito parecidos com o funcionamento do cadastro de capítulos, as telas possuem uma tabela
                          com as colunas: nome e descrição e um botão de opção para alterar e excluir se ele tiver permissão. Em cima da tabela tem um botão de adicionar que também 
                          só aparece se o usuário tiver permissão. Para adicionar basta clicar no botão de adicionar, preencher a caixa de diálogo que irá aparecer com o nome
                          e a descrição e clicar em confirmar. Para alterar deve-se clicar no botão de opção no canto direito da linha e em seguida clicar em alterar, ao clicar 
                           a mesma caixa de diálogo do botão adicionar aparece, porém essa possui os campos ja preenchidos com os dados da área selecionada. 
                           Para finalizar a alteração basta alterar as informações e clicar em confirmar. Para excluir é necessário clicar no botão de opção no canto direito,
                            em seguida em excluir e em confirmar.
                          </Typography>
                        <br /><br />
                        {this.showImage(imgCrudAreas)}
                        <br /><br />
                        {this.showImage(imgCrudAreaAdd)}
                        <br /><br />
                      </TabPanel>
                      <TabPanel value={selectedTab} index={6} id="arquivo">
                        <Typography variant="h4" align="center">
                          Arquivos
                      </Typography>
                        <br /><br />
                        <Typography paragraph>
                          Na parte do usuário a tela possui uma lista de painéis de expansão com os arquivos. Para fazer o download deve-se
                          expandir o painel e clicar no botão Download. A parte expandida também contém o tipo e a descrição do arquivo.
                        </Typography>
                        <br /><br />
                        {this.showImage(imgArquivoUser)}
                        <br /><br />
                        <Typography paragraph>
                          Na parte de administrador a tela de arquivo tem uma tabela com as colunas contendo: o nome do arquivo, seu tipo, se está visível e um botão para
                          fazer o download do arquivo. Em cima da tabela tem um botão para visualizar os tipos de arquivos e, se o usuário tiver permissão,
                          um para disponibilizar novos arquivos. Também é possível tornar mudar a visibilidade do arquivo e excluí-lo.
                        </Typography>
                        <br /><br />
                        {this.showImage(imgArquivoAdm)}
                        <br /><br />
                        <Typography paragraph>
                          Para disponibilizar um novo arquivo basta clicar no botão, preencher os campos de nome e descrição, selecionar o tipo de arquivo,
                          se ele estará visível, escolher o arquivo e clicar em disponibilzar.
                          Para alterar a visibilidade e excluir o arquivo deve-se clicar no botão de opções, selecionar a respectiva ação e clicar em confirmar.
                        </Typography>
                        <br /><br />
                        {this.showImage(imgArquivoAdd)}
                        <br /><br />
                      </TabPanel>
                      <TabPanel value={selectedTab} index={7} id="chevalier">
                        <Typography variant="h4" align="center">
                          Indicação Chevalier
                      </Typography>
                        <br /><br />
                        <Typography paragraph>
                          Na parte do usuário, a tela principal contém uma lista de painéis de expansão contendo todas as informações de todas as indicações
                          enviadas pelo usuário, e logo abaixo está o botão de enviar uma nova indicação. Se a indicação ainda não foi respondida um botão para
                          deletar no canto inferior direito do painel estará disponível.
                        </Typography>
                        <br /><br />
                        {this.showImage(imgIndicacaoUser)}
                        <br /><br />
                        <Typography paragraph>
                          Para fazer uma nova indicação é necessário clicar no botão de indicar membro e uma nova tela com um formulário aparecerá contendo: um botão de seleção 
                          para escolher o capítulo, seis campos de texto para o nome e ID do indicado, e o nome, e-mail, CPF e telefone do Presidente do Conselho Consultivo, e 
                          também um botão para selecionar e anexar a ficha de indicação. Para finalizar o envio deve-se preencher todos os campos e clicar em enviar.
                          Se o usuário não possuir uma ficha preenchida ele pode baixar um modelo no link logo abaixo do botão de anexar a ficha. Para excluir uma
                          indicação deve-se clicar no botão de deletar, na tela principal da indicação, e em seguida em confirmar.
                        </Typography>
                        <br /><br />
                        {this.showImage(imgIndicacaoIndicar)}
                        <br /><br />
                        <Typography paragraph>
                          Na parte de administrador, a tela principal possui uma tabela com as colunas contendo: nome do indicado, nome do capítulo, data de envio, seu status e
                          um botão para visualizar a indicação. O processo para uma indicação ser votada funciona da seguinte maneira: primeiro a indicação 
                          deve ser analisada pela Acessoria de Chevalier e encaminhada para a Grande Secretaria. Depois de encaminhada a indicação deve ser aberta para votação,
                          sendo possível que a Diretoria Executiva possa votar, depois que todos os votos tiverem sido feitos a votação deve ser encerrada, chegando em um resultado
                          por maioria simples (50% + 1).
                        </Typography>
                        <br /><br />
                        {this.showImage(imgIndicacaoAdm)}
                        <br /><br />
                        <Typography paragraph>
                          Ao clicar em visualizar indicação será encaminhado para uma tela que possui três painéis de expansão com todas as informações da indicação e de quem indicou
                          divididas em: Informações do envio, Informações do capítulo e Informações do indicado. Abaixo dos painéis estão os botões de ações que aparecem de acordo
                          com o status da indicação e da permisão do usuário, eles são: encaminhar, abrir votação, votar/visualizsar voto e encerrar votação.
                        </Typography>
                        <br /><br />
                        {this.showImage(imgIndicacaoVisualizar)}
                        <br /><br />
                        {this.showImage(imgIndicacaoEncaminhar)}
                        <br /><br />
                        {this.showImage(imgIndicacaoAbrirVotacao)}
                        <br /><br />
                        <Typography paragraph>
                          Para encaminhar, abrir e encerrar uma votação deve-se clicar em seu respectivo botão e em seguida em confirmar. Para votar é necessário clicar no botão votação 
                          e um cartão aparecerá com duas caixas de seleção (aprovado ou reprovado) e um campo grande de texto para fazer uma observação, então deve-se 
                          selecionar se o candidato está aprovado ou não, escrever o motivo e clicar em enviar. Se o usuário ja tiver votado para essa indicação, ao clicar em 
                          votação o cartão aparecerá contendo as informações do voto: data, parecer e comentário. 
                        </Typography>
                        <br /><br />
                        {this.showImage(imgIndicacaoVotar)}
                        <br /><br />
                        {this.showImage(imgIndicacaoEncerrar)}
                        <br /><br />
                      </TabPanel>
                      <TabPanel value={selectedTab} index={8} id="curso">
                        <Typography variant="h4" align="center">
                          Cursos
                        </Typography>
                        <br /><br />
                        <Typography>
                          Na parte de curso para o administrador é possível adicionar, alterar e excluir um curso e para cada curso é possível adicionar,alterar e 
                          excluir uma vídeo aula. Na parte de usuário é possível visualizar os cursos e se inscrever, ao se inscrevr é possível visualizar o vídeo.

                        </Typography>
                        <br /><br />
                        {this.showImage(imgCursosAdm)}
                        <br /><br />
                        {this.showImage(imgCursosAddVideo1)}
                        <br /><br />
                        {this.showImage(imgCursosAddVideo2)}
                        <br /><br />
                      </TabPanel>
                      <TabPanel value={selectedTab} index={9} id="documento">
                        <Typography variant="h4" align="center">
                          Documento Eleitoral
                        </Typography>
                        <br /><br />
                        <Typography paragraph>
                          Na parte do usuário, a tela principal contém uma lista de painéis de expansão contendo todas as informações de todos os documentos
                          enviados pelo usuário, e logo abaixo está o botão de enviar um novo documento. Se o documento ainda não foi respondido um botão para
                          deletar no canto inferior direito do painel estará disponível.
                        </Typography>
                        <br /><br />
                        {this.showImage(imgDocumentoUser)}
                        <br /><br />
                        {this.showImage(imgDocumentoUser2)}
                        <br /><br />
                        <Typography paragraph>
                          Para enviar um novo documento basta clicar no botão de enviar, e uma nova tela com um formulário passo-a-passo aparecerá, o primeiro passo do
                          formulário contém: um botão de seleção para escolher o capítulo, e oito campos de texto para o nome, e-mail, CPF e telefone do Mestre Conselheiro
                          e do Presidente do Conselho Consultivo; o segundo passo contém: nove campos para selecionar data referente as atividades obrigatórias planejadas para 
                          a gestão, sendo elas: Instalação, Iniciação, Elevação, Dia dos Pais, Dia do Patriota, Dia Educacional, Dia do Meu Governo, Dia DeMolay de Conforto e
                          Dia em Memória a Frank S. Land; e o terceiro passo contém um botão para selecionar e anexar a Ata de Eleição e três campos de texto para os
                           IDs do Mestre Conselheiro, 1° Conselheiro e 2° Conselheiro respectivamente. Para finalizar o envio deve-senpreencher todos os campos e
                           clicar em enviar. Para excluir um documento enviado deve-se clicar no botão de excluir e em seguida em confirmar.
                        </Typography>
                        <br /><br />
                        {this.showImage(imgDocumentoEnviar1)}
                        <br /><br />
                        {this.showImage(imgDocumentoEnviar2)}
                        <br /><br />
                        {this.showImage(imgDocumentoEnviar3)}
                        <Typography paragraph>
                          Na parte de administrador, a tela principal possui uma tabela com as colunas contendo: nome do capítulo, data de envio e seu status.
                          Se o documento ainda não tiver sido respondido e o usuário tiver permissão, um botão de responder estará dispoível ao final da linha.
                        </Typography>
                        <br /><br />
                        {this.showImage(imgDocumentoAdm)}
                        <br /><br />
                        <Typography paragraph>
                          Para responder é necessário clicar no botão de responder do documento desejado, ao clicar será encaminhado para um nova tela que
                          possui três paineis de expansão contendo todas as informações do documento divididas em: Infoamações iniciais, Atividades capitulares e
                          Informações finais, um campo grande de texto para observação e duas caixas de seleção: uma para aprovado e outra para reprovado. Para finalizar
                          o envio da resposta deve-se preencher a observação, selecionar se o documento está aprovado ou reprovado e clicar em enviar resposta
                        </Typography>
                        <br /><br />
                        {this.showImage(imgDocumentoResponder)}
                        <br /><br />
                      </TabPanel>
                      <TabPanel value={selectedTab} index={10} id="forum">
                        <Typography variant="h4" align="center">
                          Fórum de Dúvidas
                      </Typography>
                        <br /><br />
                        <Typography paragraph>
                          A tela inicial do fórum possui: dois botões, um para visualizar as áreas do fórum e outro para adicionar um tópico, abaixo
                          está uma lista de painéis de expansão com as áreas do fórum, a parte expandida contém a descrição da área e
                          uma lista de links com tópicos dessa área, para visualizá-los é só clicar no link.
                        </Typography>
                        {this.showImage(imgForumPrincipal)}
                        <Typography paragraph>
                          Para adicionar um novo tópico deve-se clicar no botão de adicionar no canto superior, escolher a área do tópico e confirmar.
                          Em seguida, será encaminhado para uma nova tela onde deve-se preencher o título do tópico e seu comentário e clicar em salvar.
                        </Typography>
                        {this.showImage(imgForumAddTopico)}
                        <br /><br />
                        {this.showImage(imgForumAddTopico2)}
                        <br /><br />
                        <Typography paragraph>
                          A tela do tópico possui um cabeçalho com seu título, o usuário que criou, a data de criação, a área e se está aberto ou fechado.
                          Abaixo está uma lista de cartões com os comentários, data e nome de quem enviou. É possível escrever um comentário e responder qualquer
                          comentário de qualquer tópico que esteja aberto. Se o assunto for resolvido o tópico pode ser fechado. Além disso, qualquer tópico e
                          comentário pode ser excluído pelo usuário que o escreveu
                        </Typography>
                        <br /><br />
                        {this.showImage(imgForumTopico)}
                        <br /><br />
                        <Typography paragraph>
                          Os botões de fechar e responder o tópico estão na parte inferior da tela, enquanto o de excluir está na parte superior direita.
                          Para responder o tópico deve-se clicar no botão de responder, preencher o comentário que deseja enviar e confirmar.
                          Responder um comentário é muito parecido com responder um tópico, a diferença é que deve-se clicar no botão de responder do comentário.
                          Para fechar o tópico e excluir, tanto o tópico quanto o comentário, deve-ser clicar no seu respectivo botão de excluir e clicar em confirmar.
                        </Typography>
                        <br /><br />
                        {this.showImage(imgForumResponderTopico)}
                        <br /><br />
                      </TabPanel>
                      <TabPanel value={selectedTab} index={11} id="regimento">
                        <Typography variant="h4" align="center">
                          Regimento Interno
                      </Typography>
                        <br /><br />
                        <Typography paragraph>
                          Na parte do usuário, a tela principal contém uma lista de painéis de expansão contendo todas as informações de todos os regimentos
                          enviados pelo usuário, e logo abaixo está o botão de enviar um novo regimento. Se o regimento ainda não foi respondido um botão para
                          deletar no canto inferior direito do painel estará disponível.
                        </Typography>
                        <br /><br />
                        {this.showImage(imgRegimentoUser)}
                        <br /><br />
                        <Typography paragraph>
                          Para enviar um novo documento basta clicar no botão de enviar, e uma nova tela com um formulário passo-a-passo aparecerá, o primeiro passo do
                          formulário contém: um botão de seleção para escolher o capítulo, e oito campos de texto para o nome, e-mail, CPF e telefone do Mestre Conselheiro
                          e do Presidente do Conselho Consultivo; e o segundo contém: um botão para selecionar e anexar o Regimento Interno e
                          três campos de texto para os IDs do Mestre Conselheiro, 1° Conselheiro e 2° Conselheiro respectivamente. Para finalizar o envio deve-se
                          preencher todos os campos e clicar em enviar. Para excluir um regimento enviado deve-se clicar no botão de excluir e em seguida em confirmar.
                        </Typography>
                        <br /><br />
                        {this.showImage(imgRegimentoEnviar1)}
                        <br /><br />
                        {this.showImage(imgRegimentoEnviar2)}
                        <br /><br />
                        <Typography paragraph>
                          Na parte de administrador, a tela principal possui uma tabela com as colunas contendo: nome do capítulo, data de envio e seu status.
                          Se o regimento ainda não tiver sido respondido e o usuário tiver permissão, um botão de responder estará dispoível ao final da linha.
                        </Typography>
                        <br /><br />
                        {this.showImage(imgRegimentoAdm)}
                        <br /><br />
                        <Typography paragraph>
                          Para responder é necessário clicar no botão de responder do regimento desejado, ao clicar será encaminhado para um nova tela que
                          possui dois paineis de expansão contendo todas as informações do regimento divididas em: Informações básicas e Informações adicionais e Regimento,
                          um campo grande de texto para observação e duas caixas de seleção: uma para aprovado e outra para reprovado. Para finalizar
                          o envio da resposta deve-se preencher a observação, selecionar se o regimento está aprovado ou reprovado e clicar em enviar resposta
                        </Typography>
                        <br /><br />
                        {this.showImage(imgRegimentoResponder)}
                        <br /><br />
                      </TabPanel>
                      <TabPanel value={selectedTab} index={12} id="relatorio">
                        <Typography variant="h4" align="center">
                          Relatórios
                      </Typography>
                        <br /><br />
                        <Typography>
                          Os relatórios são parte importante do sistema e são responsáveis por gerar informações relevantes para os administradores do sistema com objetivo
                          de ajudar na tomada de decisão e um melhor conhecimento da própria organizão. Os relatórios disponíveis são: (...).
                          Para buscar as informações deve-se selecionar qual relatório deseja, filtrar por algum capítulo se possível e clicar em buscar. Ao buscar 
                          as informações aparecerão em forma de tabela e um botão de gerar PDF aparecerá ao lado do botão de buscar. Para gerar basta clicar no botão, o PDF
                          gerado contém o tipo de relatório,filtro e a tabela com todas as informações. Cada relatório tem tabelas com colunas diferentes, variando de duas a 
                          cinco. 
                        </Typography>
                        <br /><br />
                        {this.showImage(imgRelatorio)}
                        <br /><br />
                        {/* FOTO TELA PRINCIPAL RELATORIO - COLOCAR BUSCADO? PDF?  */}
                      </TabPanel>
                      <TabPanel value={selectedTab} index={13} id="ticket">
                        <Typography variant="h4" align="center">
                          Tickets
                      </Typography>
                        <br /><br />
                        <Typography paragraph>
                          Na parte de usuário a tela principal de tickets contém uma lista de painéis de expansão com todos os tickets enviados pelo usuário. No painel 
                          está o status e o assunto do ticket, enquanto a parte expandida contém sua área, data de envio, a data de fechamento se estiver fechada,
                          e, no canto inferior direito, um botão para visualizar detalhes do ticket e um botão para excluir se o ticket ainda não foi respondido.
                          Abaixo do painel está um botão para abrir um novo ticket.
                        </Typography>
                        <br /><br />
                        {this.showImage(imgTicketUser)}
                        <br /><br />
                        <Typography paragraph>
                          Para abrir um novo ticket é necessário clicar no botão de abrir, ao clicar será encaminhado para uma tela contendo: um botão de seleção para 
                          escolher a área do ticket, um campo de texto para o assunto, um campo grande grande de texto para detalhar o problema e um botão para selecionar
                          um arquivo, esse arquivo pode ser qualquer coisa como um vídeo, ou uma foto, ou uma pasta, e seu objetivo é ajudar no entendimento do problema
                          para que seja resolvido da melhor forma possível. Para finalizar o envio deve-se selecionar a área, preencher os campos, se quiser anexar um arquivo 
                          e clicar em enviar. Para excluir um ticket deve-se clicar no botão de excluir e em seguida em confirmar. 
                        </Typography>
                        <br /><br />
                        {this.showImage(imgTicketEnviar)}
                        <br /><br />
                        <Typography paragraph>
                          Na parte de administrador a tela de tickets tem uma tabela com as colunas contendo: o assunto do ticket, sua área, sua data de abertura, 
                          seu status e um botão para visualizar o ticket. Em cima da tabela tem um botão para visualizar as áreas do ticket.
                        </Typography>
                        <br /><br />
                        {this.showImage(imgTicketAdm)}
                        <br /><br />
                        <Typography paragraph>
                          Ao clicar em visualizar ticket em ambas as partes (usuário e administrador) será encaminhado para a tela do ticket contendo: o assunto, a área,
                          a data de abertura, o status, data de fechamento se estiver fechado e quem enviou. Abaixo está uma lista de cartões com a descrição do problema 
                          e as respostas. Este cartão contém a data do envio, a descrição, quem enviou a resposta e um botão para baixar o arquivo se ele foi enviado ou uma 
                          mensagem dizendo que não foi enviado nenhum arquivo. Para baixar o arquivo basta clicar no botão de Download. Abaixo de todas as respostas estão: 
                          um botão para voltar, um botão para fechar o ticket se ele estiver sido respondido e o usuário tiver permissão, e um botão para responder que fica habilitado 
                          se o ticket estiver aberto e desabilitado se estiver fechado.
                        </Typography>
                        <br /><br />
                        {this.showImage(imgTicketVisualizar)}
                        <br /><br />
                        <Typography paragraph>
                          Para responder um ticket é necessário clicar no botão de responder, em seguida um cartão aparecerá com um campo grande de texto para o comentário,
                          um botão para selecionar arquivo e dois botões, um para cancelar e outro para enviar. Para finalizar o envio da resposta deve-se digitar o comentário, 
                          adicionar um arquivo se achar necessário e clicar em enviar. Para fechar um ticket deve-se clicar em fechar e em seguida em confirmar. 
                        </Typography>
                        <br /><br />
                        {this.showImage(imgTicketResponder)}
                        <br /><br />
                      </TabPanel>
                    </div>
                  </Grid>
                </Grid>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default HelpDesk;
