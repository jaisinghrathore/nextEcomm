import mongoose  from "mongoose";
import bcrypt from 'bcryptjs';

const productSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true,unique:true},
    password: {type:String, required:true},
    isAdmin: {type:String, required:true, default:false},
    },{
        timestamps:true
    }
);


// productSchema.pre("save",async function(next){
//     if(this.isModified("password")) {
//     this.password = await bcrypt.hashSync(this.password,10);
//     }
//     next();
// })

const User = mongoose.models.User || mongoose.model('User',productSchema);
export default User;