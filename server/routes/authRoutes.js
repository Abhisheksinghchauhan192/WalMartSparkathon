const express = require("express");
const router = express.Router();
const User = require("../database/models/User");

router.post("/login",(req,res)=>{

    console.log(req.body);
    res.send("login route");
});

router.post("/signup",(req,res)=>{

    console.log(req.body);
    res.send("signup route");
});


module.exports = router;