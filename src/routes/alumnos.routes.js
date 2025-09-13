const express = require('express');
const router = express.Router();
const studentController = require('../controllers/alumnos.controller');

// Rutas para el CRUD de Alumnos

// GET /api/students -> Obtener todos los alumnos
router.get('/', studentController.getAllStudents);

// GET /api/students/:id -> Obtener un alumno por su ID
router.get('/:id', studentController.getStudentById);

// POST /api/students -> Crear un nuevo alumno
router.post('/', studentController.createStudent);

// PUT /api/students/:id -> Actualizar la calificación de un alumno
router.put('/:id', studentController.updateStudentGrade);

// DELETE /api/students/:id -> Eliminar un alumno
router.delete('/:id', studentController.deleteStudent);


module.exports = router;