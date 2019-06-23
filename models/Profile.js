// importing all the modules
const mongoose=require('mongoose'),
Schema=mongoose.Schema;


// creating the schema
const profileSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'person'
    },
    username:{
        type:String,
        required:true
    },
    domain:{
        type:String,
        default:'None'
    },
    company:{
        type:String
    },
    website:{
        type:String
    },
    address:{
        type:String,
        required:true
    },
    skills:{
        type:[String],
        required:true
    },
    projects:{
        type:String
    },
    about:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default:'images/upload/man.png'
    },
    experience:[
        {
            company:{
                type:String
            },
            jobTitle:{
                type:String
            },
            location:{
                type:String
            },
            desc:{
                type:String
            },
            from:{
                type:String
            },
            to:{
                type:String
            },
            isWorking:{
                type:Boolean,
                default:false
            }
        }
    ],
    education:[
        {
            institution:{
                type:String
            },
            degree:{
                type:String
            },
            branch:{
                type:String
            },
            desc:{
                type:String
            },
            from:{
                type:String
            },
            to:{
                type:String
            },
            isWorking:{
                type:Boolean,
                default:false
            }
        }
    ],
    date:{
        type:Date,
        default:Date.now
    }
});


// exporting the schema
module.exports=mongoose.model('profile',profileSchema);


































