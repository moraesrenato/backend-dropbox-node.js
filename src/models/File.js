const mongoose = require('mongoose') //importa o mongoose para esse arquivo

const File = new mongoose.Schema({ // é uma 'tabela'
    title: {
        type: String, // o título sempre será uma string
        required: true // o título sempre será obrigatório
    },
    path: {
        type: String, // guarda o caminho onde o backend pode achar esse arquivo
        required: true
    }
},
    {
        timestamps: true, // cria data de criação e data de atualização do registro
        toObject: { virtuals: true },
        toJSON: { virtuals: true } //toda vez que ele for convervido para json para exibição, ele aciona o virtual ali em baixo
    }
)

File.virtual('url').get(function () {
    const url = process.env.URL || 'http://localhost:3333'

    return `${url}/files/${encodeURIComponent(this.path)}`
})

module.exports = mongoose.model('File', File) //exporta o model que foi nomeado como Box e passa o schema como parametro