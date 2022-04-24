const router = require('express').Router();
const Assignment = require('../model/Assignment');
const verify = require('./verify');
const {assignmentValidation} = require('../validation')

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