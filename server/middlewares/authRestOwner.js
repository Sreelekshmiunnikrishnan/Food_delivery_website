import jwt from 'jsonwebtoken';

export const authRestOwner = (req,res,next) =>{
    try {
        const {token} = req.cookies;
        
        if(!token){
            return res.status(401).json({message:'User not authorized'});
       }
    const tokenVerified = jwt.verify(token,process.env.JWT_SECRET_KEY);
       if(!tokenVerified) {
        return res.status(401).json({message:'Unauthorized access'});
       }
   
       if(tokenVerified.role!== 'restaurantOwner'){
        return res.status(401).json({message:'User not authorized'});
       }
       req.user=tokenVerified;

       next();
    } catch (error) {
        return res.status(401).json({message:'user authorization failed'});
    }
}