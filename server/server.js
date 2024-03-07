require("dotenv").config();
const express = require("express");
const cors = require("cors")
const app = express();
 const connectdb = require("./utils/db")


 var corsoptions ={
    origin : "http://localhost:5173",
    methods : "POST,PUT,GET,HEAD,DELETE,PATCH",
    credentials: true

 }
 app.use(cors(corsoptions));
app.use(express.json())
const router = require("./auth/auth-router");
app.use("/api/auth/",router);
const port = 5000;

connectdb().then(()=>{
app.listen(port,()=>{
    console.log(`App is running in port ${port}`);
})
});