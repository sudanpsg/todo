var mongoose =require('mongoose')
var validator = require('validator')
var _ = require('lodash')
var jwt = require('jsonwebtoken')

var userSchema =mongoose.Schema(
 {
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
  })
userSchema.methods.generateAuth= function(){
  var user = this
  var access = "auth"
  var token = jwt.sign({_id:user._id.toHexString(),access},"mysecret").toString()
console.log("first token")
console.log(token)
  //add the token to user.
  user.tokens.push({access,token})
  return user.save().then(()=>{
  //  console.log('inside function asd')
  //  console.log(token)
    return token
  })
}

userSchema.statics.findbyToken = function(token){
  var decode
  var User = this
  console.log('inside statsdasd')
  try{
    console.log(token)
    decode = jwt.verify(token,"mysecret")
    //console.log(decode)
    console.log(token)
  }
  catch(e){
    console.log("something failed ffs")
  }
   return User.findOne({
    _id:decode._id,
    'tokens.access':"auth",
    'tokens.token':token
  })


}
userSchema.methods.toJSON = function(){
  var user =this
  var userObject = user.toObject()
  return _.pick(userObject,['_id','email'])
}
var User =mongoose.model('newuser',userSchema)

module.exports={User}
