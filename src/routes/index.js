const { Router } = require('express');
// const nodemailer = require('nodemailer');
const enviarCorreo = require('../funciones/enviarCorreo');

const router = Router();

router.get('/', (req, res) => {
    res.json({ mensaje: 'conectado' });
});

router.post('/email', (req, res) => {

    const { name, email, mensaje } = req.body;
    const correoAdmin = 'prueba@javierfreire.cl';

    //correoAdmin
    enviarCorreo(0, name, correoAdmin, email, mensaje);

    //correoCliente
    enviarCorreo(1, name, email, email, mensaje);

    console.log(req.body);

    res.json({ mensaje: 'enviado' });
});

module.exports = router;