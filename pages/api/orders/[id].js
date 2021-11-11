import nc from "next-connect";
import db from "../../../utils/db";
import Order from "../../../models/Order"
import { isAuth } from '../../../utils/auth';
import jwt from 'jsonwebtoken';

const handler = nc();


handler.get(async(req,res)=>{
  const dat = req.query.id;
  await db.connect();
  const order = await Order.findOne({_id:dat});
  const {authorization} = req.headers;
  // 617cecabd478ad4e54796d3a
  if(authorization){
    const token = authorization.slice(7,authorization.length)
    jwt.verify(token,process.env.JWT_SECRET,(err,decod)=>{
      if(err){
        res.status(401).send({message:"Token is not valid"})
      }
      if(order.user==decod._id){
        res.status(201).send(order);
      }else{
        res.status(401).send({message:"Token is not valid"})
      };
    });
}else{
    res.status(401).send({message:"Token is not supplied"})
}

await db.disconnect();

})


export default handler;