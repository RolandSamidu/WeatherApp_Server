const nodemailer = require('nodemailer');
const config = require('config');

const emailUser = config.get('emailUser');
const emailPass = config.get('emailPass');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: emailUser,
        pass: emailPass
    }
});

const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: emailUser,
        to,
        subject,
        text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
    });
};

module.exports = { sendEmail };
