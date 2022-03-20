const router = require('express').Router();
const User = require('../model/User');
const verify = require('./verify');

router.get('/', verify, async (req, res) => {
  try {
    const profile = await User.findOne({user_id: req.user._id});
    if (!profile) {
      res.status(404).send("Profile does not exist")
    } else {
      res.json(profile)
    }
  } catch (err) {
    res.status(400).send(err)
  }
})


module.exports = router;