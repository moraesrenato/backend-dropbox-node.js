const multer = require('multer') // importa o módulo Multer
const path = require('path') // importa o path, que tem objetivo em padronizar a escrita do destino dos arquivos
const crypto = require('crypto') // biblioteca para criar conjuntos de caracteres unicos

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp'), //local onde os arquivos seráo salvos / dirname = variavel onde esse arquivo está. '..' = voltar uma pasta no diretório
    storage: multer.diskStorage({ // armazena o arquivo em disco. Pode ser alterado para armazenar na nuvem
        destination: (req, file, cb) => { // aponta o destino que o arquivo será salvo, igual ali em cima
            cb(null, path.resolve(__dirname, '..', '..', 'tmp')) //cb é callback. o primeiro parametro é se houve algum erro, normalmente é null. o outro é o destino que o arquivo será salvo
        },
        filename: (req, file, cb) => { //da uma nome unico para que o arquivo nao seja substituido se houver outro com o mesmo nome
            crypto.randomBytes(16, (err, hash) => { // gerei 16 bytes de caracteres aleatorios
                if (err) {
                    cb(err)
                }

                file.key = `${hash.toString('hex')}-${file.originalname}` // atribui ao nome do arquivo (file.key) uma string hexadecimal de 16 bytes + o nome original
                //fica assim: duww89fhwfns-teste.jpg
                cb(null, file.key) //como nao ouve erro, retorna null e o nome do arquivo criado
            })
        }
    })
}