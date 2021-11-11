import nc from "next-connect";
import db from '../../../utils/db';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import {signToken , isAuth} from "../../../utils/auth.js"

const handler = nc();

handler.use(isAuth);

handler.put(async(req,res)=>{
    await db.connect();
    const user = await User.findById(req.user._id);
    user.name=req.body.name;
    user.email=req.body.email;
    user.password=req.body.password?bcrypt.hashSync(req.body.password):user.password;
    user.save()
    await db.disconnect();
    if(user.password){
        const token = signToken(user);
        res.send({
            token,
            _id: user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        });
    }else{
        res.status(401).send({message:'Invalid email or password'});
    }
})


export default handler;