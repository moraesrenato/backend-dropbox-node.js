const Box = require('../models/Box')
//const File = require('../models/File')

class BoxController {
    async store(req, res) {
        const criaBox = await Box.create({ title: req.body.title })

        return res.json(criaBox)
    }
    async show(req, res) {
        const box = await Box.findById(req.params.id).populate({ // populate cria uma relação com o Files
            path: 'files', //passa o nome do campo que vc quer passar em uma variavel (path)
            options: { sort: { createdAt: -1 } } // coloca na ordem "criado por ultimo primeiro"
        })

        return res.json(box)
    }
}

module.exports = new BoxController()