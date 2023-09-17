import mongoose, {Model} from "mongoose";

interface IUser {
    name:string,
    email:string,
    password:string
}

const UserSchema: mongoose.Schema = new mongoose.Schema<IUser, Model<IUser>>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

export default mongoose.model<IUser>("users", UserSchema)