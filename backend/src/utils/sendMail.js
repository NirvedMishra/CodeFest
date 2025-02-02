import { createTransport } from 'nodemailer';
import { google } from 'googleapis';
import dotenv from "dotenv";

dotenv.config()

export const sendMail =  async (email, subject, mailHtml) => {

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    // Get access token
    const accessToken = await oauth2Client.getAccessToken();
    
    if (!accessToken.token) {
      throw new Error("Failed to retrieve access token");
    }

    // Create transporter
    let transporter = createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: accessToken.token, // Ensure this is valid
      },
    });

    // Define email options
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      html: mailHtml,
    };

    // Send email
    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent:', info.messageId);
    return info;

}
