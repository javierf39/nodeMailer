const { Router } = require('express');
const nodemailer = require('nodemailer');

const router = Router();

router.get('/', (req, res) => {
    res.json({ mensaje: 'conectado' });
});

router.post('/email', (req, res) => {

    const { name, email, mensaje } = req.body;
    contentHTML = `
        <h1>${name} quiere contratar nuestros servicios</h1>
        <p>Sus datos de contaccto son ${email}</p>
        <p>${mensaje}</p>
    `;

    const transporter = nodemailer.createTransport({
        host: 'smtp.titan.email',
        port: 465,
        secure: true,
        auth: {
            user: 'prueba@javierfreire.cl',
            pass: 'jkulmnsit29taza'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const info = transporter.sendMail({
        from: "'Correo de prueba' <prueba@javierfreire.cl>",
        to: 'javierfreire39@gmail.com',
        subject: 'Pruebas',
        html: contentHTML
    });

    console.log('mensaje ', info.messageId);
    console.log(req.body)

    res.json({ mensaje: 'enviado' });
});

module.exports = router;