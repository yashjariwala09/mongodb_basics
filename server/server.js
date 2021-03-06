require(./config/config);
const _=require('lodash'); 
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');

var {Todo}=require('./models/todo');
var {User}=require('./models/user');

const port = process.env.PORT;
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


app.get('/todos',(req,res)=>{
   
    Todo.find().then((todos)=>{
        res.send({todos});
        
    },(e)=>{
        res.status(400).send(e);
        
    });
});


app.get('/todos/:id',(req,res)=>{
    var id=req.params.id;
    console.log(id);
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findById(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(404).send();
    })
    
//    Todo.find().then((todos)=>{
//        res.send({todos});
//        
//    },(e)=>{
//        res.status(400).send(e);
//        
//    });
});



app.delete('/todos/:id',(req,res)=>{
   
    var id=req.params.id;
    console.log(id+"hi");
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo)=>{
        if(!todo)
            {
                return res.status(404).send();
            }
            res.send({todo});
    },(err)=>{
     
        console.log("Unable to insert");
        
    }).catch((e)=>{
    res.status(404).send();
    });
});

app.patch('/todos/:id',(req,res)=>{
   var id = req.params.id;
    console.log(id);
   var body=_.pick(req.body,['text','completed']);
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    console.log(body);
    if(_.isBoolean(body.completed)&&body.completed)
        {
            body.completedAt = new Date().getTime();
            console.log(body.completedAt);
        }else{
            body.completed = false;
            body.completedAt = null;
        }
    Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
        if(!todo)
            {
                return res.status(404).send();
            }
//            console.log(todo);
            res.send({todo});
        
    }).catch((e)=>{
       res.status(400).send(); 
    });
});







app.listen(port,()=>{
   console.log(`Started on port ${port}`); 
    
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