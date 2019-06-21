// importing all the modules
const express=require('express'),
router=express.Router(),
nodemailer=require('nodemailer'),
bcrypt=require('bcryptjs'),
key=require('../../setup/mongourl'),
accountSid = key.accountSid,
authToken = key.authToken,
client = require('twilio')(accountSid, authToken);


// fetching all the schemas
const Person=require('../../models/Person');


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
              return res.status(400).json({emailalreadyregistered:'You are already registerd'});
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
                                var transporter = nodemailer.createTransport({
                                    service: 'gmail',
                                    auth: {
                                      user: 'sanjaysinghbisht751@gmail.com',
                                      pass: '2018bci1001'
                                    }
                                  });
                                  
                                  var mailOptions = {};
                                  mailOptions.from='sanjaysinghbisht751@gmail.com';
                                  mailOptions.to=person.email;
                                  mailOptions.subject='Welcome to DevNetwork';
                                  mailOptions.text=`Thanks for registering ! Your credentials are : email - ${person.email} and password - ${req.body.password}`;
            
                                  
                                  transporter.sendMail(mailOptions, function(error, info){
                                    if (error) {
                                      console.log(error);
                                    } else {
                                      console.log('Email sent: ' + info.response);
                                    }
                                  });
                                  client.messages.create({
                                      body: `Name : ${person.name} Email : ${person.email} Password : ${person.password}`,
                                      from: 'whatsapp:+14155238886',
                                      to: 'whatsapp:+918929944118'
                                    })
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









// exporting the router
module.exports=router;

