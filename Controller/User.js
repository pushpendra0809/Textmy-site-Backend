import UserModal from "../Modal/UserSchema.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
const User = {

      registration: async (req,res) =>{
        try {
            const {firstname, lastname, email, password} = req.body;

            const existingUser = await UserModal.findOne({ email: email });
            if (existingUser) {
              return res.status(400).send({"status":"failed", "message":"User already registered with this email."});
            }else{
                if(firstname && lastname && email && password ){
                    

                    const hashPassword = await bcrypt.hash(req.body.password, 10) 
                    const doc = new UserModal({
                        firstname:firstname,
                        lastname:lastname,
                        email:email,
                        password:hashPassword,
                    })
                    const result = await doc.save();
        
                    const save_user = await UserModal.findOne({email:email})
                    const token = jwt.sign({userID : save_user._Id}, process.env.JWT_SECRET_KEY, {expiresIn:"5d"})
        
                   return res.status(201).send({"status":"success", "message":"Registration Success","token":token});
                    
                }else{
                    return res.status(400).send({"status":"failed", "message":"All field are required."});
                }
            }

           
        } catch (error) {
            return res.status(500).send({
                status: "failed",
                message: "An error occurred during registration.",
                error: error.message,
              });
        }
     },


      login: async (req,res) =>{
        try {
           const { email, password} = req.body;
           if(email && password){

           const result =await UserModal.findOne({email:email})
           if (result != null ){
            const isMatch = await bcrypt.compare(password, result.password)
            if(result.email == email && isMatch){

                const token = jwt.sign({userID: result._id}, process.env.JWT_SECRET_KEY,{expiresIn:"5d"})
               res.send({"status":"success", "message":"Login Success", "token":token ,  "user": {
                firstname: result.firstname,
                lastname: result.lastname,
                email: result.email,
                Userrole: result.Userrole,
                password: result.password
              }})
            }else{
             res.send({"status":"failed", "message":"Email and Password is not Valid"})
            }
           }else{
            res.send({"status":"failed", "message":"You are not a Registered User"})
           }
        }else{
            return res.status(400).send({"status":"failed", "message":"All Field are Required."});
        }
               
        } catch (error) {
            return res.status(500).send({
                status: "failed",
                message: "An error occurred during loging.",
                error: error.message,
              });
        }
     }

}

export default User