 var {mongoose} = require('./db/mongoose');
 var {Todo} = require('./models/todo')
 var {User} = require('./models/user')
const {ObjectId} = require('mongodb')
 var express =require('express')
 var bodyParser =require('body-parser')
 var app = express()
 var _ =require('lodash')
 app.use(bodyParser.json())

 app.post('/todos',(req,res)=>{
   console.log(req.body)
   var todo = new Todo({
     text:req.body.text
   })
   todo.save().then((doc)=>{
     res.send(doc)
   },(e)=>{
     res.status(400).send(e)
   })
 })

 app.post('/user',(req,res)=>{
   var body =_.pick(req.body,['email','password'])
   var user = new User(body)
   user.save().then((user)=>{
     res.send(user)
   }).catch((e)=>{
     console.log(e)
     res.status(400).send()
   })
 })

app.get('/todos',(req,res)=>{
  Todo.find({text:"Complete the coding for project"}).then((todos)=>{
    res.send({todos,code:'mycode'})
  },(e)=>{
    console.log("error in fetching the values")
    res.status(400).send(e)
  })
})

app.get('/todo/:id',(req,res)=>{
  var id = req.params.id
  console.log("hi guys" + id)
  if(ObjectId.isValid(id))
  {
    Todo.findById(id).then((todo)=>{
    if(!todo)
    return res.status(400).send()
    res.send(todo),(e)=>{
      console.log("failed by ID error")
  }})}
  else
  {
    res.status(404).send()
  }
})


app.delete('/todo/:id',(req,res)=>{
  var id = req.params.id
  Todo.findByIdAndRemove(id).then((todo)=>{
    if(!todo)
    return res.status(404).send()
    //console.log("failed delte todo not present")
    res.send(todo)
  }).catch((e)=>
  {
    res.status(404).send()
    res.send(e)
})
})



app.listen(3000,()=>{
   console.log('server listening at port 3000')
 })
