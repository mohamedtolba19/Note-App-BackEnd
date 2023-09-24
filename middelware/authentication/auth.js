const jwt = require("jsonwebtoken")
module.exports.auth = (req,res,next)=>{
    const token = req.header("token");
    jwt.verify(token,"muhamed" , (err,decoded)=>{
        if(!err){
            req.createdBy = decoded.userId ;
            next();
        }
        else
        {
            res.json(err)
        }

    })
}