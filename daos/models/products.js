const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title: {
        type:String,
        unique:true,
        require:true
    },
    description: {
        type:String,
        require:true
    },
    price: {
        type:Number,
        require:true
    },
    thumbnail: {
        type:String,
        require:true
    },
    code: {
        type:String,
        unique:true,
        require:true
    },
    stock: {
        type:Number,
        require:true
    },
    status: {
        type:Boolean,
        require:true
    },
    category: {
        type:String,
        require:true
    },
})
const Product = mongoose.model('product', ProductSchema)
module.exports = Product