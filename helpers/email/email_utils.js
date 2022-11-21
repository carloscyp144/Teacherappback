const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const { remove } = require('../../models/emailspendientes.model');

const emailEnabled = process.env.EMAIL_ENABLED;

const createSmtpTransport = async () => {
    const oauth2Client = new OAuth2(
        process.env.EMAIL_CLIENT_ID,
        process.env.EMAIL_CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
        refresh_token: process.env.EMAIL_REFRESH_TOKEN
    });

    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if (err) {
            reject("Failed to create access token :(");
            }
            resolve(token);
        });
    });

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.EMAIL_USER,
            accessToken,
            clientId: process.env.EMAIL_CLIENT_ID,
            clientSecret: process.env.EMAIL_CLIENT_SECRET,
            refreshToken: process.env.EMAIL_CLIENT_SECRET
        }
    });

    return transport;
}

const sendMail = async(id, mailOptions) => {
    if (emailEnabled) {
        try {            
            if (mailOptions === null) {
                console.log(`Tipo de email desconocido ${emailType}. Se borrará.`);
                await remove(id);
            }
            else {
                const smtpTransport = await createSmtpTransport();
                smtpTransport.sendMail(mailOptions, async (error, info) => {
                    try {
                        if (error) {
                            console.log('Error al enviar el correo electrónico:', error);
                        } else {
                            await remove(id);
                        }
                    } catch(exception){
                        console.log('Error al enviar el correo electrónico:', exception);
                    }
                }); 
            }
        } catch(exception){
            console.log('Error al enviar el correo electrónico:', exception);
        }
    }
}

module.exports= { sendMail };