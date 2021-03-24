

// const path = require('path');
const express = require('express');
// const ejs = require('ejs');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();


//set views file
// app.set('views',path.join(__dirname,'views'));

//set view engine
// app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




let transporter = nodemailer.createTransport({
    host: 'smtp.googlemail.com',
    port: 465,
    auth: {
        user: 'mag.testowo@gmail.com',
        pass: 'Madzia89'
    },
    tls: {
        rejectUnauthorized: false
    }
});


// Base index route
app.get('/', (req, res) => {
    res.render('index');
});



app.post('/sendmail', (req, res) => {

    let email = req.body.email;
    let name = req.body.name;
    let message = req.body.message;



    let messageOptions = {
        from: email,
        to: 'mag.testowo@gmail.com',
        subject: name,
        // text: message
        html: `${email}: ${message}`
    };


    transporter.sendMail(messageOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.redirect('/');
    });
});


// Server Listening
app.listen(9100, () => {
    console.log('Server is running at port 9100');
});