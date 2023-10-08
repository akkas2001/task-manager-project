const nodemailer = require("nodemailer");

const sentEmailUtility = async (Email, EmailText, EmailSubject) => {
    let transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        auth: {
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    let mailOption = {
        from:"Task Manager<admin@amitjs.com>",
        to: EmailTo,
        subject: EmailSubject,
        text: EmailjText,
    };

    return await transporter.sendMail(mailOtion);
};

module.exports = sendMailUtility;