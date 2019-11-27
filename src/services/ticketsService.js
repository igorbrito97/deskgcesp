import firebase from "firebaseConfig";
const databaseRef = firebase.database().ref();
const storageRef = firebase.storage().ref();

 export const getAllAreaTickets = async () => {
    const AreaTicketRef = databaseRef.child("areaticket");
     return new Promise(function(resolve,reject) {
        AreaTicketRef.once('value', snapshot => {
        let areas = snapshot.val();
        setTimeout(() => {
            if(areas)
                resolve(areas);
            else
                reject(null);
        },1)
        
        });
    })
 };

 export const deleteAreaTicket = (idAreaTicket) => {
    // ver de enviar usuario, ai ao inves de anonimaneto vai ser real
    const AreaTicketRef = databaseRef.child("areaticket/"+idAreaTicket);
    AreaTicketRef.remove()  
    .then(() => {
      alert("Area exluida com sucesso!");
    })
    .catch(function(error) {
      alert(error);
    });
};

export const addAreaTicket = (nome,descricao) => {
    // ver de enviar usuario, ai ao inves de anonimaneto vai ser real
    const AreaTicketRef = databaseRef.child("areaticket").push();
    AreaTicketRef.set({
      areaticket_cod: AreaTicketRef.key,
      areaticket_nome: nome,
      areaticket_descricao: descricao
    })
    .then(() => {
      alert("Area do ticket inserido com sucesso!");
    })
    .catch(function(error) {
      alert(error);
    });
};

export const updateAreaTicket = (id,nome,descricao) => {
    // ver de enviar usuario, ai ao inves de anonimaneto vai ser real
    const AreaTicketRef = databaseRef.child("areaticket/"+id);
    AreaTicketRef.update({
      areaticket_nome: nome,
      areaticket_descricao: descricao
    })
    .then(() => {
      alert("Area do ticket alterado com sucesso!");
    })
    .catch(function(error) {
      alert(error);
    });
};

export const getAreaTIcketById = (id) => {
  const AreaTicketRef = databaseRef.child("areaticket/"+id);
     return new Promise(function(resolve,reject) {
        AreaTicketRef.once('value', snapshot => {
        let area = snapshot.val();
        setTimeout(() => {
            if(area)
                resolve(area);
            else
                reject(null);
        },1)
        
        });
    })
}

  
 /* TICKET */

 export const abrirTicket = (assunto,descricao,idArea,idUser,userName,data,arq) => {
   const ticketRef = databaseRef.child("ticket").push();
   const conteudoTicketRef = databaseRef.child("conteudoTicket/"+ticketRef.key).push();
   ticketRef.set({
     ticket_cod:ticketRef.key,
     ticket_dataAbertura: data,
     ticket_assunto: assunto,
     ticket_status: 'Aberto',
     areaticket_cod: idArea,
     ticket_user: idUser,
     ticket_username: userName
   })
   .then(() => {
     conteudoTicketRef.set({
      conteudotic_cod: conteudoTicketRef.key,
      conteudotic_descricao: descricao,
      conteudotic_data: data,
      conteudotic_arquivo: Boolean(arq),
      conteudotic_user: idUser,
      conteudotic_username: userName
     })
     .then(() => {
      if(arq) {
        const arquivoRef = storageRef.child("ticket/"+ticketRef.key + "/" + conteudoTicketRef.key);
        arquivoRef.put(arq)
        .then(() => {
          alert("Ticket aberto!! Logo responderemos");
        })
        .catch(function(error) {
          alert("Erro ao enviar ticket! Não foi possível enviar o arquivo. Erro: " + error);
        })
      }
      else 
       alert("Ticket aberto!! Logo responderemos");
     })
     .catch(function(error){
       alert("Erro ao abrir ticket! Erro: " + error);
     })     
   })
   .catch(function(error) {
     alert("Erro ao abrir ticket. Erro: " + error);
   })
}

