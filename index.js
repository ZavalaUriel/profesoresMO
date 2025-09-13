// index.js (Versión con CORS)

const express = require('express');
const cors = require('cors'); // <-- La pieza clave
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // <-- Habilita la comunicación con el frontend
app.use(express.json());

// ... (resto de tus rutas API)
const studentRoutes = require('./src/routes/alumnos.routes');
app.use('/api/students', studentRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});