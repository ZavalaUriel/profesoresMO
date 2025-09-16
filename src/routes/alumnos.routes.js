const express = require('express');
const router = express.Router();
const calificacionesController = require('../controllers/alumnos.controller');

// GET /api/calificaciones -> Obtener todas las calificaciones
router.get('/', calificacionesController.getAllCalif);

// GET /api/calificaciones/:parcial -> Obtener calificaciones por parcial
router.get('/:parcial', calificacionesController.getCalifByParcial);

// GET /api/calificaciones/alumno/:matriculaAlumno -> Obtener calificaciones de un alumno
router.get('/alumno/:matriculaAlumno', calificacionesController.getCalifByAlumno);

// PUT /api/calificaciones/:matriculaAlumno -> Actualizar calificación de un alumno
router.put('/:matriculaAlumno', calificacionesController.updateCalifByAlumno);  

module.exports = router; // Exportar el router y la función post