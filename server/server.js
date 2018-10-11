 var {mongoose} = require('./db/mongoose');
 var {Todo} = require('./models/todo')
 var {user} = require('./models/user')

 var express =require('express')
 var bodyParser =require('body-parser')
 var app = express()
 app.use(bodyParser.json())

 app.post('/todos',(req,res)=>{
   console.log(req.body)
 })

 app.listen(3000,()=>{
   console.log('server listening at port 3000')
 })
