//load environment variables
require('dotenv').config();

//grab our dependencies
const express = require('express');
app = express();
port = process.env.PORT || 8080;
expressLayouts = require('express-ejs-layouts');
mongoose = require('mongoose');
bodyParser = require('body-parser');
session = require('express-session');
cookieParser = require('cookie-parser');
flash = require('connect-flash');
expressValidator = require ('express-validator');


//configure our application===================================================
//set session and cookie parser
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET,
    cookie: { maxAge: 60000 }, //express session documentation and no of seconds until the cookie expires //session gng into the cookie
    resave: false,             //forces the session to be saved backed to the store//nothing in the session needs to be changed
    saveUninitialized: false   //dont save unmodified sessions//nothing in the session needs to change//A session is uninitialized when it is new but not modified
}));
app.use(flash());


//tell express where to look for static assets(CSS file in public)
app.use(express.static(__dirname + '/public'));

//set ejs as our templating engine
app.set('view engine','ejs');
app.use(expressLayouts);

//connect to our database
mongoose.connect(process.env.DB_URI);//it automatically loaded in process.env

//use body parser to grab info from a form
app.use(bodyParser.urlencoded({ extended: true }));//default setup for bodyparser
app.use(expressValidator());//if error occurs

mongoose.connection.on('connected',()=>{
    console.log("MongoDB Connected");
});

mongoose.connection.on('Error',()=>{
    console.log("MongoDB Not Connected");
});


//set the routes============================================================
app.use(require('./app/routes'));


//start our server===========================================================
app.listen(port,()=>{
    console.log(`Server started on port:${port}`)
});