const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const verify = require('./verify');
const {profileValidation} = require('../validation');

router.get('/', verify, async (req, res) => {
  try {
    const profile = await User.findOne({user_id: req.user._id});
    if (!profile) {
      res.status(404).send("Profile does not exist")
    } else {
      let result = {
        name: profile.name,
        email: profile.email
      }
      res.json(result)
    }
  } catch (err) {
    res.status(400).send(err)
  }
})

router.put('/', verify, async (req, res) => {
  //Validate data
  const {error} = profileValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  let newData = {
    name: req.body.name,
    surname: req.body.email
  }

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    newData.password = hashedPassword;
  }

  //Update profile
  try {
    const profile = await User.updateOne({user_id: req.user._id}, newData);
    res.send(profile);
  } catch(err) {
    res.status(400).send(err)
  }
})


module.exports = router;