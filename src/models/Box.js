const mongoose = require('mongoose') //importa o mongoose para esse arquivo

const tabelaBox = new mongoose.Schema({ // é uma 'tabela'
    title: {
        type: String, // o título sempre será uma string
        required: true // o título sempre será obrigatório
    },
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }] // vai armazenar os ids que pertencem à essa box
}, {
        timestamps: true // cria data de criação e data de atualização do registro
    }
)

module.exports = mongoose.model('Box', tabelaBox) //exporta o model que foi nomeado como Box e passa o schema como parametro