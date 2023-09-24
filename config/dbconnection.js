const mongoose  = require("mongoose");

module.exports.dbConnection = ()=>
{
    mongoose.connect("mongodb+srv://mohamedtoba:tolba123@cluster0.mljgkle.mongodb.net/noteapp").then(()=>
    {
        console.log("db connected")
    }).catch((error)=>
    {
console.log(error)
    })
}