const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation");
const sendEmail = require("../utils/sendMail");

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    role: req.body.role
  });

  try {
    const savedUser = await user.save();
    const msg = {
      to: user.email,
      from: "sivadass@node-api.com",
      subject: "Registration successful!",
      text: "Now you can login using your email and password",
      html: `<strong>Welcome ${user.name}</strong>, enjoy this app!`
    };
    sendEmail(msg);
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is not found!");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Incorrect password!");

  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "1h"
    }
  );
  res.header("auth-token", token).send(token);
});

module.exports = router;
