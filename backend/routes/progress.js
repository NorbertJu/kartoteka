const router = require('express').Router();
const Progress = require('../model/Progress');
const verify = require('./verify');
const {progressValidation} = require('../validation')

router.get('/:id', verify, async (req, res) => {
  try {
    const progress = await Progress.findOne({user_id: req.user._id, document_id: req.params.id}, 'state');
    res.json(progress)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.post('/', verify, async (req, res) => {
  req.body.user_id = req.user._id;
  const {error} = progressValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  
  const progress = new Progress({
    state: req.body.state,
    user_id: req.body.user_id,
    document_id: req.body.document_id,
    date: null
  });

  try {
    await progress.save();
    res.send(progress);
  } catch(err) {
    res.status(400).send(err)
  }
})

router.put('/', verify, async (req, res) => {
  let newProgress = {
    state: req.body.state,
  }

  if (newProgress.state == 100) {
    newProgress.date = new Date()
  }

  try {
    const progress = await Progress.updateOne({user_id: req.user._id, document_id: req.body.document_id}, newProgress);
    res.send(progress);
  } catch(err) {
    res.status(400).send(err)
  }
})

module.exports = router;