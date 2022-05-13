const express = require('express');
const app = express();
const  port = 3000;
const path = require('path');

// Views
const views = path.join(__dirname, 'views/');

// Public
const public = path.join(__dirname, 'public/');

// HTTP routes
const httpRaiz = '/';
const httpHome ='/home';

// HTML
const homeHtml = 'home.html';

// Define the static file path
app.use(express.static(__dirname + '/public/'));

app.get(httpRaiz, (req, res) => {
    res.sendFile(path.join(views, homeHtml))
})

app.get(httpHome, (req,res) =>{
    res.sendFile(path.join(views, homeHtml))
})

app.listen(port, () =>{

})