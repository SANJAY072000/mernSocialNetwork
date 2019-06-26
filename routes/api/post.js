// importing all the modules
const express=require('express'),
router=express.Router(),
passport=require('passport');


// fetching all the schemas
const Person=require('../../models/Person'),
Profile=require('../../models/Profile'),
Post=require('../../models/Post');


/*
@type - POST
@route - /api/post/send-:prfid
@desc - a route to send posts
@access - PRIVATE
*/
router.post('/send-:prfid',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({_id:req.params.prfid})
           .then(profile=>{
               Post.findOne({user:profile.user})
                   .then(post=>{
                       if(post){
                           const posts={};
                           posts.user=req.user._id;
                           Profile.findOne({user:req.user._id})
                                  .then(prf=>{
                                  posts.pic=prf.pic;
                                  posts.username=prf.username;
                                  posts.text=req.body.text;
                                  post.posts.unshift(posts);
                                  post.save()
                                      .then(post=>res.status(200).json(post))
                                      .catch(err=>console.log(err));
                                  })
                                  .catch(err=>console.log(err));
                       }
                       else{
                           const profileValues={},posts={};
                           Profile.findOne({_id:req.params.prfid})
                                  .then(profile=>{
                                    profileValues.user=profile.user;
                                    posts.user=req.user._id;
                                    Profile.findOne({user:req.user._id})
                                           .then(prf=>{
                                posts.pic=prf.pic;
                                posts.username=prf.username;
                                posts.text=req.body.text;
                                profileValues.posts=[];
                                profileValues.posts.unshift(posts);
                                new Post(profileValues).save()
                                                       .then(post=>res.status(200).json(post))
                                                       .catch(err=>console.log(err));
                                           })
                                           .catch(err=>console.log(err));

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
@route - /api/post/get-:prfid
@desc - a route to get posts from a user's timeline
@access - PRIVATE
*/
router.get('/get-:prfid',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({_id:req.params.prfid})
           .then(profile=>{
               Post.findOne({user:profile.user})
                   .then(post=>{
                    if(!post)   
                    return res.status(200).json({postsnotfound:'Posts not found'});
                    res.status(200).json(post);
                })
                   .catch(err=>console.log(err));
           })
           .catch(err=>console.log(err));
});


/*
@type - GET
@route - /api/post/all
@desc - a route to get posts of all the users
@access - PUBLIC
*/
router.get('/all',(req,res)=>{
    Post.find()
        .populate('user',['name'])
        .then(post=>{
            if(!post)return res.status(200).json({postsnotfound:'No Posts yet'});
            res.status(200).json(post);
        })
        .catch(err=>console.log(err));
});


/*
@type - GET
@route - /api/post/like/:prfid-:pstid
@desc - a route to like posts on a user's timeline
@access - PRIVATE
*/
router.get('/like/:prfid-:pstid',passport.authenticate('jwt',{session:false}),(req,res)=>{
Profile.findOne({_id:req.params.prfid})
       .then(profile=>{
       Post.findOne({user:profile.user})
           .then(post=>{
           const i=post.posts.findIndex(a=>a._id.toString()===req.params.pstid.toString());
           if(!(post.posts[i].likes.filter(a=>a.user.toString()===req.user._id.toString()).length))
           post.posts[i].likes.unshift({user:req.user._id});
           else return res.status(200).json({alreadyliked:'Cannot like again'});
           post.save()
               .then(post=>res.status(200).json(post))
               .catch(err=>console.log(err));
               })
               .catch(err=>console.log(err));
       })
       .catch(err=>console.log(err));
});


/*
@type - GET
@route - /api/post/dislike/:prfid-:pstid
@desc - a route to dislike posts on a user's timeline
@access - PRIVATE
*/
router.get('/dislike/:prfid-:pstid',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({_id:req.params.prfid})
           .then(profile=>{
           Post.findOne({user:profile.user})
               .then(post=>{
               const i=post.posts.findIndex(a=>a._id.toString()===req.params.pstid.toString());
               if(!(post.posts[i].dislikes.filter(a=>a.user.toString()===req.user._id.toString()).length))
               post.posts[i].dislikes.unshift({user:req.user._id});
               else return res.status(200).json({alreadydisliked:'Cannot dislike again'});
               post.save()
                   .then(post=>res.status(200).json(post))
                   .catch(err=>console.log(err));
                   })
                   .catch(err=>console.log(err));
           })
           .catch(err=>console.log(err));
    });


/*
@type - POST
@route - /api/post/comment/:prfid-:pstid
@desc - a route to comment on posts on a user's timeline
@access - PRIVATE
*/
router.post('/comment/:prfid-:pstid',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({_id:req.params.prfid})
           .then(profile=>{
               Post.findOne({user:profile.user})
                   .then(post=>{
                   const i=post.posts.findIndex(a=>a._id.toString()===req.params.pstid.toString());
                   const comments={};
                   Profile.findOne({user:req.user._id})
                          .then(profile=>{
                              comments.user=req.user._id;
                              comments.username=profile.username;
                              comments.text=req.body.text;
                              post.posts[i].comments.unshift(comments);
                              post.save()
                                  .then(post=>res.status(200).json(post))
                                  .catch(err=>console.log(err));
                          })
                          .catch(err=>console.log(err));
                   })
                   .catch(err=>console.log(err));
           })
           .catch(err=>console.log(err));
});


/*
@type - DELETE
@route - /api/post/delcomment/:prfid-:pstid-:cmtid
@desc - a route to delete comments on posts on a user's timeline
@access - PRIVATE
*/
router.delete('/delcomment/:prfid-:pstid-:cmtid',passport.authenticate('jwt',{session:false}),
(req,res)=>{
Profile.findOne({_id:req.params.prfid})
       .then(profile=>{
           Post.findOne({user:profile.user})
           .then(post=>{
    const i=post.posts.findIndex(a=>a._id.toString()===req.params.pstid.toString());
    const j=post.posts[i].comments.findIndex(a=>a._id.toString()===req.params.cmtid.toString());
           if(post.posts[i].comments[j].user.toString()===req.user._id.toString()){
           post.posts[i].comments.splice(j,1);
           post.save()
               .then(post=>res.status(200).json(post))
               .catch(err=>console.log(err));
           }
           else res.status(200).json({commentcantdelete:'Comment cannot be deleted'});
               })
               .catch(err=>console.log(err));
       })
       .catch(err=>console.log(err));
});


/*
@type - DELETE
@route - /api/post/delpost-:pstid
@desc - a route to delete posts from a user's timeline
@access - PRIVATE
*/
// router.delete('/delpost-:pstid',passport.authenticate('jwt',{session:false}),(req,res)=>{
//     Post.findOne({user:req.user._id})
//         .then(post=>{
//             if(!)
//         })
//         .catch(err=>console.log(err));
// });




// exporting all the routes
module.exports=router;














