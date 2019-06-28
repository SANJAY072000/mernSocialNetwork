// importing all the modules
const express=require('express'),
router=express.Router(),
passport=require('passport');


// fetching all the schemas
const Person=require('../../models/Person'),
Post=require('../../models/Post'),
Profile=require('../../models/Profile'),
Message=require('../../models/Message');


/*
@type - POST
@route - /api/message/send-:prfid
@desc - a route to send message
@access - PRIVATE
*/
router.post('/send-:prfid',passport.authenticate('jwt',{session:false}),
(req,res)=>{
    Profile.findOne({_id:req.params.prfid})
           .then(prfrp=>{
               Message.findOne({user:prfrp.user})
                      .then(msgrp=>{
                          if(!msgrp){
                              Message.findOne({user:req.user._id})
                                     .then(msgsd=>{
                                     if(!msgsd){
                                     const msgsdValues={},msgrpValues={},sent={},received={};
                                     msgsdValues.sent=[];
                                     msgsdValues.received=[];
                                     msgrpValues.sent=[];
                                     msgrpValues.received=[];
                                     msgsdValues.user=req.user._id;
                                     sent.user=req.params.prfid;
                                     Profile.findOne({user:req.user._id})
                                            .then(prfsd=>{
                                            sent.username=prfsd.username;
                                            sent.text=req.body.text;
                                            msgsdValues.sent.unshift(sent);
                                            new Message(msgsdValues).save()
                                            .then(msgsd=>{
                                            msgrpValues.user=prfrp.user;
                                            received.user=prfsd._id;
                                            received.username=prfsd.username;
                                            received.text=req.body.text;
                                            msgrpValues.received.unshift(received);
                                            new Message(msgrpValues).save()
                                            .then(msgrp=>res.status(200).json(msgrp))
                                            .catch(err=>console.log(err));
                                            })
                                            .catch(err=>console.log(err));
                                            })
                                            .catch(err=>console.log(err));
                                         }
else{
    const sent={},received={},msgrpValues={};
    msgrpValues.received=[];
    msgrpValues.sent=[];
    msgrpValues.user=prfrp.user
    Profile.findOne({user:req.user._id})
           .then(prfsd=>{
               sent.user=req.params.prfid;
               sent.username=prfsd.username;
               sent.text=req.body.text;
               msgsd.sent.unshift(sent);
               msgsd.save()
                    .then(msgsd=>{
                    received.user=prfsd._id;
                    received.username=prfsd.username;
                    received.text=req.body.text;
                    msgrpValues.received.unshift(received);
                    new Message(msgrpValues).save()
                    .then(msgrp=>res.status(200).json(msgrp))
                    .catch(err=>console.log(err));
                    })
                    .catch(err=>console.log(err));
           })
           .catch(err=>console.log(err));
}
                                     })
                                     .catch(err=>console.log(err));
                          }
else{
Message.findOne({user:req.user._id})
       .then(msgsd=>{
           if(!msgsd){
               const sent={},received={},msgsdValues={};
               msgsdValues.sent=[];
               msgsdValues.received=[];
               msgsdValues.user=req.user._id;
               Profile.findOne({user:req.user._id})
                      .then(prfsd=>{
                          sent.user=req.params.prfid;
                          sent.username=prfsd.username;
                          sent.text=req.body.text;
                          msgsdValues.sent.unshift(sent);
                          new Message(msgsdValues).save()
                          .then(msgsd=>{
                              received.user=prfsd._id;
                              received.username=prfsd.username;
                              received.text=req.body.text;
                              msgrp.received.unshift(received);
                              msgrp.save()
                              .then(msgrp=>res.status(200).json(msgrp))
                              .catch(err=>console.log(err));
                          })
                          .catch(err=>console.log(err));
                      })
                      .catch(err=>console.log(err));
           }
else{
    const sent={},received={};
    Profile.findOne({user:req.user._id})
           .then(prfsd=>{
               sent.user=req.params.prfid;
               sent.username=prfsd.username;
               sent.text=req.body.text;
               msgsd.sent.unshift(sent);
               msgsd.save()
               .then(msgsd=>{
                received.user=prfsd._id;
                received.username=prfsd.username;
                received.text=req.body.text;
                msgrp.received.unshift(received);
                msgrp.save()
                .then(msgrp=>res.status(200).json(msgrp))
                .catch(err=>console.log(err));
               })
               .catch(err=>console.log(err));
           })
           .catch(err=>console.log(err));
}
       })
       .catch(err=>console.log(err));
}
                      })
                      .catch(err=>console.log(err));
           })
           .catch(err=>console.log(err));
});


/*
@type - GET
@route - /api/message/get-:prfid
@desc - a route to get message profile of a user
@access - PRIVATE
*/
router.get('/get-:prfid',passport.authenticate('jwt',{session:false}),(req,res)=>{
Profile.findOne({_id:req.params.prfid})
       .then(profile=>{
       Message.findOne({user:profile.user})
              .then(message=>{
                  if(!message)
                  return res.status(200).json({nomessageprofile:'Message profile not found'});
                  res.status(200).json(message);
              })
              .catch(err=>console.log(err));
       })
       .catch(err=>console.log(err));
});


/*
@type - GET
@route - /api/message/all
@desc - a route to get message profiles of all the users
@access - PUBLIC
*/
router.get('/all',(req,res)=>{
Message.find()
       .populate('user',['name'])
       .then(message=>res.status(200).json(message))
       .catch(err=>console.log(err));
});


/*
@type - DELETE
@route - /api/message/del-:msgid
@desc - a route to delete message of a user
@access - PRIVATE
*/
router.delete('/del-:msgid',passport.authenticate('jwt',{session:false}),(req,res)=>{
Message.findOne({user:req.user._id})
       .then(message=>{
           const i=message.sent.findIndex(a=>a._id.toString()===req.params.msgid.toString());
           message.sent.splice(i,1);
           message.save()
           .then(message=>res.status(200).json(message))
           .catch(err=>console.log(err));
        })
       .catch(err=>console.log(err));
});








// exporting all the routes
module.exports=router;
