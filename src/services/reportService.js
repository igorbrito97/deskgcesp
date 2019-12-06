import firebase from "firebaseConfig";
const databaseRef = firebase.database().ref();

export const getTopicosArea = async () => {
    //Nome da area - qntd tópicos - qntd comentários
    const comentárioRef = databaseRef.child('comentario');
    let array = [];
    return new Promise(function (resolve, reject) {
        const areaRef = databaseRef.child('areaforum');
        areaRef.once('value', snapshot1 => {
            let areas = snapshot1.val();
            const topicoRef = databaseRef.child('topico');
            topicoRef.once('value', snapshot2 => {
                let topicos = snapshot2.val();
                Object.keys(areas).forEach(item => {
                    let qntdTops = topicos[item] !== undefined ? Object.keys(topicos[item]).length : 0;
                    array.push({
                        area: areas[item],
                        qntdTopicos: qntdTops,
                        qntdComentarios: 0
                    })
                })
                if (array.length > 0)
                    resolve(array);
                else reject(null);
            })
        })
    });
}

export const getTicketsArea = async () => {
    let array = [];
    return new Promise(function(resolve,reject) {
        const areaRef = databaseRef.child('areaticket');
        areaRef.once('value',snapshot1 => {
            let areas = snapshot1.val();
            let arrayArea = Array(Object.keys(areas).length).fill(0);
            const ticketRef = databaseRef.child('ticket');
            ticketRef.once('value',snapshot2 => {
                let tickets = snapshot2.val();
                Object.keys(tickets).forEach(item1 => {
                    var i = 0;
                    Object.keys(areas).every(item2 => {
                        if(tickets[item1].areaticket_cod === areas[item2].areaticket_cod) {
                            arrayArea[i]++;
                            return false;
                        }
                        i++;
                        return true;
                    })
                })
                var i = 0;
                    Object.keys(areas).forEach(item => {
                        array.push({
                            area: areas[item],
                            qntdTickets: arrayArea[i++]
                        })
                    })
                    if(array.length > 0)
                        resolve(array);
                    else reject(null);
            })
        })
    });
}

export const getDocsEleCapitulo = async () => {
    //capitulo - cidade - documento enviados - documento aprovados
    let result = [];
    return new Promise(function (resolve, reject) {
        const capituloRef = databaseRef.child('capitulo');
        capituloRef.once('value', snapshot1 => {
            let capitulos = snapshot1.val();
            var arrayCap = Array(Object.keys(capitulos).length).fill(0);
            const docRef = databaseRef.child('docEleitoral');
            docRef.once('value', snapshot2 => {
                let documentos = snapshot2.val();
                Object.keys(documentos).forEach(item1 => {
                    var i = 0;
                    Object.keys(capitulos).every(item2 => {
                        if (documentos[item1].capitulo.cap_cod === capitulos[item2].cap_cod) {
                            arrayCap[i]++;
                            return false;
                        }
                        i++;
                        return true;
                    })
                })
                var i = 0;
                Object.keys(capitulos).forEach(item2 => {
                    result.push({
                        capitulo: capitulos[item2],
                        docsEnviados: arrayCap[i++],
                        docsAprovados: 0
                    })
                })
                if (result.length > 0)
                    resolve(result);
                else reject(null)
            })
        })

    });
}

export const getRegsIntCapitulo = async () => {
    //capitulo - cidade - reg enviados - reg aprovado(t/f)
    let result = [];
    return new Promise(function (resolve, reject) {
        const capituloRef = databaseRef.child('capitulo');
        capituloRef.once('value', snapshot1 => {
            let capitulos = snapshot1.val();
            var arrayCap = Array(Object.keys(capitulos).length).fill(0),arrayAprovado = Array(Object.keys(capitulos).length).fill(false);
            const regRef = databaseRef.child('regInterno');
            regRef.once('value', snapshot2 => {
                let regimentos = snapshot2.val();
                Object.keys(regimentos).forEach(item1 => {
                    var i = 0;
                    Object.keys(capitulos).every(item2 => {
                        if (regimentos[item1].capitulo.cap_cod === capitulos[item2].cap_cod) {
                            arrayCap[i]++;
                            arrayAprovado = true;
                            return false;
                        }
                        i++;
                        return true;
                    })
                })
                var i = 0;
                Object.keys(capitulos).forEach(item2 => {
                    result.push({
                        capitulo: capitulos[item2],
                        regEnviados: arrayCap[i],
                        regAprovado: arrayAprovado[i]
                    })
                    i++;
                })
                if (result.length > 0)
                    resolve(result);
                else reject(null)
            })
        })
    });
}

export const getIndicacoes = async () => {
    const indicRef = databaseRef.child('indicacao').orderByChild('indic_nomeIndicado');
    let result = [];
    return new Promise(function(resolve,reject) {
        indicRef.once('value', snapshot => {
            let indicacoes = snapshot.val();
            Object.keys(indicacoes).forEach(item => {
                result.push({
                    nome: indicacoes[item].indic_nomeIndicado,
                    capitulo: indicacoes[item].capitulo,
                    dataEnvio: indicacoes[item].indic_dataEnvio,
                    status: indicacoes[item].indic_status
                });
            })
            if(result.length > 0)
                resolve(result);
            else reject(null);
        })
    })
}

export const getIndicacoesByCap = async (idCap) => {
    console.log('idcap',idCap);
    const indicRef = databaseRef.child('indicacao').orderByChild('capitulo/cap_cod').equalTo(idCap);
    let result = [];
    return new Promise(function(resolve,reject) {
        indicRef.once('value', snapshot => {
            let indicacoes = snapshot.val();
            if(indicacoes) {
                Object.keys(indicacoes).forEach(item => {
                    result.push({
                        nome: indicacoes[item].indic_nomeIndicado,
                        capitulo: indicacoes[item].capitulo,
                        dataEnvio: indicacoes[item].indic_dataEnvio,
                        status: indicacoes[item].indic_status
                    });
                })
            }
            if(result.length > 0)
                resolve(result);
            else reject(null);
        })
    })
}

export const getDownloads = async () => {
    const downloadRef = databaseRef.child('downloads');
    const arqsRef = databaseRef.child('arquivo');
    let result = [];
    return new Promise(function(resolve,reject) {
        arqsRef.once('value', snapshot1 => {
            let arquivos = snapshot1.val();
            downloadRef.once('value', snapshot2 => {
                let downloads = snapshot2.val();
                Object.keys(arquivos).forEach(item => {
                    result.push({
                        nome: arquivos[item].arquivo_nome,
                        downloaded: downloads[item]!== undefined ? Object.keys(downloads[item]).length : 0
                    });
                })
                if(result.length > 0)
                    resolve(result);
                else reject(null);
            })
        })
    })
}

export const getInscritos = async () => {
    const cursoRef = databaseRef.child('curso');
    const inscRef = databaseRef.child('inscricao');
    let result = [];
    return new Promise(function(resolve,reject){
        cursoRef.once('value',snapshot1 => {
            let cursos = snapshot1.val();
            inscRef.once('value',snapshot2 => {
                let inscricoes = snapshot2.val();
                Object.keys(cursos).forEach(item => {
                    result.push({
                        titulo: cursos[item].curso_titulo,
                        status: cursos[item].curso_visivel ? 'Visível' : 'Invisível',
                        inscritos: inscricoes[item]!== undefined ? Object.keys(inscricoes[item]).length : 0
                    })
                })
                if(result.length > 0)
                    resolve(result);
                else reject(null);
            })
        })
    });
}