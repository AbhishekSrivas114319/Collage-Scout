var mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        require:true,
        min: 6
    },
    email:{
        type:String,
        require:true,
        lowercase: true,
        unique: true
    },
    password:{
        type:String,
        require:true
    },
    isverified:{
        type:String,
        require:true,
    }

});


module.exports  = mongoose.model('Users',userSchema); //stored in users collection  and uses user schema

