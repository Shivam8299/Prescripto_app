import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default: 'https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    address:{
        type:Object,
        default:{
            line1:'',
            line:''
        }
    },
    gender:{
        type:String,
        default:"not selected",
    },
    phone:{
        type:String,
        default: '9634532312'
    }

})

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel