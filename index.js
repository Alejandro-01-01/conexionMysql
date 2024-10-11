const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

// Base de datos
const database = "ventas";
const user = "root";
const host = "localhost:3306";
const password = "Alejandro_01";

// Conexión a MySQL
const db = mysql.createConnection({ 
    host, 
    user, 
    password, 
    database,
});

const PORT = process.env.PORT || 60000;

app.use(cors());
app.use(express.json());

// Verificar conexión a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Ruta para crear un nuevo usuario
app.post('/usuarios', (req, res) => {
    const { usuario, nombre, telefono, direccion, password } = req.body;
    db.query(
        'INSERT INTO usuarios (usuario, nombre, telefono, direccion, password) VALUES (?, ?, ?, ?, MD5(?))', 
        [usuario, nombre, telefono, direccion, password], 
        (err, result) => {
            if (err) {
                res.status(400).send({ status: 400, message: err });
            } else {
                res.status(201).send({
                    status: 201,
                    message: 'Usuario creado con éxito',
                    data: result
                });
            }
        }
    );
});
