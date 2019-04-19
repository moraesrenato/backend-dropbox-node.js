const express = require('express')
const routes = express.Router()    // com isso a parte de rotas está separada do módulo principal
const multer = require('multer')
const multerConfig = require('./config/Multer')


const BoxController = require('./controllers/BoxController')
const FileController = require('./controllers/FileController')

routes.post('/boxes', BoxController.store)

routes.get('/boxes/:id', BoxController.show)

routes.post('/boxes/:id/file', multer(multerConfig).single('file'), FileController.store)

module.exports = routes  // com isso ele pode exportar alguma informação do arquivo.