const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
  if (err)
  return console.log("unable to conect")
  console.log("connect sucess")
  const col = client.db('todoapp').collection('Todos1')
  col.insert({text:'second text',completed:false},(err,result)=>{
    if (err)
    {
      return console.log("ubnable to inset")
    //  retrun console.log(err)
     }
   console.log(JSON.stringify(result.ops,undefined,2))
  })
  client.close();
})
