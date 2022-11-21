const { getMailAltaProfesorOptionsDataLoaded } = require('./templates/emailAltaProfesor.template');
const { sendMail } = require('./email_utils');

const emailEnabled = process.env.EMAIL_ENABLED;

const sendMailDataLoaded = async(emailType, data) => {
    if (emailEnabled) {
        try {
            const mailOptions = await getMailOptionsDataLoaded(emailType, data);
            await sendMail(id, mailOptions)
        } catch(exception){
            console.log('Error al enviar el correo electrónico:', exception);
        }
    }  
}

const getMailOptionsDataLoaded = (emailType, data) => {
    switch(emailType) {
        case EmailTypes.ALTA_PROFESOR:
            return getMailAltaProfesorOptionsDataLoaded(data);
        default:
            return null;
    }
}

module.exports= { sendMailDataLoaded };