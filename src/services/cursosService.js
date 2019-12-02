import firebase from "firebaseConfig";
const databaseRef = firebase.database().ref();
const storageRef = firebase.storage().ref();

/* AREA CURSO */
export const addAreaCurso = (nome,descricao) => {
    // ver de enviar usuario, ai ao inves de anonimaneto vai ser real
    const AreaCursoRef = databaseRef.child("areacurso").push();
    AreaCursoRef.set({
      areacurso_cod: AreaCursoRef.key,
      areacurso_nome: nome,
      areacurso_descricao: descricao
    })
    .then(() => {
      alert("Area do curso inserido com sucesso!");
    })
    .catch(function(error) {
      alert(error);
    });
};

export const deleteAreaCurso = (idAreaCurso) => {
    // ver de enviar usuario, ai ao inves de anonimaneto vai ser real
    const AreaCursoRef = databaseRef.child("areacurso/"+idAreaCurso);
    AreaCursoRef.remove()
    .then(() => {
      alert("Area exluida com sucesso!");
    })
    .catch(function(error) {
      alert(error);
    });
};

export const getAllAreaCursos = async () => {
    const AreaCursoRef = databaseRef.child("areacurso");
    return new Promise(function(resolve,reject) {
        AreaCursoRef.once("value", snapshot => {
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

export const updateAreaCurso = (id,nome,descricao) => {
    const AreaCursoRef = databaseRef.child("areacurso/"+id);
    AreaCursoRef.update({
      areacurso_nome: nome,
      areacurso_descricao: descricao
    })
    .then(() => {
      alert("Area do curso alterado com sucesso!");
    })
    .catch(function(error) {
      alert(error);
    });
};

/* CURSO */

export const addCurso = (titulo,subtitulo,descricao,areaCod,visivel,imgCurso) => {
    // ver de enviar usuario, ai ao inves de anonimaneto vai ser real
    const CursoRef = databaseRef.child("curso").push();
    CursoRef.set({
      curso_cod: CursoRef.key,
      curso_titulo: titulo,
      curso_subtitulo: subtitulo,
      curso_descricao: descricao,
      curso_visivel: visivel,
      areacurso_cod: areaCod
    })
    .then(() => {
      if(imgCurso) {
        const imgCursoRef = storageRef.child('imgCurso/'+CursoRef.key);
        imgCursoRef.put(imgCurso)
        .then(() => {
          alert("Curso inserido com sucesso!");
        })
        .catch(function(error) {
          alert(error);
        });
      }
      else
        alert("Curso inserido com sucesso!");
    })
    .catch(function(error) {
      alert(error);
    });
  };

  export const deleteCurso = (id) => {
    // ver de enviar usuario, ai ao inves de anonimaneto vai ser real
    const CursoRef = databaseRef.child("curso/"+id);
    CursoRef.remove()
    .then(() => {
      const imgRef = storageRef.child("imgCurso/"+id);
      imgRef.getDownloadURL() //se existir imagem exclui
      .then((url) => {
        if(url) {
          imgRef.delete().then(() => {
            alert("Curso exluido com sucesso!");
          })
          .catch(function(error) {
            alert("Erro ao exlcuir imagem do curso: " + error)
          })
        }
      })
      .catch(function(error){

      })
    })
    .catch(function(error) {
      alert("Erro ao exlcuir curso: " + error);
    });
          
};

export const getAllCursos = async () => {
    const CursoRef = databaseRef.child("curso");
    return new Promise(function(resolve,reject) {
        CursoRef.on("value", snapshot => {
        let cursos = snapshot.val();
        setTimeout(() => {
            if(cursos)
                resolve(cursos);
            else
                reject(null);
        },1)
        
        });
    })
};


export const getCursosVisiveis = async () => {
  const CursoRef = databaseRef.child("curso").orderByChild('curso_visivel').equalTo(true);
  return new Promise(function(resolve,reject) {
      CursoRef.on("value", snapshot => {
      let cursos = snapshot.val();
      setTimeout(() => {
          if(cursos)
              resolve(cursos);
          else
              reject(null);
      },1)
      
      });
  })
};

export const updateCurso = (id,titulo,subtitulo,descricao,areaCod,visivel,imgCurso,prevImgCurso) => {
    // ver de enviar usuario, ai ao inves de anonimaneto vai ser real
    const AreaCursoRef = databaseRef.child("curso/"+id);
    AreaCursoRef.update({
      curso_titulo: titulo,
      curso_subtitulo: subtitulo,
      curso_descricao: descricao,
      curso_visivel: visivel,
      areacurso_cod: areaCod
    })
    .then(() => {
      const imgRef = storageRef.child("imgCurso/"+id);
      if(imgCurso) { //tem uma nova imagem
        if(prevImgCurso) { //se existe uma imagem ela deve ser apagada
          imgRef.delete().then(() => {
            imgRef.put(imgCurso)
            .then(() => {
              alert("Curso alterado com sucesso!");
            })
            .catch(function(error) {
              alert(error);
            });
          })
          .catch(function(error) {
            alert("Erro ao alterar imagem do curso" + error);
          })
        }
        else {
          imgRef.put(imgCurso)
          .then(() => {
            alert("Curso alterado com sucesso!");
          })
          .catch(function(error) {
            alert(error);
          });
        }
      }
    })
    .catch(function(error) {
      alert(error);
    });
};

export const getImgCurso = async (id) => {
  return new Promise(function(resolve,reject) {
    storageRef.child('imgCurso/'+id).getDownloadURL()
    .then((url) => {
      if(url)
        resolve(url);
    })
    .catch((error) => {
      reject(error);
    })
  })
}

export const mudarVisibilidade = (id,value) => {
  const ref = databaseRef.child('curso/'+id);
  ref.update({
    curso_visivel: value
  })
  .then(() => {
    alert('Visibilidade do curso alterada com sucesso!')
  })
  .catch(function(error){
    alert("Erro ao mudar visilidade do arquivo! Erro: " + error);
  }); 
}

/* VIDEO AULA */

export const addVideo = (idCurso,titulo,descricao,arq) => {
  //colocar duração do video
  const videoRef = databaseRef.child('videoaula/' + idCurso).push();
  videoRef.set({
    video_cod: videoRef.key,
    video_titulo: titulo,
    video_descricao: descricao
  })
  .then(() => {
    const storageVideoRef = storageRef.child('videoaula/' + idCurso + '/' + videoRef.key);
    storageVideoRef.put(arq)
    .then(() => {
      alert('Video inserido com sucesso!');
    })
    .catch(function(error){
      alert('Erro ao inserir arquivo da vídeo aula!. Erro: ' + error);
    })
  })
  .catch(function(error){
    alert('Erro ao inserir vídeo aula!. Erro: ' + error);
  })
}


export const updateVideo = (idCurso,idVideo,titulo,descricao,video) => {
  const videoRef = databaseRef.child('videoaula/' + idCurso + '/' + idVideo);
  videoRef.update({
    video_titulo: titulo,
    video_descricao: descricao
  })
  .then(() => {
    const storageVideoRef = storageRef.child('videoaula/' + idCurso + '/' + idVideo);
    storageVideoRef.delete()
    .then(() => {
      storageVideoRef.put(video)
      .then(() => {
        alert('Vídeo alterado com sucesso!');
      })
      .catch(function(error) {
        alert('Erro ao alterar o vídeo novo! Erro: ' + error);
      })
    })
    .catch(function(error) {
      alert('Erro ao alterar o vídeo! Erro: ' + error);
    })
  })
  .catch(function(error) {
    alert('Erro ao alterar o vídeo! Erro: ' + error);
  })
}

export const deleteVideo = (idCurso,idVideo) => {
  const videoRef = databaseRef.child('videoaula/' + idCurso + '/' + idVideo);
  videoRef.remove()
  .then(() => {
    const storageVideoRef = storageRef.child('videoaula/' + idCurso + '/' + idVideo);
    storageVideoRef.delete()
    .then(() => {
      alert('Video aula excluída com sucesso!');
    })
    .catch(function(error) {
      alert('Erro ao excluir o arquivo do vídeo! Erro: ' + error);
    })
  })
  .catch(function(error) {
    alert('Erro ao excluir o vídeo! Erro: ' + error);
  })
}

export const getVideo = async (idCurso,idVideo) => {
  const videoRef = storageRef.child('videoaula/' + idCurso + '/' + idVideo);
  return new Promise(function(resolve,reject) {
    videoRef.getDownloadURL()
    .then(url => {
      console.log('url',url);
      if(url)
        resolve(url);
      else reject(null)
    })
    .catch(function(error){
      reject(null);
    })
  })
}

export const getVideoAulasCurso = async (idCurso) => {
  var videos;
  return new Promise(function(resolve,reject) {
    const videosRef = databaseRef.child('videoaula/' + idCurso);
    videosRef.once('value', snapshot => {
      videos = snapshot.val();
      if(videos)
          resolve(videos);
      else
          reject(null);
    })
  })
}

export const realizarInscricao = (idCurso,user,data) => {
  const inscRef = databaseRef.child('inscricao/'+idCurso).push();
  inscRef.set({
    insc_cod: inscRef.key,
    insc_user: user,
    insc_data: data
  })
  .then(() => {
    alert('Inscrição realizada com sucesso!');
  })
  .catch(function(error){
    alert("Erro ao realizar inscrição no curso! Erro: " + error);
  })
}

export const isUserInscrito = async (idCurso,idUser) => {
  const inscRef = databaseRef.child('inscricao/' + idCurso).orderByChild('insc_user').equalTo(idUser);
  return new Promise(function(resolve,reject) {
    inscRef.once('value',snapshot => {
      var inscricao = snapshot.val();
      console.log('inscrrr',inscricao);
      if(inscricao)
        resolve(inscricao);
      else reject(null);
    })
    .catch(function(error){
      reject(null);
    })
  })
}

export const visualizarVideo = (idCurso,idVideo,user,data) => {
  const visualizacaoRef = databaseRef.child('visualizacao/'+idCurso + '/' + idVideo).push();
  visualizacaoRef.set({
    visu_cod: visualizacaoRef.key,
    visu_user: user,
    visu_data: data
  })
  .then(() => {
    return;
  })
  .catch(function(error){
    return;
  })

}