var express = require('express');
var bodyParser = require('body-parser');


var {mongoose} = require('./db/mongoose');

var {Todo}=require('./models/todo');
var {User}=require('./models/user');


var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
   var todo =new Todo({
       text:req.body.text
   });

    
    todo.save().then((doc)=>{  
    res.send(doc);
},(e)=>{
    res.status(400).send(e);
});

    
    
});


app.listen(8000,()=>{
   console.log('Started on port 8000'); 
});

//var newTodo = new Todo({
//    text:'Cook dinner'
//});
//
//
//newTodo.save().then((doc)=>{
//    console.log('save todo',doc);
//    
//},(e)=>{
//    console.log('unable to save todo');
//});
// var otherTodo = new Todo({
//     text: ' Feed the cat '
//     //completed:true,
//     //completedAt:123
// })
// otherTodo.save().then((doc)=>{
//    console.log(JSON.stringify(doc,undefined,2));
// },(e)=>{
//    console.log('unable to save todo',e); 
//}); 


module.exports = {app}; 