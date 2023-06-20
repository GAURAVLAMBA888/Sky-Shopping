const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const encPassword = CryptoJS.AES.encrypt(
    req.body.password,
    process.env.PASS_KEY
  ).toString();

  const newUser = new User({
    username: req.body.username,
    password: encPassword,
    email: req.body.email,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong Credentials");

    const encPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_KEY
    ).toString(CryptoJS.enc.Utf8);

    req.body.password !== encPassword &&
      res.status(401).json("Wrong Credentials");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_KEY,
      { expiresIn: "3d" }
    );

    const { password, ...otherDetails } = user._doc;

    res.status(200).json({ ...otherDetails, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
