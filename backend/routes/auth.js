const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation');

router.post('/register', async (req, res) => {
  //Validate data
  const {error} = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  //Check if user/email already exists
  const emailExist = await User.findOne({email: req.body.email})
  const nameExist = await User.findOne({name: req.body.name})
  if (emailExist) {
    return res.status(400).send("Email already exists")
  }
  if (nameExist) {
    return res.status(400).send("Name already exists")
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create new user
  const user = new User({
    name: req.body.name,
    password: hashedPassword,
    email: req.body.email
  });

  try {
    await user.save();
    res.send({_id: user._id});
  } catch(error) {
    res.status(400).send(error)
  }
})

router.post('/login', async (req, res) => {
  //Validate data
  const {error} = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  //Check if user exists
  const user = await User.findOne({email: req.body.email})
  if (!user) {
    return res.status(400).send("Email or password is incorrect");
  }

  //Check password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Email or password is incorrect");
  }

  //Create token
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  res.header('Auth-Token', token).send(token);
})

router.post('/verify', async (req, res) => {
  const token = req.body.token;
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    res.send(verified.role)
  } catch(err) {
    res.status(400).send('Invalid token');
  }
})

module.exports = router;