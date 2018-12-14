var mongoose = require('mongoose');
//var mongodb =require('mongodb');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27018/TodoApp');