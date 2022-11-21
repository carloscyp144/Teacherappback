
const { getAdminsEmail } = require("../../../models/usuarios.model");

const getMailAltaProfesorOptions = async (usuarioProfesor) => {
    const emailList = await getAdminsEmail();
    const emailTo   = emailList.map(element => element.email).join(',');
    return {
        from: process.env.EMAIL_USER,
        to: emailTo,
        subject: 'Nueva petición de alta de profesor',
        text: getEmailTxt(usuarioProfesor),
        /*html: getEmailHtml(profesor)*/ // <-- HTML con enlace.
    };
}

const getEmailTxt = (usuarioProfesor) => {
    if (usuarioProfesor === null) {
        return 'Nueva petición de alta de profesor';
    } else {
        return `Nueva petición de alta de profesor. NOMBRE: ${usuarioProfesor.nombreCompleto}. RAMA: ${usuarioProfesor.nombreRama}. ID: ${usuarioProfesor.id}`;
    }
}
  

module.exports= { getMailAltaProfesorOptions };