const express = require('express');
const { default: mongoose } = require('mongoose');
const { resolve } = require('path');
require('dotenv').config()
const user=require("./schema")

const app = express();
const PORT = 3010;

let connection=mongoose.connect(process.env.mongoURL)

app.use(express.json())

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});


app.post("/api/users",async(req,res)=> {
try {
  
  const {name,email,password}=req.body

  if (!name|| !email || !password){
    return res.status(400).json({ message:"VAlidation error: All fields are required"})
  }

  const newUser= new user ({name,email,password})
  await newUser.save()

  res.status(201).json({message:"User Created Succesfully!"})

} catch (error) {
  console.error('Error creating user:', error.message);
  res.status(500).json({ message: 'Server error' });
}
})


app.listen(PORT, async() => {
  try{
    await connection;
    console.log("Connected to database  ")
}
catch(error){
    console.log("Error connecting to database")
}
console.log(`Server is running on port ${PORT}`)
});
