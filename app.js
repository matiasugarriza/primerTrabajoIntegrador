const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const routesProducts = require('./routes/products')
const routesCarts = require('./routes/carts')
const routesChat = require('./routes/chat')
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)
const PORT = 8080 || process.env.PORT
const ProductManager = require("./daos/ProductManager")
const ManagerMongo = require('./daos/db')

app.use(express.json())
app.use(express.urlencoded())

app.use(express.static(__dirname+'/public'))


app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname+'/views')

let messages = []
io.on('connection', (socket)=>{
    console.log('User conectado')
    socket.emit('wellcome', 'Usuario conectado con servidor')
    let manager = new ProductManager("./products.json")
    const products = manager.getProducts()
    products.then(product => {
        let response = JSON.parse(product)
        socket.emit('realTimeProducts', response)
    }).catch(err => {
        console.log(err)
    })
    socket.on('newProduct', (data)=>{
        let manager = new ProductManager("./products.json")
        productRes = manager.addProduct(data.title, data.description, data.price, data.thumbnail, data.code, data.stock, data.status, data.category)
        productRes.then(() => {
            let manager = new ProductManager("./products.json")
            const products = manager.getProducts()
            products.then(product => {
                let response = JSON.parse(product)
                socket.emit('realTimeProducts', response)
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            console.log(err)
        })
    })
    socket.on('newMessage', (data)=>{
        messages.push(data)
        io.sockets.emit('allMessages', messages)
    })
 })

 

app.use('/products', routesProducts)
app.use('/carts', routesCarts)
app.use('/chat', routesChat)


server.listen(PORT, () => {
    console.log('Server is running on port', PORT)
    let connect = new ManagerMongo()
    connect.connect()
})