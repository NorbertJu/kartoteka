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
  req.body.creator = req.user._id;
  const {error} = documentValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  
  const document = new Document({
    data: req.body.data,
    author: req.body.author,
    creator: req.body.creator,
    name: req.body.name,
    description: req.body.description,
  });

  try {
    await document.save();
    res.send({id: document._id});
  } catch(err) {
    res.status(400).send(err)
  }
})

router.put('/', verify, async (req, res) => {
  let newData = {
    data: req.body.data,
    author: req.body.author,
    name: req.body.name,
    description: req.body.description,
  }

  try {
    const document = await Document.updateOne({_id: req.body.id}, newData);
    res.send(document);
  } catch(err) {
    res.status(400).send(err)
  }
})

router.delete('/:id', verify, async (req, res) => {
  try {
    const document = await Document.deleteOne({_id: req.params.id});
    res.json(document)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.get('/:id', verify, async (req, res) => {
  try {
    const document = await Document.findOne({_id: req.params.id});
    res.json(document)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.get('/edit/:id', verify, async (req, res) => {
  try {
    const document = await Document.findOne({_id: req.params.id});
    let canEdit = false
    if (document.creator == req.user._id) {
      canEdit = true
    }
    res.json({canEdit})
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router;