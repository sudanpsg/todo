var mongoose =require('mongoose')
var validator = require('validator')

var userSchema = {
  email:{
    type:String,
    required:true,
    trim:true,
    minlength:1,
    unqiue:true,
    validate:{
      validator:validator.isEmail,
      message:"not a valid email"
    }
  },
  password:{
    type:String,
    required:true,
    minlength:6
  },
  tokens:[{
    access:{
      type:String,
      required:true
    },
    token:{
      type:String,
      required:true
    }}]
    }

var User =mongoose.model('newuser',userSchema)

module.exports={User}
