import firebase from "firebaseConfig";
const databaseRef = firebase.database().ref();

// TOPICOS
export const getTopicosArea = async () => {
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
                        qntdTopicos: qntdTops
                    })
                })
                if (array.length > 0)
                    resolve(array);
                else reject(null);
            })
        })
    });
}

export const getTopicosAreaByName = async (nome) => {
    let result = [];
    const areaRef = databaseRef.child('areaforum').orderByChild('areaforum_nome').startAt(nome).endAt(nome+'\uf8ff');
    return new Promise(function(resolve,reject){
        areaRef.once('value',snapshot1 => { 
            let areas = snapshot1.val();
            Object.keys(areas).forEach(item => {
                let topRef = databaseRef.child('topico/'+areas[item].areaforum_cod);
                topRef.once('value', snapshot2 => {
                    let topicos = snapshot2.val();
                    console.log('topsss',topicos)
                    result.push({
                        area: areas[item],
                        qntdTopicos: topicos === null ? 0 : Object.keys(topicos).length
                    })
                })
            })
            console.log('resut',result.length);
            if(result.length > 0)
                resolve(result);
            else reject(null);
        })
    })
    //quando passa pelo if ele ta com 0, depois ele faz o codigo de cima mas ai ja retornou
}

//TICKETS
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

//DOC ELEITORAL
export const getDocsEle = async () => {
    //capitulo - cidade - data - status
    let result = [];
    return new Promise(function (resolve, reject) {
        const docRef = databaseRef.child('docEleitoral');
        docRef.once('value', snapshot => {
            let documentos = snapshot.val();
            Object.keys(documentos).forEach(item => {
                result.push({
                    capitulo: documentos[item].capitulo,
                    data: documentos[item].doc_dataEnvio,
                    status: documentos[item].doc_status
                })
            })
            if (result.length > 0)
                resolve(result);
            else reject(null)
        })
    });
}

export const getDocEleByCap = async (idCap) => {
    console.log('ele',idCap);
    let result = [];
    return new Promise(function(resolve,reject){
        const docRef = databaseRef.child('docEleitoral').orderByChild('capitulo/cap_cod').equalTo(idCap);
        docRef.once('value', snapshot => {
            let documentos = snapshot.val();
            console.log('ele2',documentos);
            Object.keys(documentos).forEach(item => {
                result.push({
                    capitulo: documentos[item].capitulo,
                    data: documentos[item].doc_dataEnvio,
                    status: documentos[item].doc_status
                })
            })

            console.log('ele333',result);
            if (result.length > 0)
                resolve(result);
            else reject(null)
        })
    });
}

export const getDocEleByStatus = async (status) => {
    let result = [];
    return new Promise(function(resolve,reject){
        const docRef = databaseRef.child('docEleitoral').orderByChild('doc_status').equalTo(status);
        docRef.once('value', snapshot => {
            let documentos = snapshot.val();
            Object.keys(documentos).forEach(item => {
                result.push({
                    capitulo: documentos[item].capitulo,
                    data: documentos[item].doc_dataEnvio,
                    status: documentos[item].doc_status
                })
            })
            if (result.length > 0)
                resolve(result);
            else reject(null)
        })
    });
}

//REG INTERNO
export const getRegsInt = async () => {
    //capitulo - cidade - reg enviados - reg aprovado(t/f)
    let result = [];
    return new Promise(function (resolve, reject) {
        const regRef = databaseRef.child('regInterno');
        regRef.once('value', snapshot => {
            let regimentos = snapshot.val();
            Object.keys(regimentos).forEach(item => {
                result.push({
                    capitulo: regimentos[item].capitulo,
                    data: regimentos[item].reg_dataEnvio,
                    status: regimentos[item].reg_status
                })
            })
            if (result.length > 0)
                resolve(result);
            else reject(null)
        })
    });
}

export const getRegIntByCap = async (idCap) => {
    let result = [];
    return new Promise(function (resolve, reject) {
        const regRef = databaseRef.child('regInterno').orderByChild('capitulo/cap_cod').equalTo(idCap);
        regRef.once('value', snapshot => {
            let regimentos = snapshot.val();
            Object.keys(regimentos).forEach(item => {
                result.push({
                    capitulo: regimentos[item].capitulo,
                    data: regimentos[item].reg_dataEnvio,
                    status: regimentos[item].reg_status
                })
            })
            if (result.length > 0)
                resolve(result);
            else reject(null)
        })
    });
}

export const getRegIntByStatus = async (status) => {
    let result = [];
    return new Promise(function (resolve, reject) {
        const regRef = databaseRef.child('regInterno').orderByChild('reg_status').equalTo(status);
        regRef.once('value', snapshot => {
            let regimentos = snapshot.val();
            Object.keys(regimentos).forEach(item => {
                result.push({
                    capitulo: regimentos[item].capitulo,
                    data: regimentos[item].reg_dataEnvio,
                    status: regimentos[item].reg_status
                })
            })
            if (result.length > 0)
                resolve(result);
            else reject(null)
        })
    });
}

//CHEVALIER
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

//ARQUIVOS
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

//CURSOS
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