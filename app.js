/********************************************************************************
* Objetivo: API responsável em criar endPoints referente a estads e cidades 
* Data: 29/08/2022  
* Autor: Marcel
* Versão: 1.0
*
* Obervações: Instalar dependências para criar API
*       express     - npm install express       --save  Instala as deppndêcias para criar uma API
*       cors        - npm install cors          --save  Instala as deppndêcias para configurar as permissões
*       body-parser - npm install bodyparser    --save  Instala as deppndêcias para receber os tipos de dados via POST ou PUT]
*********************************************************************************/

//Import das dependências
const express          = require('express')
const cors             = require('cors')
const bodyParser       = require('body-parser')



const dados            = require('./modulo/funcoes.js')

//Define a porta padrão da API, se for em um servidor de nuvem não tem acesso a porta
            // em execução local podemos definir uma porta livre
const PORT             = process.PORT || 8080

//Instância na classe do express
const app = express()

//Configurações do CORS
app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*') //IP de Origem
    response.header('Access-Control-Allow-Methods', 'GET') //Métodos (Verbos) do protocólo HTTP

    app.use(cors())
    next() //Próximos Endpoints
})

//Resquest --> Recebe os dados da API
//Response --> Envia os dados na API

//EndPoints
app.get('/v1/estados', function(request, response){
    let estados = dados.getAllEstados()

    response.status(estados.statuscode)
    response.json(estados)
})

app.get('/v1/estado/:uf', function(request, response){
    let sigla = request.params.uf

    console.log(sigla)
})

app.get('/v1/regiao/estado/:id', function(request, response){
    let regiaoEstados = request.query.regiao
    let sigla         = request.query.uf
    let id            = request.params.id

    console.log(regiaoEstados)
    console.log(sigla)
    console.log(id)

})

//start da API
app.listen(PORT, function (){
    console.log('API aguardando requisições...')
})

