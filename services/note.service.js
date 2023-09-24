const noteModel = require("../models/note.model");
const jwt = require("jsonwebtoken")

module.exports.addNote = async(req,res)=>{

    const {title,desc} = req.body ;
    const {createdBy} = req ;
    try{
     
      const note =  await noteModel.insertMany({title,desc,createdBy});
            res.json({message:"success" , note})
        
     
    }
    catch(error){
        console.log(error.message);
        res.json({message:"failed" , errorMsg:error.message})
    }

}



module.exports.userNotes = async(req,res)=>
{
    const {createdBy} = req
    try{
  let notes =   await noteModel.find({createdBy});
  res.json({message:"success" , notes})
    }
    catch(error){
        console.log(error.message);
        res.json({message:"failed" , errorMsg:error.message})
    }
}

module.exports.updateNote = async(req,res)=>{
    const {_id , title , desc} = req.body ;

    try{
        const note = await noteModel.findOne({_id});
        if(note){
            const updateInfo = await noteModel.updateOne({title,desc});
             res.json({message:"success" , updateInfo})
        }  
        else{
            res.json({message:"No Note for this ID"})   
        }
       
    }
    catch(error){
        console.log(error.message);
        res.json({message:"failed" , errorMsg:error.message})
    }

}
module.exports.deleteNote = async(req,res)=>{
    const {_id } = req.body ;

    try{
        const note = await noteModel.findOne({_id});
        if(note){
           const deleteInfo =  await noteModel.deleteOne({_id});
            res.json({message:"success" , deleteInfo})
        }
        else{
            res.json({message:"No Note for this ID"})
        }
       
       
    }
    catch(error){
        console.log(error.message);
        res.json({message:"failed" , errorMsg:error.message})
    }

}

module.exports.searchNote = async(req,res)=>{
   const term = req.query["term"];
   try{
     const notes = await  noteModel.find({ title: { $regex: term, $options: 'i' } });
     if(notes.length>0){
        res.json({message:"success" , notes})
     }
     else{
        res.json({message:"No data founded " }) 
     }
    
   } catch(error){
    console.log(error.message);
    res.json({message:"failed" , errorMsg:error.message})
}
}