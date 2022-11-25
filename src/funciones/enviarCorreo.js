const nodemailer = require('nodemailer');
const config = require('../config');

module.exports = async function(tipoCorreo, nombre, correoEnviar, correoCliente, mensaje) {

    let cualTipoCorreo = [{
            titulo: 'Nuevo formulario  de contacto enviado',
            asunto: 'Nuevo formulario de contacto',
            notificacion: `Hola, ${nombre} quiere contactar contigo. Sus datos son: ${correoCliente}, '${mensaje}'`
        },
        {
            titulo: 'Nuevo formulario de contacto enviado',
            asunto: 'HUBCLEAN - Correo recibido',
            notificacion: `Hola ${nombre}. Hemos recibido tu mensaje, en breve nuestro equipo se contactará contigo.`
        }
    ];

    let correoHTML = `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style>
    @import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
        body {
            margin: 0;
            width: 100%;
            height: 100vh;
            font-family: 'Kanit', sans-serif !important;
        }
        
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            margin: 0;
            padding: 0;
            font-family: 'Kanit', sans-serif !important;
        }
        
        .header {
            margin: 0 auto;
            width: 100%;
            height: 90px;
            line-height: 70px;
            background: #37B5FF;
            text-align: center;
            color: white;
        }
        
        .header img {
            width: 80px;
            height: 80px;
            margin-top: 5px;
            margin-bottom: 5px;
        }
        
        .contenido-correo {
            display: block;
            margin: 0 auto;
            margin-top: 20px;
            margin-bottom: 20px;
            width: 100%;
            height: auto;
            text-align: center;
            
        }
    </style>
</head>

<body>
<header class="header">




</header>
    <div class="contenido-correo">
    <h2>HUBCLEAN</h2>
        <h3>${cualTipoCorreo[tipoCorreo].titulo}</h3>        
        <p>${cualTipoCorreo[tipoCorreo].notificacion}</p>
        <small>Gracias por contactarnos</small>
        <br>
        <small>Atentamente equipo HUBCLEAN</small>
    </div>
</body>

</html>
    `;

    const transporter = nodemailer.createTransport({
        host: config.HOST_SMTP,
        port: config.PORT_EMAIL,
        secure: true,
        auth: {
            user: config.USER_EMAIL,
            pass: config.PASS_EMAIL
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const info = await transporter.sendMail({
        from: "'HUBCLEAN' <prueba@javierfreire.cl>",
        to: correoEnviar,
        subject: cualTipoCorreo[tipoCorreo].asunto,
        text: cualTipoCorreo[tipoCorreo].notificacion,
        html: correoHTML
    });

    console.log('mensaje ', info);

};