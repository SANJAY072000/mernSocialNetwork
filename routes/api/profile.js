// importing all the modules
const express=require('express'),
router=express.Router(),
passport=require('passport'),
multer=require('multer'),
path=require('path');


// fetching all the schemas
const Person=require('../../models/Person'),
Profile=require('../../models/Profile');


// configuring multer for disc storage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'client/public/images/upload')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
var upload=multer({storage:storage}).single('pic');


/*
@type - GET
@route - /api/profile/dashboard
@desc - a route to reach the dashboard of the user
@access - PRIVATE
*/
router.get('/dashboard',passport.authenticate('jwt',{session:false}),(req,res)=>{
Profile.findOne({user:req.user._id})
       .then(profile=>{
           if(!profile)
           return res.status(200).json({profilenotfound:'No Profile yet'});
           res.status(200).json(profile);
       })
       .catch(err=>console.log(err));
});


/*
@type - POST
@route - /api/profile/create
@desc - a route to create the profile of the user
@access - PRIVATE
*/
router.post('/create',passport.authenticate('jwt',{session:false}),(req,res)=>{
  const profileValues={};
  profileValues.user=req.user._id;
  if(req.body.company)
  profileValues.company=req.body.company;
  if(req.body.website)
  profileValues.website=req.body.website;
  if(req.body.projects)
  profileValues.projects=`https://github.com/${req.body.projects}`;
  profileValues.username=req.body.username;
  profileValues.domain=req.body.domain;
  profileValues.address=req.body.address;
  profileValues.about=req.body.about;
  profileValues.skills=req.body.skills.split(',');
  Profile.findOne({username:profileValues.username})
         .then(profile=>{
           if(profile)
           return res.status(200).json({usernamealreadyexists:'Username already exists'});
          new Profile(profileValues).save()
          .then(profile=>res.status(200).json(profile))
          .catch(err=>console.log(err));
         })
         .catch(err=>console.log(err));
});


/*
@type - POST
@route - /api/profile/upload
@desc - a route to upload the profile pic of the user
@access - PRIVATE
*/
router.post('/upload',passport.authenticate('jwt',{session:false}),(req,res)=>{
  upload(req,res,err=>{
    if(err)
    throw err;
    Profile.findOne({user:req.user._id})
           .then(profile=>{
             profile.pic=`images/upload/${req.file.filename}`;
             profile.save()
                    .then(profile=>res.status(200).json(profile))
                    .catch(err=>console.log(err));
           })
           .catch(err=>console.log(err));
  });
})


// exporting all the routes
module.exports=router;




























