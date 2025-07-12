const express = require("express");
const router = express.Router();
const Product = require("../database/models/Product");
const fs = require('fs');
const path = require('path');

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

// add product route
router.get("/add",(req,res)=>{

    res.render("addProduct.ejs",{query:req.query});
})

// // POST /api/products/add - Add new product
// router.post('/add', async (req, res) => {
//   try {
//     const {
//       name,
//       imgUrl,
//       product_category,
//       product_sub_category,
//       carbonFootprint,
//       price,
//       description
//     } = req.body;

//     const newProduct = new Product({
//       name,
//       imgUrl,
//       product_category,
//       product_sub_category,
//       carbonFootprint,
//       price,
//       description
//     });

//     await newProduct.save();

//     res.status(201).json({ message: "Product added successfully!" });
//   } catch (err) {
//     console.error("Error adding product:", err);
//     res.status(500).json({ message: "Failed to add product" });
//   }
// });


// add product to json file... 
const filePath = path.join(__dirname,'../util/products.txt');

router.post('/add', async (req, res) => {
  const product = req.body;

  try {
    // Read existing data
    let products = [];
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      if (data) {
        products = JSON.parse(data);
      }
    }

    // Add new product to the array
    products.push(product);
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));

    // Redirect with success message
    res.redirect('add/?success=1');
  } catch (err) {
    console.error('Error saving product:', err);
    res.redirect('add/?error=1');
  }

});


module.exports = router;