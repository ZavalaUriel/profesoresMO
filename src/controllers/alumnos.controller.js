const pool = require('../db/database'); // Importamos el pool de conexiones

// OBTENER TODOS LOS ALUMNOS (READ)
const getAllStudents = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM students');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los alumnos', error });
    }
};

// OBTENER UN ALUMNO POR ID (READ)
const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM students WHERE id = ?', [id]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: 'Alumno no encontrado' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el alumno', error });
    }
};

// CREAR UN NUEVO ALUMNO (CREATE)
const createStudent = async (req, res) => {
    try {
        const { name, grade } = req.body;
        if (!name || grade === undefined) {
            return res.status(400).json({ message: 'El nombre y la calificación son requeridos' });
        }
        
        const [result] = await pool.query('INSERT INTO students (name, grade) VALUES (?, ?)', [name, grade]);
        const newStudent = { id: result.insertId, name, grade };
        
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el alumno', error });
    }
};

// ACTUALIZAR CALIFICACIÓN DE UN ALUMNO (UPDATE)
const updateStudentGrade = async (req, res) => {
    try {
        const { id } = req.params;
        const { grade } = req.body;

        if (grade === undefined) {
            return res.status(400).json({ message: 'La calificación es requerida para actualizar' });
        }

        const [result] = await pool.query('UPDATE students SET grade = ? WHERE id = ?', [grade, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Alumno no encontrado' });
        }

        const [rows] = await pool.query('SELECT * FROM students WHERE id = ?', [id]);
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el alumno', error });
    }
};

// ELIMINAR UN ALUMNO (DELETE)
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM students WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Alumno no encontrado' });
        }
        
        res.status(200).json({ message: 'Alumno eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el alumno', error });
    }
};


module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudentGrade,
    deleteStudent
};