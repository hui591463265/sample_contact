const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

//get two API endpoint routes
const items = require('./routes/api/items');
const fileRoutes = require('./routes/api/img-upload');

const app = express();

//Bodyparser Middleware
app.use(bodyParser.json());

//get keys to mongodb from Config 
//const db3 = require('./config/keys').mongoURI3;
//const db2 = require('./config/keys').mongoURI2;
const db3 = process.env.mongoURI3;

//connect to mongodb
mongoose.connect(db3,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>console.log('MongoDB Connected'))
    .catch(err=>console.log(err))

//setup endpoint with routes
app.use('/api/items', items);
app.use('/api/img-upload',fileRoutes);

//serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));
    app.get('*',(req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}
    
//setup server port
const port = process.env.PORT || 5000;
app.listen(port,()=>console.log(`Server started on ${port}`));