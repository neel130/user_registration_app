const User = require("../Models/UserSchema");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
 

// SIGNUP 
exports.signupUser = async (req,res)=>{
  const {name,email,password} = req.body;
    try {
        if(!name || !email || !password){
            return res.status(404).json({error:"require all fields"})
        }

        const savedUser = await User.findOne({email})
        if(savedUser){
            return res.status(404).json({error:"email already registered"})
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = await User.create({
            name,
            email,
            password:hashedPassword
        })

        return res.status(200).json({success:"user creation successful",user:newUser})
        
    } catch (error) {
        console.log("error"+ error)
    }
}




// // LOGIN 
 exports.loginUser = async(req,res) => {
    const {email,password} = req.body;
    try {
        if(!email || !password){
            return res.status(404).json({error:"require all fields"})    
        }

        const savedUser =await User.findOne({email})
        if(!savedUser){
            return res.status(400).json({error:"no user found"});
        }

        const comparePassword = bcrypt.compareSync(password, savedUser.password);
        if(comparePassword){
            const jwtToken = jwt.sign({id:savedUser._id},process.env.SEC_KEY,{
                expiresIn:"7d"
            })
            return res.status(200).json({success:"user login successful",user:savedUser,jwtToken})
        }
        else{
            return res.status(400).json({error:"Incorrect password"}); 
        }
        
    } catch (error) {
        console.log("error "+ error)
    }
 }