const joi = require("joi");
let schema = {
    add: joi.object({
        title:joi.string().required(),
        desc:joi.string().required()
    }),
    update: joi.object({
        _id:joi.string().required().min(24).max(24),
        title:joi.string().required(),
        desc:joi.string().required()
    }),
    delete: joi.object({
        _id:joi.string().required().min(24).max(24),
    }),
    search:joi.object({
        term:joi.string().required()
    })
    

    
}


module.exports.validateNote = (req,res,next)=>{
let errorlist = [];
let key = null ;
let place = null ;
if(req.method == "POST"){
    key = "add"
    place = "body"
}
else if(req.method == "PUT"){
    key = "update"
    place = "body"
}
else if(req.method == "DELETE"){
    key = "delete"
    place = "body"
}
else if (req.method == "GET" && req.path == "/search"){
    key="search" ;
    place = "query";
}

    let {error} = schema[key].validate(req[place] , {abortEarly:false});
    if(!error){
        next();
    }
    else{
      error.details.map((error)=>{
       errorlist.push(error.message);
      })
      res.json({message:"Validation Error" , errorlist})
    }

}

