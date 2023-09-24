const joi = require("joi");

let schema = {
    signup:joi.object({
            name:joi.string().required().min(3).max(10),
            email:joi.string().required().email(),
            age:joi.number().required().min(16).max(80),
            password:joi.string().required().min(6).max(50),
            rePassword:joi.string().required().valid(joi.ref("password"))
        }) ,
    signin:joi.object({
  
            email:joi.string().required().email(),
            password:joi.string().required().min(6).max(50),
         
        }) 
}


module.exports.validateuser = (req,res,next)=>{
    let errorList = [] ;
    let key = null ;
    if(req.path == "/signup"){
     key ="signup"
    }
    else{
        key = "signin"
    }
   
       let {error} =  schema[key].validate(req.body,{abortEarly:false});
       if(!error){
        next();
       }
       else{
        error.details.map((error)=>{
            errorList.push(error.message)
        })
      
        res.json({message:"Validation Error" , errorList})
       }
    
    } 
