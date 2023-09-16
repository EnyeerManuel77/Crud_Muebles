const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; 
const cors = require('cors');

app.use(bodyParser.json()); 

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'muebles'
});

app.use(cors({ origin: 'http://localhost:4200' }));

db.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión a la base de datos exitosa');
  }
});

app.get('/api/muebles', (req, res) => {
  const sql = 'SELECT * FROM muebles';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al obtener los muebles:', err);
      res.status(500).json({ error: 'Error al obtener los muebles' });
    } else {
      res.json(result);
    }
  });
});

app.post('/api/muebles', (req, res) => {
  const { nombre, descripcion, precio, estado } = req.body; 

  const sql = 'INSERT INTO muebles (nombre, descripcion, precio, estado) VALUES (?, ?, ?, ?)';
  db.query(sql, [nombre, descripcion, precio, estado], (err, result) => {
    if (err) {
      console.error('Error al crear el mueble:', err);
      res.status(500).json({ error: 'Error al crear el mueble' });
    } else {
      res.status(201).json({ mensaje: 'Mueble creado exitosamente' });
    }
  });
});

app.put('/api/muebles/:id', (req, res) => {
  const id = req.params.id;
  const { nombre, descripcion, precio, estado } = req.body;

  const sql = 'UPDATE muebles SET nombre=?, descripcion=?, precio=? WHERE id=?';
  db.query(sql, [nombre, descripcion, precio, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar el mueble:', err);
      res.status(500).json({ error: 'Error al actualizar el mueble' });
    } else {
      res.status(200).json({ mensaje: 'Mueble actualizado exitosamente' });
    }
  });
});

app.get('/muebles/:id', (req, res) => {
  const muebleId = req.params.id;
  const mueble = obtenerMueblePorId(muebleId);
  if (mueble) {
    res.json({ ...mueble, estado: mueble.estado });
  } else {
    res.status(404).json({ error: 'Mueble no encontrado' });
  }
});

app.put('/api/muebles/:id/estado', (req, res) => {
  const id = req.params.id;
  const { estado } = req.body;

  const sql = 'UPDATE muebles SET estado=? WHERE id=?';
  db.query(sql, [estado, id], (err, result) => {
    if (err) {
      console.error('Error al cambiar el estado del mueble:', err);
      res.status(500).json({ error: 'Error al cambiar el estado del mueble' });
    } else {
      res.status(200).json({ mensaje: 'Estado del mueble cambiado exitosamente' });
    }
  });
});


app.listen(port, () => {
  console.log(`Servidor backend en ejecución en http://localhost:${port}`);
});
