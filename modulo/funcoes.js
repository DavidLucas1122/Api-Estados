/***************************************************************************************
 * Objetivo: Arquivo responsável pelas funções para criar a API de estados e cidades
 * Data: 15/09/2025
 * Autor: Marcel
 * Versão 1.0
 ***************************************************************************************/

//Import do arquivo estados e cidades
const dados = require('./estados_cidades.js')
const MESSAGE_ERROR = {status: false, statuscode: 500, development: 'David Lucas dos Santos'}


//Retorne a lista de estados
const getAllEstados = function(){
    //Padrão do JSON que será o retorno da função
    let message = {status: true, statuscode: 200, development: 'David Lucas dos Santos', uf: []}

    dados.listaDeEstados.estados.forEach(function(item){
        message.uf.push(item.sigla)
    })
    //Adiciona um novo elemento no JSON
    message.quantidade = message.uf.length

    //Apaga um elemento existente no JSON
    //delete message.status

    if(message.uf.length > 0)
        return message //Redultado Verdadeiro da API 200
    else
        return MESSAGE_ERROR //Resultado Falso da API 500
}



//Retorna dados do estado filtrando pela sigla
const getEstadosBySigla = function (sigla){
    let message = {status: true, statuscode: 200, development: 'David Lucas dos Santos', uf: '', descricao: '', capital: '', regiao: ''}

    const estado = dados.listaDeEstados.estados.find(function(item){
        return item.sigla === sigla.toUpperCase()
    })

    if(estado){
        message.uf = estado.sigla
        message.descricao = estado.nome
        message.capital = estado.capital
        message.regiao = estado.regiao

        return message
    }
    else {
        return MESSAGE_ERROR
    }
}

// console.log(getEstadosBySigla("SP"))



//Retorna a capital do estado filtrando pela sigla
const getCapitalBySigla = function (sigla){
    let message = {status: true, statuscode: 200, development: 'David Lucas dos Santos', uf: '', descricao: '', capital: ''}

    const estado = dados.listaDeEstados.estados.find(function(item){
        return item.sigla === sigla.toUpperCase()
    })

    if(estado){
        message.uf = estado.sigla
        message.descricao = estado.nome
        message.capital = estado.capital
    
        return message
    }
    else {
        return MESSAGE_ERROR
    }
}

//Retorna a lista de estados filtrando pela região
const getEstadosByRegiao = function (regiao){
    let message = {status: true, statuscode: 200, development: 'David Lucas dos Santos', regiao: regiao, estados: []}

    const estadoRegiao = dados.listaDeEstados.estados.filter(function(item){
        return item.regiao === regiao
    })

    if(estadoRegiao.length > 0){
        estadoRegiao.forEach(function(estado){
            message.estados.push({uf: estado.sigla, descricao: estado.nome})
        })
        return message
    }
    else {
        return MESSAGE_ERROR
    }
}




//Retorna a lista de estados que formam a capital de um país filtrando pelo país
const getEstadoIsCapitalByCountry = function (pais) {
    let message = {status: true, statuscode: 200, development: 'David Lucas dos Santos', capitais: []
    }

    if (pais === dados.listaDeEstados.pais) {
        for (let i = 0; i < dados.listaDeEstados.estados.length; i++) {
            const estado = dados.listaDeEstados.estados[i]

            if (estado.capital_pais) {
                let capitalInfo = {
                    uf: estado.sigla,
                    descricao: estado.nome,
                    capital: estado.capital,
                    regiao: estado.regiao,
                    capital_pais_ano_inicio: estado.capital_pais.ano_inicio,
                    capital_pais_ano_termino: estado.capital_pais.ano_fim,
                    capital_atual: estado.capital_pais.capital
                };

                message.capitais.push(capitalInfo)
            }
        }
    } else {
        return MESSAGE_ERROR
    }

    return message
}

// console.log(getEstadoIsCapitalByCountry('Brasil'))



//Retorna as cidades existentes em um estado, filtrando pela sigla
const getCidadesBySigla = function (sigla){

    let message = {status: true, statuscode: 200, development: 'David Lucas dos Santos', uf: '', descricao: '', quantidade_cidades: '', cidades: []}

    const cidades = dados.listaDeEstados.estados.find(function(item){
        return item.sigla === sigla.toUpperCase()
    })

    if(cidades){
        message.uf = cidades.sigla
        message.descricao = cidades.nome
        message.cidades = cidades.cidades.map(cidades => cidades.nome)
        message.quantidade_cidades = message.cidades.length
    
        return message
    }
    else {
        return MESSAGE_ERROR
    }
}
// console.log(getCidadesBySigla("SP"))

module.exports = {
    getAllEstados,
    getEstadosBySigla,
    getCapitalBySigla,
    getEstadosByRegiao,
    getEstadoIsCapitalByCountry,
    getCidadesBySigla
}