const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const app = express()

app.use(cors())

const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box)
    })
})

mongoose.connect(
    "mongodb+srv://rbmoraes:rbmoraes@boxjs-wcxyw.mongodb.net/boxjs?retryWrites=true",
    {
        useNewUrlParser: true
    }
);

app.use((req, res, next) => {
    req.io = io

    return next()
})

app.use(express.json()) //ajuda a entender as requisições que vem em formato json
app.use(express.urlencoded({ extended: true })) // permite que envie arquivos nas requesições
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp"))) //toda vez que acessar o diretório Files, ele redireciona os arquivos fisicos da pasta tmp

app.use(require('./routes')) // aponta (importa) o arquivo onde está configurado as rotas

server.listen(process.env.PORT || 3333) // habilita uma porta para sua aplicação rodar