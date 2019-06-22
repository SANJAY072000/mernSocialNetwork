// importing all the modules
const express=require('express'),
router=express.Router(),
passport=require('passport');


// fetching all the schemas
const Person=require('../../models/Person'),
Profile=require('../../models/Profile');


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
  new Profile(profileValues).save()
                            .then(profile=>res.status(200).json(profile))
                            .catch(err=>console.log(err));
});






// exporting all the routes
module.exports=router;




























