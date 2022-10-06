const User = require("../Models/UserSchema");

// GET USER 
exports.getSingleUser = async(req,res)=>{
       const id = req.params.id;
    try {
    
        const user = await User.findById(id);
        return res.status(200).json({user})

        
    } catch (error) {
        console.log(`error ${error}`)
    }
}


// UPDATE USER 
exports.updateUser = async (req,res) =>{
   const id = req.params.id;
   const {name,address,phone} = req.body;
    try {
     if(!name || !address || !phone){
        return res.status(404).json({error:"all fields require"})
     } 
        const user = await User.findByIdAndUpdate(id,{
            $set:{
                name,
                address,
                phone
            }
        },{
            new:true
        })

        return res.status(202).json({success:"user updated successful",user})
        
    } catch (error) {
        console.log(`error ${error}`)
    }
}

