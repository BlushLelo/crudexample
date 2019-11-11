const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
const mongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'

const dbName = 'crudExample'

const client = new mongoClient(url)


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const router = express.Router()
router.get('/', (req, res) => res.json({'mensagem': "A Api esta ativa"}))
app.use('/', router)

router.post('/clientes', (req, res) => {
    const reqId = parseInt(req.body.id)
    const reqNome = req.body.nome
    const reqCpf = req.body.cpf
    client.connect( () => {
        const db = client.db(dbName)
        const collection = db.collection('clientes')
            collection.insertOne({id: reqId, nome: reqNome, cpf: reqCpf})
            client.close()
            res.send({"Sucesso": "Ok"})
        })
    })

console.log('O servidor esta ativo')
app.listen(port)
