const session = require("express-session");
const path = require("path");
require("dotenv").config({path:path.resolve(__dirname,"../.env")});

const sessionSecret = process.env.SESSION_SECRET;

const createSession = session({

    secret:sessionSecret,
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:1000*60*60}// 1 hour.

});


function requireAuthentication(req,res,next){

  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" }); // 401 is more correct  
  }

  next();
}

module.exports = {
    createSession,
    requireAuthentication,
}