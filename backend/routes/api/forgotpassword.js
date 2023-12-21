const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

  
  //@route  POST api/forgotpassword
  //@desc   forgot password
  //@access Public
  router.post(
    "/",
    async (req, res) => {
  
      const { email } = req.body;
  
      try {
        //See if user Exist
        let user = await User.findOne({ email }).then((currentUser)=>{
            res.json(currentUser);
        });
  
        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Try Again" }] });
        }
    
      } catch (err) {
        //Something wrong with the server
        console.error(err.message);
        return res.status(500).send("Server Error");
      }
    }
  );
  
  module.exports = router;
