const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    title:String,
    desc:String,
    createdBy:{
        type:mongoose.SchemaTypes.ObjectId ,
        ref:"user"
    }
},{
    timestamps:true
})

const noteModel = mongoose.model("note" , noteSchema);
module.exports= noteModel ;