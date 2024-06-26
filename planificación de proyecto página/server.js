const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proyectoFinal'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});

app.post('/guardar_turno', (req, res) => {
    let fecha = req.body.fecha;
    let hora = req.body.hora;
    console.log(`Fecha recibida: ${fecha}`);
    console.log(`Hora recibida: ${hora}`);
    let checkQuery = `SELECT * FROM turnos WHERE fecha = '${fecha}' AND hora = '${hora}'`;

    db.query(checkQuery, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json({ status: 'error', message: 'La fecha ya está seleccionada, por favor elija otra fecha' });
        } else {
            let insertQuery = `INSERT INTO turnos (fecha, hora) VALUES ('${fecha}', '${hora}')`;
            db.query(insertQuery, (err, result) => {
                if (err) throw err;
                res.json({ status: 'success', message: 'Turno guardado con éxito' });
    });
        }
    });
});

server=3003;
app.listen(server, () => {
    console.log(`Servidor corriendo en el puerto ${server}`);
});