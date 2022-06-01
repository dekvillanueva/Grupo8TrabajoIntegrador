const express = require('express');
const app = express();
const { engine } = require('express/lib/application');
const path = require('path');
const mainRoutes = require("./routers/main")
const  port = 3000;


// Views
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', mainRoutes);

app.listen(port, () =>{

})