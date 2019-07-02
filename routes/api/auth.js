// importing all the modules
const express=require('express'),
router=express.Router(),
nodemailer=require('nodemailer'),
passport=require('passport'),
bcrypt=require('bcryptjs'),
key=require('../../setup/mongourl'),
jsonwt=require('jsonwebtoken'),
accountSid = key.accountSid,
authToken = key.authToken,
client = require('twilio')(accountSid, authToken);


// fetching all the schemas
const Person=require('../../models/Person'),
Profile=require('../../models/Profile'),
Post=require('../../models/Post'),
Message=require('../../models/Message');



/*
@type - POST
@route - /api/auth/register
@desc - a route to register the user
@access - PUBLIC
*/
router.post('/register',(req,res)=>{
    Person.findOne({email:req.body.email})
          .then(person=>{
              if(person)
              return res.status(200).json({emailalreadyregistered:'You are already registered'});
              const newPerson=new Person({
                  name:req.body.name,
                  email:req.body.email,
                  password:req.body.password
              });
              bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newPerson.password, salt, function(err, hash) {
                    if(err)throw err;
                    newPerson.password=hash;
                    newPerson.save()
                             .then(person=>{
                               
  .then(message => console.log(message.sid))
  .catch(err=>console.log(err));
                                return res.status(200).json(person);
                             })
                             .catch(err=>console.log(err));
                });
            });
          })
          .catch(err=>console.log(err));
});


/*
@type - POST
@route - /api/auth/login
@desc - a route to login the user
@access - PUBLIC
*/
router.post('/login',(req,res)=>{
  const email=req.body.email,
        password=req.body.password;
        Person.findOne({email})
              .then(person=>{
                if(!person)
                return res.status(200).json({emaildoesnotmatch:'You are not registered'});
                bcrypt.compare(password,person.password)
                      .then(isCorrect=>{
                        if(isCorrect)
                        {
                          const payload={
                            id:person._id,
                            name:person.name,
                            email:person.email,
                            password:person.password,
                          };
                          jsonwt.sign(payload,key.secret,{expiresIn:3600},
                            (err,token)=>{
                              if(err)
                              throw err;
                              return res.status(200).json({success:true,
                              token:`Bearer ${token}`});
                            })
                        }
                        else
                        res.status(200).json({passworddoesnotmatch:'Sorry! You entered wrong password'});
                      })
                      .catch(err=>console.log(err));
              })
              .catch(err=>console.log(err));
});


/*
@type - POST
@route - /api/auth/chglogin
@desc - a route to change login credentials of the user
@access - PRIVATE
*/
router.post('/chglogin',passport.authenticate('jwt',{session:false}),(req,res)=>{
  const name=req.body.name,email=req.body.email,password=req.body.password,
  loginValues={name,email,password};
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(loginValues.password, salt, function(err, hash) {
        if(err)throw err;
        loginValues.password=hash;
        Person.findOneAndUpdate({_id:req.user._id},{$set:loginValues},{new:true})
        .then(person=>{
          res.status(200).json(person);
        })
        .catch(err=>console.log(err));
    });
  });
});


/*
@type - DELETE
@route - /api/auth/del
@desc - a route to change login credentials of the user
@access - PRIVATE
*/
router.delete('/del',passport.authenticate('jwt',{session:false}),(req,res)=>{
Message.findOneAndRemove({user:req.user._id})
       .then(()=>{
         Post.findOneAndRemove({user:req.user._id})
             .then(()=>{
               Profile.findOneAndRemove({user:req.user._id})
                      .then(()=>{
                        Person.findOneAndRemove({_id:req.user._id})
                              .then(()=>res.status(200).json({deleted:'Account deleted successfully'}))
                              .catch(err=>console.log(err));
                      })
                      .catch(err=>console.log(err));
             })
             .catch(err=>console.log(err));
       })
       .catch(err=>console.log(err));
});



// exporting the router
module.exports=router;

