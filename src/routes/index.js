const { Router } = require('express');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
};

const enviarCorreo = require('../funciones/enviarCorreo');

const router = Router();

router.get('/', (req, res) => {
    res.json({ mensaje: 'conectado' });
});

router.post('/email', (req, res) => {

    const { name, email, mensaje } = req.body;
    const correoAdmin = process.env.USER_EMAIL;

    //correoAdmin
    enviarCorreo(0, name, correoAdmin, email, mensaje);

    //correoCliente
    enviarCorreo(1, name, email, email, mensaje);

    console.log(req.body);

    res.json({ mensaje: 'enviado' });
});

module.exports = router;