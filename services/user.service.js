const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
module.exports.signup = async(req,res)=>
{
    const {name,email,age,password} = req.body ;
  
    try{
      const user =   await userModel.findOne({email});
      if(user){
        res.json({message:"email is already exist"})
      }
      else
      {
        bcrypt.hash(password,4,async(err,hash)=>
        {
            if(!err)
            {
                try{
          
                    const result =  await userModel.insertMany({name,email,age,password:hash})
                      res.json({message:"success" , result})
                  }
                  catch(error){
                      console.log(error.message);
                      res.json({message:"failed", errorMsg: error.message} )
                  }
            }
            else
            {
                onsole.log(err);
                res.json({message:"failed", errorMsg:err} )
            }
        })
      
          
      }
    }catch(error){
        console.log(error.message);
        res.json({message:"failed",errorMsg:error.message})
    }



  
}

module.exports.signin = async(req,res)=>{
console.log(req.path);
     const {email,password} = req.body ;
     try{
   
       const user =  await userModel.findOne({email});
       if(user){
        const match =  await bcrypt.compare(password,user.password)
        if(match){
        const token =  await jwt.sign({ userId : user._id, userName:user.name , userEmail:user.email } , "muhamed")
            res.json({message:"success" , token})
        }
        else
        {
            res.json({message:"incorrect password"})
        }

       }else{
        res.json({message:"email dosn,t exist"})
       }

     }catch(error){
        console.log(error.message);
        res.json({message:"failed" , errorMsg:error.message})
     }


}