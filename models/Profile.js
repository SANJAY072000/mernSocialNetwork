// importing all the modules
const mongoose=require('mongoose'),
Schema=mongoose.Schema;


// creating the schema
const profileSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'person'
    }
});


// exporting the schema
module.exports=mongoose.model('profile',profileSchema);


































