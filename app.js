//The app.js is the entry point of my application and will be used to launch the server at port 8080.
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose'); //Defines schemas for  data collections
const animal = require('./routers/animalrouter');
const app = express();

app.use(bodyParser.json()); // To get a nicely formatted body when a POST or PUT HTTP request is received
app.use(bodyParser.urlencoded({extended: false}));
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');
app.use("/", express.static(path.join(__dirname, 'dist/animalAng')));
const MongoClient = require('mongodb').MongoClient;
// replace with string 
const uri = "mongodb+srv://Jessie:Jessica11@cluster0.ix71u.gcp.mongodb.net/animals?retryWrites=true&w=majority"
MongoClient.connect(uri,{useUnifiedTopology: true} , function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Atlas Connected...');
   const collection = client.db("animals").collection("animals");
   // perform actions on the collection object
   client.close();
});

//CRUD OPERATION
//GET:  This method is used to retrieve the existing data from the database.
//POST: This method is used to write new data into the database
//PUT:  This method is used to update existing data in the database
//DELETE: This method is used to remove an existing row or document from the database.
//Pet RESTFul endpoionts 
app.get('/animal', animal.getAll);
app.get('/filter', animal.getByFilter);
app.post('/add', animal.createOne);
app.get('/:id', animal.getOne);
app.post('/:id/update', animal.updateOne);
app.delete('/:id', animal.deleteOne);

app.listen(8080, () => {
    console.log("App listening on port 8080");
});
