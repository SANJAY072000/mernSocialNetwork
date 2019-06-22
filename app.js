// importing all the modules
const express=require('express'),
app=express(),
passport=require('passport'),
mongoose=require('mongoose'),
path=require('path'),
cors=require('cors'),
bodyparser=require('body-parser'),
port=process.env.PORT || 3000;


// fetching the mongourl
const dbstr=require('./setup/mongourl').mongourl;


// connecting to the mongodb
mongoose.connect(dbstr,{useNewUrlParser:true})
        .then(()=>console.log('Mongodb connected successfully'))
        .catch(err=>console.log(err));


// fetching all the routes
const auth=require('./routes/api/auth'),
profile=require('./routes/api/profile');


// configuring middleware for bodyparser
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());


// configuring middleware for cors
app.use(cors());


// configuring middleware for passport
app.use(passport.initialize());


// configuring the jwt strategy
require('./strategies/jsonwtStrategy')(passport);


// configuring all the routes
app.use('/api/auth',auth);
app.use('/api/profile',profile);


// starting the server
app.listen(port,()=>console.log(`Server is running at port ${port}`));












