// importing all the modules
const express=require('express'),
router=express.Router(),
passport=require('passport'),
multer=require('multer'),
path=require('path'),
key=require('../../setup/mongourl');


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


/*
@type - POST
@route - /api/profile/edit
@desc - a route to edit the profile of the user
@access - PRIVATE
*/
router.post('/edit',passport.authenticate('jwt',{session:false}),(req,res)=>{
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
           Profile.findOneAndUpdate({user:req.user._id},{$set:profileValues},{new:true})
         .then(profile=>res.status(200)
         .json({profileupdated:'Profile Successfully Updated'}))
         .catch(err=>console.log(err));
         });
});


/*
@type - POST
@route - /api/profile/updatepic
@desc - a route to update the profile pic of the user
@access - PRIVATE
*/
router.post('/updatepic',passport.authenticate('jwt',{session:false}),(req,res)=>{
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


/*
@type - POST
@route - /api/profile/addexp
@desc - a route to add experience of the user
@access - PRIVATE
*/
router.post('/addexp',passport.authenticate('jwt',{session:false}),(req,res)=>{
  const experience={};
  if(req.body.company)
  experience.company=req.body.company;
  if(req.body.jobTitle)
  experience.jobTitle=req.body.jobTitle;
  if(req.body.location)
  experience.location=req.body.location;
  if(req.body.desc)
  experience.desc=req.body.desc;
  if(req.body.from)
  experience.from=req.body.from;
  if(req.body.to)
  experience.to=req.body.to;
  if(req.body.isWorking)
  experience.isWorking=req.body.isWorking;
  Profile.findOne({user:req.user._id})
         .then(profile=>{
           profile.experience.unshift(experience);
           profile.save()
                  .then(profile=>res.status(200).json(profile))
                  .catch(err=>console.log(err));
         })
         .catch(err=>console.log(err));
});


/*
@type - POST
@route - /api/profile/addedu
@desc - a route to add education of the user
@access - PRIVATE
*/
router.post('/addedu',passport.authenticate('jwt',{session:false}),(req,res)=>{
  const education={};
  if(req.body.institution)
  education.institution=req.body.institution;
  if(req.body.degree)
  education.degree=req.body.degree;
  if(req.body.branch)
  education.branch=req.body.branch;
  if(req.body.desc)
  education.desc=req.body.desc;
  if(req.body.from)
  education.from=req.body.from;
  if(req.body.to)
  education.to=req.body.to;
  if(req.body.isWorking)
  education.isWorking=req.body.isWorking;
  Profile.findOne({user:req.user._id})
         .then(profile=>{
           profile.education.unshift(education);
           profile.save()
                  .then(profile=>res.status(200).json(profile))
                  .catch(err=>console.log(err));
         })
         .catch(err=>console.log(err));
});


/*
@type - GET
@route - /api/profile/del-:expeduid
@desc - a route to get the experience or education to be deleted on client
@access - PRIVATE
*/
router.get('/del-:expeduid',passport.authenticate('jwt',{session:false}),
(req,res)=>{
Profile.findOne({user:req.user._id})
.then(profile=>{
if(profile.experience.filter(a=>a._id.toString()===req.params.expeduid.toString()).length){
const i=profile.experience.findIndex(a=>a._id.toString()===req.params.expeduid.toString());
          res.status(200).json({title:'Experience',
        exp:profile.experience[i]});
        }
        else if(profile.education
          .filter(a=>a._id.toString()===req.params.expeduid.toString()).length){
          const i=profile.education
          .findIndex(a=>a._id.toString()===req.params.expeduid.toString());
          res.status(200).json({title:'Education',
          edu:profile.education[i]});
        }
       })
       .catch(err=>console.log(err));
});


/*
@type - DELETE
@route - /api/profile/delexp-:expid
@desc - a route to delete the experience on client
@access - PRIVATE
*/
router.delete('/delexp-:expid',passport.authenticate('jwt',{session:false}),
(req,res)=>{
  Profile.findOne({user:req.user._id})
         .then(profile=>{
          const i=profile.experience.findIndex(a=>a._id.toString()===req.params.expid.toString());
          profile.experience.splice(i,1);
          profile.save()
                 .then(profile=>res.status(200).json({expdel:'Experience Deleted'}))
                 .catch(err=>console.log(err));
         })
         .catch(err=>console.log(err));
});


/*
@type - DELETE
@route - /api/profile/deledu-:eduid
@desc - a route to delete the education on client
@access - PRIVATE
*/
router.delete('/deledu-:eduid',passport.authenticate('jwt',{session:false}),
(req,res)=>{
  Profile.findOne({user:req.user._id})
         .then(profile=>{
          const i=profile.education.findIndex(a=>a._id.toString()===req.params.eduid.toString());
          profile.education.splice(i,1);
          profile.save()
                 .then(profile=>res.status(200).json({edudel:'Education Deleted'}))
                 .catch(err=>console.log(err));
         })
         .catch(err=>console.log(err));
});


/*
@type - GET
@route - /api/profile/all
@desc - a route to get profiles of all the users
@access - PUBLIC
*/
router.get('/all',(req,res)=>{
  Profile.find()
         .populate('user',['name'])
         .then(profile=>res.status(200).json(profile))
         .catch(err=>console.log(err));
});


/*
@type - GET
@route - /api/profile/usf-:username
@desc - a route to get the profile of the user through username
@access - PUBLIC
*/
router.get('/usf-:username',(req,res)=>{
  Profile.findOne({username:req.params.username})
         .populate('user',['name'])
         .then(profile=>{
           if(!profile)
           return res.status(200).json({profileofusername:'Profile not found'});
           res.status(200).json(profile);
         })
         .catch(err=>console.log(err));
});






// exporting all the routes
module.exports=router;




























