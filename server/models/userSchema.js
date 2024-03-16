const mongoose = require("mongoose");
const validator = require("validator");
//bcrypt for hasing password
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = ""
//secret key kuchh bhi likh sakte hai

const userSchema = new mongoose.Schema({
  fname: {
      type: String,
      required: true,
      trim: true
  },
  email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
          if (!validator.isEmail(value)) {
              throw new Error("Not Valid Email")
          }
      }
  },
  password: {
      type: String,
      required: true,
      minlength: 6
  },
  tokens:[
    {
      token:{
        type: String,
        required: true,
      }
    }
  ]
});

// hasing password
userSchema.pre("save", async function (next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,12);
    }
    next();
});


// token generate
userSchema.methods.generateAuthtoken = async function(){
    try {
        let newtoken = jwt.sign({_id:this._id},SECRET_KEY,{
            expiresIn:"1d"
        });

        this.tokens = this.tokens.concat({token:newtoken});
        await this.save();
        return newtoken;
    } catch (error) {
        res.status(400).json(error)
    }
}

// creating model

//users are a our collection name.
const users = new mongoose.model("users", userSchema);

module.exports = users;
