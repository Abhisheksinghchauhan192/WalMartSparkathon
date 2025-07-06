const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Invalid email format"],
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);

// Encrypt the password before storing to the DB. 

userSchema.pre('save',async(next)=>{

    if(!this.isModified('password'))
        return next();

    // encrypt is else 
    try{

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);

        next();
    }catch(err){
        next(err);
    }
});


// method for varifying the password in case of 
//user logn 

userSchema.methods.comparePassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};



module.exports = mongoose.model("User", userSchema);
