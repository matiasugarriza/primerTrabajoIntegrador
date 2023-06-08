const express = require('express')
const { Router } = express
const router = new Router()
const ProductManager = require("../daos/ProductManager")
const ProductSchema = require('../daos/models/products')
const ManagerMongo = require('../daos/db')

let Schema = ProductSchema
let managerMongo = new ManagerMongo

router.get('/', async (req, res) => {
    await managerMongo.read(res,Schema)
    res.render('index', { respuesta })
    //Manager FileSystem
/*     let manager = new ProductManager("./products.json")
    const products = manager.getProducts()
    products.then(product => {
        let response = JSON.parse(product)
        res.render('index', { response })
    }).catch(err => {
        console.log(err)
    }) */
    //Manager Mongodb
/*     ProductSchema.find()
        .then(product => {
            res.status(201).send({
                msg: 'Producto Guardado',
                data: product
            })
        }).catch(err => {
            console.log(err)
        }) */
    

    
})

router.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts', {})
})

router.get('/:id', (req, res) => {
    //Manager FileSystem
    let manager = new ProductManager("./products.json")
    let id = req.params.id
    let productRes = manager.getProductById(id)
    productRes.then(product => {
        let response = product
        res.send({ menssage: "Productos", data: response })
    }).catch(err => {
        console.log(err)
    })
})

router.post('/', (req, res) => {
    //Manager FileSystem
    let manager = new ProductManager("./products.json")
    productRes = manager.addProduct(req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.code, req.body.stock, req.body.status, req.body.category)
    productRes.then(() => {
        res.redirect('/products')
    }).catch(err => {
        console.log(err)
    })
    //Manager Mongodb
    let newProduct = req.body
    let product = new ProductSchema(newProduct)
    product.save()
        .then(product => {
            res.status(201).send({
                msg: 'Producto Guardado',
                data: product
            })
        }).catch(err => {
            console.log(err)
        })
})

router.delete('/:id', (req, res) => {
    //Manager FileSystem
    let manager = new ProductManager("./products.json")
    let productRes = manager.deleteProduct(req.params.id)
    productRes.then(product => {
        let response = product
        res.send({ data: response })
    }).catch(err => {
        console.log(err)
    })
})

router.put('/:id', (req, res) => {
    //Manager FileSystem
    let manager = new ProductManager("./products.json")
    let productRes = manager.updateProduct(req.params.id, req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.code, req.body.stock, req.body.status, req.body.category)
    productRes.then(product => {
        let response = product
        res.send({ data: response, message: 'Producto Actualizado' })
    }).catch(err => {
        console.log(err)
    })
})

module.exports = router