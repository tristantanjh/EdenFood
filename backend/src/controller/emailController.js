import "dotenv/config";
import mg from "mailgun-js";

const mailgun = () => 
    mg({
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
    });

const sendEmail = async (req, res) => {
    const { userEmail, subject, message } = req.body;
    mailgun().messages().send({
        from: `${userEmail}`,
        to: 'poopoojoshua@gmail.com',
        subject: `${subject}`,
        html: `<p>${message}</p>`
    },
    (error, body) => {
        if (error) {
            console.log(error);
            res.status(500).send({ message: 'Error in sending email' });
        } else {
            console.log(body);
            res.send({ message: 'Email sent successfully' });
        }
    })
  };

  export {
    sendEmail
  };
  