export const deletarTicket = (idTicket) => {
  const ticketRef = databaseRef.child("ticket/"+idTicket);
  const conteudoRef = databaseRef.child("conteudoTicket/"+idTicket);
  const responseConteudo = getConteudoTicket(idTicket);
  let conteudo;
  responseConteudo.then(content => {
    if(content) {
      Object.keys(content).forEach(item => {
        conteudo = content[item];
      })
    }
  })
  .finally(() => {
    ticketRef.remove()
    .then(() => {
      conteudoRef.remove()
      .then(() => {
        if(conteudo.conteudotic_arquivo) { // tem arquivo para excluir 
          console.log('excluindo arquivi',conteudo);
          const ticketStorageRef = storageRef.child('ticket/'+idTicket + '/' + conteudo.conteudotic_cod);
          ticketStorageRef.delete()
          .then(() => {
            alert("Ticket excluido com sucesso!");
          })
          .catch(function(error){
            alert("Erro ao excluir arquivo do ticket! Erro: " + error);
          })
        }
        else
          alert("Ticket excluido com sucesso!");
      })
      .catch(function(error){
        alert("Erro ao excluir conteudo do ticket! Erro: " + error);
      })
    })
    .catch(function(error){
      alert("Erro ao excluir ticket! Erro: " + error);
    })
  })
  .catch(function(error){
    alert("Erro ao excluir ticket! Erro: " + error);
  })
}

export const getTicketsByUser = async (user) => {
  console.log('user',user);
  const ref = databaseRef.child('ticket/').orderByChild('ticket_user').equalTo(user);
  return new Promise(function(resolve,reject) {
    ref.once("value", snapshot => {
      let tickets = snapshot.val();
      setTimeout(() => {
        if(tickets)
            resolve(tickets);
        else
            reject(null);
      },1);
    })
  });
}

export const getAllTickets = async () => {
  const ref = databaseRef.child('ticket');
  return new Promise(function(resolve,reject) {
    ref.once("value", snapshot => {
      let tickets = snapshot.val();
      setTimeout(() => {
        if(tickets)
          resolve(tickets);
        else
          reject(null);
      },1);
    })
  });
}

export const getConteudoTicket = async (id) => {
  const ref = databaseRef.child('conteudoTicket/'+id);
  return new Promise(function(resolve,reject) {
    ref.once("value", snapshot => {
      let conteudo = snapshot.val();
      setTimeout(() => {
        if(conteudo)
          resolve(conteudo);
        else
          reject(null);
      },1);
    })
  });
}

export const downloadArqTicket = async (idTicket,idCont) => {
  console.log("idTicket",idTicket,'idCont',idCont);
  return new Promise(function(resolve,reject) {
    storageRef.child('ticket/'+idTicket+'/'+idCont).getDownloadURL()
    .then((url) => {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
            var file = xhr.response;
            resolve(file);
        };
        xhr.open('GET', url);
        xhr.send(); 
    })
    .catch((error) => {
        alert("Erro ao baixar arquivo!! Erro: " + error);
        reject(error);
    })
  })
}

export const responderTicket = (idTicket,idUser,username,descricao,arq,data) => {
  const conteudoRef = databaseRef.child('conteudoTicket/'+idTicket).push();
  conteudoRef.set({
    conteudotic_cod: conteudoRef.key,
    conteudotic_descricao: descricao,
    conteudotic_data: data,
    conteudotic_arquivo: Boolean(arq),
    conteudotic_user: idUser,
    conteudotic_username: username
  })
  .then(() => {
    const ticketRef2 = databaseRef.child('ticket/' + idTicket);
      ticketRef2.update({
          ticket_status: 'Respondido' 
    })
    .then(() => {
      if(arq) {
        const arquivoRef = storageRef.child("ticket/"+idTicket + "/" + conteudoRef.key);
        arquivoRef.put(arq)
        .then(() => {
          alert("Ticket respondido!!");
        })
        .catch(function(error) {
          alert("Erro ao responder ticket! Não foi possível enviar o arquivo. Erro: " + error);
        })
      }
      else 
       alert("Ticket respondido!!");
    })
    .catch(function(error){
      alert("Erro ao responder ticket! Erro: " + error);
    })
  })
  .catch(function(error) {
    alert("Erro ao responder ticket! Erro: " + error);
  });
}

export const fecharTicket = (idTicket,data,idUser,username) => {
  const ticketRef = databaseRef.child('ticket/' + idTicket + '/fechamento');
  ticketRef.set({
      fechamento_data: data,
      fechamento_user: idUser,
      fechamento_username: username
  })
  .then(() => {
      const ticketRef2 = databaseRef.child('ticket/' + idTicket);
      ticketRef2.update({
          ticket_status: 'Fechado' 
      })
      .then(() => {
          alert("Ticket fechado!");
      })
      .catch(function(error) {
          alert("Erro ao fechar ticket! Erro: " + error );
      });
  })
  .catch(function(error) {
      alert("Erro ao fechar ticket! Erro: " + error );
  });
}