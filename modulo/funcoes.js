/***************************************************************************************
 * Objetivo: Arquivo responsável pelas funções para criar a API de estados e cidades
 * Data: 15/09/2025
 * Autor: Marcel
 * Versão 1.0
 ***************************************************************************************/

//Import do arquivo estados e cidades
const dados = require('./estados_cidades.js')
const MESSAGE_ERROR = {status: false, statuscode: 500, development: 'David Lucas dos Santoss'}


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
    let message = {status: true, statuscode: 200, development: 'David Lucas dos Santos', uf: [], nome: [], capital: [], regiao: []}

    const estado = dados.listaDeEstados.estados.find(function(item){
        return item.sigla === sigla
    })

    if(estado){
        return estado
    }
    else {
        return MESSAGE_ERROR
    }
}
console.log(getEstadosBySigla())

//Retorna a capital do estado filtrando pela sigla
const getCapitalBySigla = function (sigla){

}

//Retorna a lista de estados filtrando pela região
const getEstadosByRegiao = function (regiao){

}

//Retorna a lista de estados que formam a capital de um país filtrando pelo país
const getEstadoIsCapitalByCountry = function (pais){

}

//Retorna as cidades existentes em um estado, filtrando pela sigla
const getCidadesBySigla = function (sigla){

}

module.exports = {
    getAllEstados
}