const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require('./src/routes/index'));

app.listen(port, () => {
    console.log("conectado")
})