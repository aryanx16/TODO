const mongoose = require("mongoose")
// const DATABASE_URL = process.env.DATABASE_URL
const DATABASE_URL ="mongodb+srv://babreab17:J94MWlt8WAUsAZkE@cluster0.alld9.mongodb.net/"
mongoose.connect(DATABASE_URL)

const todoSchema = new mongoose.Schema({
    todo:{type:String,required:true},
    isCompleted:{type:Boolean,default:false},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });
const User = mongoose.model("User",UserSchema)
const Todos = mongoose.model("Todos",todoSchema)

module.exports = {Todos,User}