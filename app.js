
const path = require('path');

const express = require('express');
const uuid = require('uuid');

const restaurantRoutes = require('./routes/restaurants')
const defaultRoutes = require('./routes/default');


const app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs')   //set() allows us to set certain options foir express app

app.use(express.static('public'));//for linking the js and the css files to the server whic can be publically available

app.use(express.urlencoded({extended: false}));

app.use('/',defaultRoutes); //way to outsource the multiple routes here the address of the website which starts with a slash will be routed to the default file and if it not matches then it will find the path in app.js with help of .use
app.use('/',restaurantRoutes);


app.use(function(req,res){ //used for an invalid page requested
    res.status(404).render('404');
});

app.use(function(error, req, res, next){
    res.status(500).render('500');
});

app.listen(3000);
