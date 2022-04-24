const router = require('express').Router();
const Group = require('../model/Group');
const verify = require('./verify');
const {groupValidation} = require('../validation')

router.get('/', verify, async (req, res) => {
  try {
    const groups = await Group.find({
      $or: [
        {manager_id: req.user._id}, 
        {'members.member': req.user._id}
      ]
    }).populate('manager_id').populate('members.member'); 
    res.json(groups)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.get('/:id', verify, async (req, res) => {
  try {
    const group = await Group.findOne({_id: req.params.id}).populate('manager_id').populate('members.member');
    res.json(group)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.post('/', verify, async (req, res) => {
  req.body.manager_id = req.user._id;
  const {error} = groupValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  const nameExist = await Group.findOne({name: req.body.name})
  if (nameExist) {
    return res.status(400).send("Name already exists")
  }
  
  const group = new Group({
    name: req.body.name,
    manager_id: req.body.manager_id,
    members: req.body.members
  });

  try {
    await group.save();
    res.send(group);
  } catch(err) {
    res.status(400).send(err)
  }
})

router.put('/', verify, async (req, res) => {
  let newGroup = {
    name: req.body.name,
    members: req.body.members
  }

  try {
    const group = await Group.updateOne({_id: req.body.id}, newGroup);
    res.send(group);
  } catch(err) {
    res.status(400).send(err)
  }
})

router.delete('/:id', verify, async (req, res) => {
  try {
    const group = await Group.deleteOne({_id: req.params.id});
    res.send(group);
  } catch(err) {
    res.status(400).send(err)
  }
})

router.get('/edit/:id', verify, async (req, res) => {
  try {
    const group = await Group.findOne({_id: req.params.id});
    let canEdit = false
    if (group.manager_id == req.user._id) {
      canEdit = true
    }
    res.json({canEdit})
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router;