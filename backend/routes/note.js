const router = require('express').Router();
const Note = require('../model/Note');
const verify = require('./verify');
const {noteValidation} = require('../validation')

router.get('/:id', verify, async (req, res) => {
  try {
    const note = await Note.findOne({user_id: req.user._id, document_id: req.params.id}, 'text');
    res.json(note)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.post('/', verify, async (req, res) => {
  req.body.user_id = req.user._id;
  const {error} = noteValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  
  const note = new Note({
    text: req.body.text,
    user_id: req.body.user_id,
    document_id: req.body.document_id,
  });

  try {
    await note.save();
    res.send(note);
  } catch(err) {
    res.status(400).send(err)
  }
})

router.put('/', verify, async (req, res) => {
  let newNote = {
    text: req.body.text,
  }

  try {
    const note = await Note.updateOne({user_id: req.user._id, document_id: req.body.document_id}, newNote);
    res.send(note);
  } catch(err) {
    res.status(400).send(err)
  }
})

module.exports = router;