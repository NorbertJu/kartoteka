const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const dotenv = require('dotenv');
const Assignment = require('./model/Assignment');
const Progress = require('./model/Progress');
const User = require('./model/User');
const Document = require('./model/Document');

dotenv.config();

let mailOptions = {
  from: 'Kartotéka',
  to: '',
  subject: 'Notifikácia',
  text: ''
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kartoteka.notification@gmail.com',
    pass: process.env.EMAIL_PASS
  }
});

async function sendNotifications(manager_id, users, data) {
  const manager = await User.findOne({_id: manager_id});
  let text = ""
  for (const user of users) {
    mailOptions.to = user.email
    mailOptions.text = `Upozornenie o nenaštudovanom dokumente v stanovenom termíne.

    Dátum: ${data.date}
    Skupina: ${data.group}
    Dokument: ${data.document}
    Autor: ${data.author}
    Stav postupu: ${user.progress}%`
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    text += `\n  ${user.name}(${user.email}): ${user.progress}%`
  }

  mailOptions.to = manager.email
  mailOptions.text = `Prehľad o priradenom dokumente.

  Dátum: ${data.date}
  Skupina: ${data.group}
  Dokument: ${data.document}
  Autor: ${data.author}

Zoznam stavu ľudí, ktorý nedodržali termín:
`
  mailOptions.text += text
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  
};

module.exports = schedule.scheduleJob('0 59 23 * * *', async () => {
  var today = new Date();
  today.setUTCHours(0,0,0,0);
  const assignments = await Assignment.find({date_to: today}).populate('group_id').populate({
    path : 'group_id',
    populate : {
      path : 'members.member'
    }
  })
  for (const assignment of assignments) {
    let notify = []
    for (const member of assignment.group_id.members) {
      if (member.active) {
        const progress = await Progress.findOne({user_id: member.member._id, document_id: assignment.document_id}, 'state -_id')
        if (progress.state < 100) {
          notify.push({
            name: member.member.name,
            email: member.member.email,
            progress: progress.state
          })
        }
      }
    }
    if (notify.length) {
      const document = await Document.findOne({_id: assignment.document_id});
      sendNotifications(assignment.group_id.manager_id, notify, {
        group: assignment.group_id.name,
        document: document.name,
        author: document.author,
        date: today.toISOString().slice(0, 10),
      })
    }
  }
});