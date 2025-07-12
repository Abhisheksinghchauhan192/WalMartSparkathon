require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./database/connection");
const {createSession} = require("./middleware/authMiddleWare");
const cors = require("cors");
const path = require("path");

// connect to DB 
connectDB();

// imports the routes.. 
const indexRoute = require("./routes/indexRoutes");
const cartRoute = require("./routes/cartRoutes");
const authRoute = require("./routes/authRoutes");

//set up the middlewares
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// parse data.. 
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

// session middleware
app.use(createSession);

// setting up routes 
app.use("/login",authRoute);
app.use("/products",indexRoute);
app.use("/cart",cartRoute);



const Port = process.env.PORT;
app.listen(Port,()=>{
    console.log("Server is Litening on Port ",Port);
});