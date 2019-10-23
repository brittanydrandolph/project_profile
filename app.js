const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();

app.use(bodyParser.json())
app.use(express.json())

//static folder
app.use(express.static(__dirname + '/public/dist/public'));


app.post('/send', (req, res) => {
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details:</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Message: ${req.body.message}</li>
    </ul>`;
    
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    // secure: false,
    auth: {
        user: 'testemailbrittanydrandolph@gmail.com',
        pass: 'testpasswordqwertyuiop' // generated ethereal password
    },
    tls:{
        rejectUnauthorized:false
    }
});

// send mail with defined transport object
let mailOptions = {
    from: '"Personal Website Contact" <testemailbrittanydrandolph@gmail.com>', // sender address
    to: 'brittanydrandolph@gmail.com', // list of receivers
    subject: 'Website Contact Request', // Subject line
    html: output // html body
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error){
        return console.log(error);
    }

console.log('Message sent: %s', info.messageId);
console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
});

});

app.listen(8000, function(){
    console.log("Listening on port 8000 - GREAT WORK!")
});