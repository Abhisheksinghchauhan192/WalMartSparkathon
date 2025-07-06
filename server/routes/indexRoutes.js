const express = require("express");
const router = express.Router();
const Product = require("../database/models/Product");

router.get("/",async(req,res)=>{


    let result = await Product.find();
    res.send(result);
})


module.exports = router;