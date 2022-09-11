const express = require('express');
const session = require('express-session');
const app = express();
const { engine } = require('express/lib/application');
const path = require('path');
const mainRoutes = require("./routers/main")
const productRouter = require("./routers/productRoutes");
const userRouter = require("./routers/userRoutes");
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const { urlencoded } = require('express');
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");
const cookies = require('cookie-parser');


const  port = 3000;

//middlewares
app.use(express.static(path.join(__dirname, '../public')));
app.use(session({secret: "Esto es un secreto",
                 resave: false,
                 saveUninitialized: true}));
app.use(cookies());
app.use(urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(userLoggedMiddleware);

// Views
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

//Routes
app.use('/', mainRoutes);
app.use('/', productRouter);
app.use('/', userRouter);



app.listen(port, () =>{
    console.log("Server run on port 3000");

})