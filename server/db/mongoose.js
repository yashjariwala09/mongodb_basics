var mongoose = require('mongoose');
//var mongodb =require('mongodb');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27018/TodoApp');