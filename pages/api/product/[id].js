import nc from "next-connect";
import db from "../../../utils/db";
import Product from "../../../models/Product"

const handler = nc();

handler.get(async(req,res)=>{
  const dat = req.query.id;
  await db.connect();
  const products = await Product.findOne({slug:dat});
  await db.disconnect();
  res.json(products)
})


export default handler;