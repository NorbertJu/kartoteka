const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const dotenv = require('dotenv');
const Assignment = require('./model/Assignment');

dotenv.config();

let mailOptions = {
  from: 'Kartotéka',
  to: 'jnorbike@gmail.com',
  subject: 'Test',
  text: 'testing notification'
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kartoteka.notification@gmail.com',
    pass: process.env.EMAIL_PASS
  }
});

module.exports = schedule.scheduleJob('* * * * *', async () => {
  const assignments = await Assignment.find().populate('group_id').populate({
    path : 'group_id',
    populate : {
      path : 'members.member'
    }
  })
  console.log(assignments)
  /*
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  */
});