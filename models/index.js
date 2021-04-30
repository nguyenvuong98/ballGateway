const fs = require('fs'),
    path = require('path'),
    mongoose = require('mongoose'),
    db = {};

mongoose.connect("mongodb+srv://vuongnv:Vuong0123@cluster0.jg7iq.mongodb.net/vuongnv?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });


// import all file in this dir, except index.js
fs.readdirSync(__dirname)
.filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
})
.forEach(function(file) {
    let model = require(path.join(__dirname, file));
    db[model.modelName] = model;
});

db.mongoose = mongoose;
module.exports = db;