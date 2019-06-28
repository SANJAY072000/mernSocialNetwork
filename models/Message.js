// importing all the modules
const mongoose=require('mongoose'),
Schema=mongoose.Schema;


// creating the schema
const messageSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'person'
    },
    sent:[{
        user:{
            type:Schema.Types.ObjectId,//recipients' profile _id
            ref:'profile'
        },
        username:{
            type:String, //senders' username
            required:true
        },
        text:{
            type:String,//sent message
            required:true
        },
        date:{
            type:Date,
            default:Date.now
        }
    }],
    received:[{
        user:{
            type:Schema.Types.ObjectId,//senders' profile _id
            ref:'profile'
        },
        username:{
            type:String,//senders' username
            required:true
        },
        text:{
            type:String,//received message
            required:true
        },
        date:{
            type:Date,
            default:Date.now
        }
    }],
    date:{
        type:Date,
        default:Date.now
    }
});


// exporting the schema
module.exports=mongoose.model('message',messageSchema);











