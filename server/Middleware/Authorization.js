const jwt = require("jsonwebtoken");


const VerifyToken = (req,res,next) =>{
        const authHeader = req.headers.authorization

      try {   
    if(!authHeader){
        return res.status(404).json({error:"header is not available "})
    }
    const Token = authHeader.split(" ")[1];
    console.log(Token)
    if(!Token){
        return res.status(404).json({error:"your are not authorized"})
    }
 
    jwt.verify(Token, process.env.SEC_KEY, function(err, user) {
               if(err){
                return res.status(404).json({error:"your are not authorized"})
               }else{
                req.user = user ;
                next();
               }
      });
      } catch (error) {
        console.log(`error ${error}`)
      }

}


module.exports = VerifyToken ;