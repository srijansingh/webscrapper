const mongoose = require('mongoose');



const amazonSchema = new mongoose.Schema({
    id : {
        type: String
    },
    title: {
        type: String
    },
    category: {
        type: String
    },
    brand: {
        type: String
    },      
    // mrp:{
    //     type:String,
    //     default:null
    // },
    price:{ 
        type: String,
        default:'Price unavailable'
    },
    rating: {
        type: String,
        default:'Rating unavailable'
    },
    // count: {
    //     type: String,
    //     default: null
    // },
    description:{
        type: String,
        default:'Description unavailable'
    },
    allimage:{
        type: String
    },
    image:{
        type:String
    },
    link:{
        type: String
    },
    status:{
        type: String,
        default:'inactive'
    }
},{
    timestamps : true
})

const Amazon = mongoose.model('checkingagain', amazonSchema);
module.exports = Amazon;