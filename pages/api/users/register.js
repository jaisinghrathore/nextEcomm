import nc from "next-connect";
import db from '../../../utils/db';
import User from '../../../models/User';
import {signToken} from "../../../utils/auth.js"
import bcrypt from 'bcryptjs';

const handler = nc();

handler.post(async(req,res)=>{
    await db.connect();
    const user = await User.findOne({email : req.body.email});

    if(user){
        res.status(401).send({message:'User Already Exist!!!'});
    }else{
        const newUser = new User({
            name:req.body.name,
            email:req.body.email,
            password:bcrypt.hashSync(req.body.password,10),
            isAdmin:false
        });
        // bcrypt.hashSync(this.password,10);

        const user = await newUser.save();
        await db.disconnect();

    const token = signToken(req.body);
        res.send({
            token,
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        });
    }
})


export default handler;