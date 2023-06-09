const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title: {
        type:String,
        unique:true,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    price: {
        type:Number,
        required:true
    },
    thumbnail: {
        type:String,
        required:true
    },
    code: {
        type:String,
        unique:true,
        required:true
    },
    stock: {
        type:Number,
        required:true
    },
    status: {
        type:Boolean,
        required:true
    },
    category: {
        type:String,
        required:true
    },
})
const Product = mongoose.model('product', ProductSchema)
module.exports = Product