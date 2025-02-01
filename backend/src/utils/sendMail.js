import { createTransport } from 'nodemailer';

// import dotenv from "dotenv"
// dotenv.config()

export const sendMail = async(email,subject,mailHtml)=>{
  
    
    

    try {
      // Create a transporter object using the default SMTP transport
      let transporter = createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.EMAIL_USER,
          refreshToken:process.env.GMAIL_REFRESH_TOKEN,
          accessToken: process.env.GMAIL_ACCESS_TOKEN,
          clientId: process.env.GOOGLE_CLIENT_ID, // Can be omitted if not used
          clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Can be omitted if not used
        }
      });
  
      // Define email options
      let mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        html: mailHtml
      };
  
      // Send email
      let info = await transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
    } catch (error) {
      console.log(error)
    }
  
}