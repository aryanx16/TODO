const express = require("express")
const bodyparser = require("body-parser")
require('dotenv').config();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { Todos } = require("./db")
const { User } = require("./db")
const cors = require("cors")
const app = express()
const JWT_SECRET = process.env.JWT_SECRET
const corsOptions = {
    origin: '*',  // Your frontend origin
    methods: ['GET', 'POST', 'OPTIONS'],  // Allow OPTIONS method
    credentials: true,  // Allow cookies and authentication headers
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allow specific headers
  };
  
  app.use(cors(corsOptions));
  
  // Handle preflight requests (OPTIONS)
  app.options('*', cors(corsOptions));
app.use(express.json())


const authMiddleware =(req, res, next) => {
    if (req.method === "OPTIONS") {
        return next(); // Skip auth for OPTIONS requests
    }
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from header
    // console.log(token)
    if (!token) {
      return res.status(401).json({ message: 'You are not logged in!' });
    }
  
    try {
      const decoded = jwt.verify(token,JWT_SECRET ); // Verify the token
    //   console.log(decoded)
      req.user = decoded; // Attach user info to the request object
      next(); // Move to the next middleware/route handler
    } catch (err) {
      res.status(401).json({ message: 'Please Login again!' });
    }
  };
app.get("/",(req,res)=>{
    // console.log("server is runninggggggggggggg....")
    res.send("server is runningggggggggggggggggxxxxxxxxxxx.................. ")
})
app.get("/gett",(req,res)=>{
    // console.log("getttin.....")
    res.send("getttin.....")
})
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    // console.log(username)
    // console.log(password)
    const already = await User.findOne({username:username})
    // console.log(already)
    if(already){
        return res.status(400).json({message:"Username already exist!Try another"})
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedpass = await bcrypt.hash(password, salt)
        // console.log(hashedpass)
        const user = new User({ username, password:hashedpass });
        // console.log(user)
        await user.save();
        res.json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ message:'Use another username' });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // console.log("000")
        const user = await User.findOne({ username });
        // console.log(user)
        if (!user) {
            // console.log("not presen")
            return res.status(400).json({ message: 'User Dosent exist ' });
    }

        // console.log("reacheddd111")
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Incorrect Password' });
        // console.log("reacheddd")
        const token = jwt.sign({ userId: user._id },JWT_SECRET);
        res.json({token:token,message:"Logged in Successfully"});
    } catch (err) {
        res.status(500).json({ message:"Invalid inputs" });
    }
});

app.get("/todos",authMiddleware, async (req, res) => {
    try{

        const todos = await Todos.find({userId:req.user.userId})
        return res.json(todos)
    }catch(e){
        res.json({error:"No todos !"})
    }
})

app.post("/todo",authMiddleware, async (req, res) => {
    try {
        const { todo } = req.body;
        const created = await Todos.create({
            todo: todo,
            userId:req.user.userId,
        })
        if (created) {
            return res.json({todo:created,message:"Todo Added Successfully"})
        }
        return res.status(200).json({ message: "Error in database!" })
    } catch (e) {
        // console.log(e);
        return res.status(400).json({ message: "Invalid Inputs!" })
    }

})

app.put("/todo/:id",authMiddleware, async (req, res) => {
    const { id } = req.params
    const { updatedTodo, isCompleted } = req.body;
    const todo = await Todos.findById(id)
    const prevTodo = await Todos.findByIdAndUpdate(
        {_id:id,userId:req.user.userId},
        {
            todo: updatedTodo,
            isCompleted: !isCompleted
        }
    )
    if (!prevTodo) {
        return res.json({ message: "Todos not found" })
    }

    return res.json({ message: "Updated" })
})

app.delete("/todo/:id",authMiddleware, async (req, res) => {
    const { id } = req.params
    const todo = await Todos.findByIdAndDelete({_id:id,userId:req.user.userId})
    if (!todo) {
        return res.json({ message: "NOT FOUND" })
    }
    return res.json({ message: "Deleted!" })
})

app.listen(3000, () => {
    console.log("listening...")
})