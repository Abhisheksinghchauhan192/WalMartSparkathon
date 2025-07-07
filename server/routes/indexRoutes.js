const express = require("express");
const router = express.Router();
const Product = require("../database/models/Product");

router.get("/",async(req,res)=>{

    try{

        const{category} = req.query;
        const filter = {};
        if(category)
                filter.product_category = category;

        let result = await Product.find(filter);
        res.status(200).json(result);
    }catch(err){

        console.error("Error while Fetchin Product for the DB");
        res.status(500).json({message:"Server Error While Fetching Products."});
    }
});

module.exports = router;