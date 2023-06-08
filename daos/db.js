const mongoose = require('mongoose')

class ManagerMongo {
    connect() {
        return mongoose.connect('mongodb+srv://matiasugarriza:Cr%402ym1nd@cluster0.ljqyibw.mongodb.net/ecommerce?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true })
            .then(connection => {
                this.connection = connection
                console.log('Conexión a db exitosa')
            })
            .catch(err => console.log(err))
    }
    create() {

    }
    read(res,Schema) {
        Schema.find()
            .then(respuesta => {
                res.status(201).send({
                    msg: 'Documento Encontrado',
                    data: respuesta
                })
            }).catch(err => {
                console.log(err)
            })
           
    }
    update() {

    }
    delete() {

    }
}

module.exports = ManagerMongo

