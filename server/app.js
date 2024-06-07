const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));

const port = 5000;

app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html');
})

mongoose.connect('mongodb://localhost:27017',{
    useNewUrlParser:true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('mongo is connected');
})

const Schema = mongoose.Schema;

const dataSchema = new Schema({
    name:String,
    email:String,
    subject:String,
    message:String,
});

const Data = mongoose.model('Data',dataSchema);

app.post('/submit',(req,res)=>{
    const {name,email,subject,message} = req.body;
    const newData = new Data({
        name:name,
        email:email,
        subject:subject,
        message,
    });
    newData.save();

    res.redirect('/');
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})