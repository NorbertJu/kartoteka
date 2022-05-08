const router = require('express').Router();
const Assignment = require('../model/Assignment');
const Group = require('../model/Group');
const Progress = require('../model/Progress');
const verify = require('./verify');
const {assignmentValidation} = require('../validation')


router.get('/user', verify, async (req, res) => {
  try {
    let userAssignments = []
    let activeGroups = await Group.find({'members.member': req.user._id, 'members.active': true}, '_id name'); 
    for (const group of activeGroups) {
      const assignments = await Assignment.find({group_id: group._id.toString()}).populate('document_id')
      for (let assignment of assignments) {
        const progress = await Progress.findOne({user_id: req.user._id, document_id: assignment.document_id._id}, 'state -_id')
        if (progress?.state == 100) {
          continue
        }
        userAssignments.push({
          group: group.name,
          progress: progress?.state ? progress.state : 0,
          _id: assignment.document_id._id,
          name: assignment.document_id.name,
          author: assignment.document_id.author,
          date_to: assignment.date_to,
        })
      }
    }
    res.json(userAssignments)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.get('/progress/:id', verify, async (req, res) => {
  try {
    let assignmentProgress = {}
    const assignment = await Assignment.findOne({_id: req.params.id}).populate('document_id').populate({
      path : 'group_id',
      populate : {
        path : 'members.member'
      }
    })
    assignmentProgress.group = assignment.group_id.name
    assignmentProgress.document = {
      name: assignment.document_id.name,
      author: assignment.document_id.author
    }
    assignmentProgress.date_to = assignment.date_to
    assignmentProgress.date_from = assignment.date_from
    assignmentProgress.members = []
    for (const member of assignment.group_id.members) {
      if (member.active) {
        const progress = await Progress.findOne({document_id: assignment.document_id._id, user_id: member.member._id})
        assignmentProgress.members.push({
          name: member.member.name,
          email: member.member.email,
          progress: progress ? progress.state : 0
        })
      }
    }
    res.json(assignmentProgress)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.get('/:id', verify, async (req, res) => {
  try {
    const assignments = await Assignment.find({group_id: req.params.id}).populate('document_id');
    res.json(assignments)
  } catch (err) {
    res.status(400).send(err)
  }
})

// POST, PUT, DELETE (because of implementation changes)
router.post('/', verify, async (req, res) => {
  for (let assignment of req.body.documents) {
    assignment.group_id = req.body.group_id
    const {error} = assignmentValidation(assignment);
    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    const assignmentExist = await Assignment.findOne({group_id: assignment.group_id, document_id: assignment.document_id})
    if (assignmentExist) {
      try {
        await Assignment.updateOne({group_id: assignment.group_id, document_id: assignment.document_id}, assignment);
      } catch(err) {
        res.status(400).send(err)
      }
    } else {
      try {
        await new Assignment(assignment).save();
      } catch(err) {
        res.status(400).send(err)
      }
    }
  }
  const assignments = await Assignment.find({group_id: req.body.group_id})
  const newAssignments = req.body.documents.map(assignment => assignment.document_id)
  for (let assignment of assignments) {
    if (!newAssignments.includes(assignment.document_id.toString())) {
      try {
        await Assignment.deleteOne({group_id: assignment.group_id, document_id: assignment.document_id});
      } catch(err) {
        res.status(400).send(err)
      }
    }
  }
  res.send("Assignments updated");
})

module.exports = router;