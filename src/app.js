const express = require('express');
const app = express();
const { engine } = require('express/lib/application');
const path = require('path');
const mainRoutes = require("./routers/main")
const productRouter = require("./routers/productRoutes");
const userRouter = require("./routers/userRoutes");
const bodyParser = require('body-parser');
const methodOverride = require('method-override');


const  port = 3000;

//middlewares
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use('/', mainRoutes);
app.use('/', productRouter);
app.use('/', userRouter);


// Views
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");



app.listen(port, () =>{
    console.log(__dirname
        );

})