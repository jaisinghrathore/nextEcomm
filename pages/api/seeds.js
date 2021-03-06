import nc from "next-connect";
import db from '../../utils/db';
import Product from "../../models/Product"
import User from "../../models/User"
import {data} from "../../utils/data"


const handler = nc();

handler.get(async(req,res)=>{
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Product.deleteMany();
  const Addedproducts = await Product.insertMany(data.products)
  await db.disconnect();
  res.send('successfully added',JSON.stringify(Addedproducts))
})


export default handler;