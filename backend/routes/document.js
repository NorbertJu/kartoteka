const router = require('express').Router();
const Document = require('../model/Document');
const verify = require('./verify');
const {documentValidation} = require('../validation')

router.get('/', verify, async (req, res) => {
  try {
    const documents = await Document.find();
    res.json(documents)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.post('/', verify, async (req, res) => {
  //Validate data
  const {error} = documentValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  
  //Create new school
  const document = new Document({
    data: req.body.data,
    author: req.body.author,
    name: req.body.name,
    description: req.body.description,
  });

  try {
    await document.save();
    res.send({_id: document._id});
  } catch(err) {
    res.status(400).send(err)
  }
})

module.exports = router;