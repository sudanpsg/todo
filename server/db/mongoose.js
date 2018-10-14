var mongoose = require('mongoose')
mongoose.connect('mongodb://hari1:tiger@todocluster-shard-00-00-8fwlc.mongodb.net:27017,todocluster-shard-00-01-8fwlc.mongodb.net:27017,todocluster-shard-00-02-8fwlc.mongodb.net:27017/todoDb?ssl=true&replicaSet=todocluster-shard-0&authSource=admin&retryWrites=true').then(()=>console.log("connected"),(e)=>console.log("failed connection"));
module.exports={
  mongoose
};
