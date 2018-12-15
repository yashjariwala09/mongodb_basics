const expect = require('expect');
const request = require('supertest');
const {ObjectID}= require('mongodb');
const {app} =require('./../server');
const {Todo} =require('./../models/todo');
const todos = [{
    _id:new ObjectID(),
    text:"First test todo"
},
{
    _id:new ObjectID(),
    text:"Second test todo"    
}];
beforeEach((done)=>{
   Todo.remove({}).then(()=>{
       Todo.insertMany(todos);
   }).then(()=>{done()});
});
describe('POST /todos',()=>{
   it('should create a new todo',(done)=>{
       var text = 'Test todo text';
   
   request(app)
       .post('/todos')
       .send({text})
       .expect(200)
       .expect((res)=>{
       expect(res.body.text).toBe(text);
       
       })
       .end((err,res)=>{
       if(err){
           return done(err);
       }
       Todo.find({text}).then((todos)=>{
           expect(todos.length).toBe(1);
           expect(todos[0].text).toBe(text);
           done();
       }).catch((e)=>done(e));
   })
   });

    
    
    // should only create avlid todo
    
    it("should not create a invalid todo with invalid todo data",(done)=>{
       
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
                Todo.find().then((todos)=>{
                expect(todos.length).toBe(2);
//                expect(todos[0].text).toBe(text);
                done();
                }).catch((e)=>done(e));
        });
        
    });
    
});


describe('GET /todos',()=>{
    it('should get all todos',(done)=>{
       request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
        expect(res.body.todos.length).toBe(2);
    })
    .end(done);
    });
});




describe('Get/todos/:id',()=>{
   it("should return todo doc",(done)=>{
     console.log(todos[0]._id.toHexString());
       request(app)
       .get(`/todos/${todos[0]._id.toHexString()}`)
       .expect(200)
       .expect((res)=>{
         expect(res.body.todo.text).toBe(todos[0].text);
     })
       .end(done);
   });
});