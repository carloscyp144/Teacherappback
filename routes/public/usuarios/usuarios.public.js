const router = require('express').Router();

const { checkSchema } = require('express-validator');
const { emailValidationSchema } = require('../../../helpers/validators/email.validator');
const { checkValidationsResult } = require('../../../helpers/validator_utils');
const { success } = require('../../../helpers/success_utils');
const { EmailTypes } = require('../../../models/emailspendientes.model');
const { getByEmail } = require('../../../models/usuarios.model');
const { sendMailDataLoaded } = require('../../../helpers/email/email_from_model');

// Login de un alumno.
router.post(
    '/newpassword', 
    checkSchema(emailValidationSchema),
    checkValidationsResult,
    async (req, res) => {
        try {
            const emailEnabled = process.env.EMAIL_ENABLED;
            if (!emailEnabled) {
                return res.status(503)
                          .json({ errorMessage: 'No está configurado el envío de correos electrónicos en el servidor' })
            }

            const { email } = req.body;
            
            const user = await getByEmail(email);
            if (!user) {
                return res.status(401)
                          .json({ errorMessage: 'El email no es correcto' })
            }

            const emailId = (await create(EmailTypes.NUEVO_PASSWORD, user.id)).insertId;

            res.json(success);

            // No esperamos la resolución de la promesa, ni tratamos el error aquí
            // (quedaría anotado en la tabla que está pendiente, y el proceso encargado
            //  de enviar los pendientes lo hará cuando pueda).
            sendMailDataLoaded(
                emailId,
                EmailTypes.NUEVO_PASSWORD,
                user
            )
            .then()
            .catch();
        } catch (error) {
            manageRouterError(res, error);
        }
    }
);

module.exports = router;