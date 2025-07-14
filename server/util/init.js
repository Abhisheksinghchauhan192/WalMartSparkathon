// Thhis is to Create Sample Data in the DataBase.. 
// From the very First 
const path = require("path");
require("dotenv").config({path:path.resolve(__dirname,"../.env")});

const mongoose = require("mongoose");
const fs = require("fs");

// Importing our Data Models. 
const Product = require("../database/models/Product");

// connection to the DB..
const connection = mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Succefully Connected To MongeDB");
}).catch((err)=>{

    console.log("Error Connecting With Database",err);
})

// reading the json data from the file 
const filePath = path.join(__dirname,"products.txt");
const rawData = fs.readFileSync(filePath,'utf-8');
const productData = JSON.parse(rawData);

// inserting data into the DB.. 
Product.deleteMany({}).catch((err)=>{
    console.log("Internal Error Try Again. ",err);
});

Product.insertMany(productData)
.then(()=>{

    console.log("Random Data Inserted Into DB");
}).catch((err)=>{

    console.log("Some Error Occured while Inserting the Data into DD \n",err);
    console.error("❌ Error inserting data into DB:\n", err);

}).finally(()=>{

    mongoose.disconnect();
});

