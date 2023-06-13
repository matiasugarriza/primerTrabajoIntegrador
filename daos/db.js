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
    create(res, Schema, data) {
        Schema.create(data)
            .then(respuesta => {
                res.status(201).send({ msg: 'Documento Creado con Éxito' })
                console.log(respuesta)
            }).catch(err => {
                console.log(err)
            })
    }
    read(res, Schema, params) {
        if (params == undefined) {
            Schema.find().lean()
                .then(respuesta => {
                    let response = respuesta
                    res.status(201).render('index', { response })
                    console.log(response)
                }).catch(err => {
                    console.log(err)
                })
        } else {
            Schema.findById(params).lean()
                .then(respuesta => {
                    let response = [respuesta]
                    if (respuesta !== null) {
                        res.status(201).render('index', { response })
                        console.log(response)
                    } else {
                        let response = "No existe el Documento especificado."
                        res.status(404).send({msg: response})
                    }

                }).catch(err => {
                    console.log(err)
                })
        }

    }
    update(res, Schema, data, params) {
        Schema.updateOne({ _id: params }, { $set: data }).lean()
            .then(update => {
                Schema.findById(params).lean()
                    .then(respuesta => {
                        let response = [respuesta]
                        res.status(201).render('index', { response })
                        console.log(response)
                    }).catch(err => {
                        console.log(err)
                    })
            }).catch(err => {
                console.log(err)
            })
    }
    delete(res, Schema, params) {
        Schema.deleteOne({ _id: params })
            .then(respuesta => {
                res.status(201).send({ msg: 'Documento Eliminado con Éxito' })
                console.log(respuesta)
            }).catch(err => {
                console.log(err)
            })
    }
}

module.exports = ManagerMongo

