import nc from "next-connect";
import db from "../../../utils/db";
import Order from "../../../models/Order"
import { isAuth } from '../../../utils/auth';
import { onError } from '../../../utils/error';


const handler = nc({
  onError,
});

handler.use(isAuth);


handler.get(async(req,res)=>{
  await db.connect();
  const order = await Order.find({ user: req.user });
    res.status(201).send(order);
  await db.disconnect();
})


export default handler;