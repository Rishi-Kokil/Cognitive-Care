import { Jwt } from "jsonwebtoken";

const adminauthentication = (req , res , next)=>{
    const authorize = req.headers.Authorization;
    if(authorize){
        const token = authorize.split(" ")[1]; // seperating token
        if(token){
            try {
                const admin = Jwt.verify(token , SecretAdminKey);
                req.user = admin;
                next();
            } catch (error) {
                res.status(401).json({message : error.message});
            }
        }
        else{
            res.status(401).json({message : "Unauthorised"});
        }
    }
    else{
        res.status(401).json({message : "Unauthorised"});
    }
}

export default adminauthentication;