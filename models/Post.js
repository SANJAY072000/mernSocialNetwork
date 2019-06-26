//importing all the modules
const mongoose=require('mongoose'),
Schema=mongoose.Schema;


//creating the schema
const postSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'person'
    },
    posts:[{
        user:{
            type:Schema.Types.ObjectId,//senders' profile _id
            ref:'profile'
        },
        pic:{
            type:String,//senders' profile pic
            default:'images/upload/man.png'
        },
        username:{
            type:String//senders' username
        },
        text:{
            type:String
        },
        likes:[{
            user:{
                type:Schema.Types.ObjectId,
                ref:'person'
            }
        }],
        dislikes:[{
            user:{
                type:Schema.Types.ObjectId,
                ref:'person'
            }
        }],
        comments:[{
            user:{
                type:Schema.Types.ObjectId,
                ref:'person'
            },
            username:{
                type:String
            },
            text:{
                type:String
            }
        }]
    }],
    date:{
        type:Date,
        default:Date.now
    }
});


//exporting the schema
module.exports=mongoose.model('post',postSchema);







