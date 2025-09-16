const pool = require('../db/database');

// OBTENER TODOS LOS ALUMNOS (READ)
const getAllCalif = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM calificaciones');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las calificaciones', error });
    }
};


// OBTENER CALIFICACIONES POR PARCIAL
const getCalifByParcial = async (req, res) => {
    try {
        const { parcial } = req.params;
        const [rows] = await pool.query('SELECT * FROM calificaciones WHERE parcial = ?', [parcial]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las calificaciones por parcial', error });
    }      
};

// OBTENER CALIFICACIONES DE UN ALUMNO
const getCalifByAlumno = async (req, res) => {
    try {
        const { matriculaAlumno } = req.params;
        const [rows] = await pool.query('SELECT * FROM calificaciones WHERE matriculaAlumno = ?', [matriculaAlumno]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las calificaciones del alumno', error });
    }       
};

// ACTUALIZAR CALIFICACION DE UN ALUMNO (UPDATE)
const updateCalifByAlumno = async (req, res) => {
    try {
        const { matriculaAlumno } = req.params;
        const { parcial, calificacion } = req.body;
        const [result] = await pool.query('UPDATE calificaciones SET calificacion = ? WHERE matriculaAlumno = ? AND parcial = ?', [calificacion, matriculaAlumno, parcial]);
        res.status(200).json({ message: 'Calificación actualizada', affectedRows: result.affectedRows });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la calificación', error });
    }   
};

// CREAR UNA NUEVA CALIFICACION (CREATE)
const createCalif = async (req, res) => {
    try {
        const { matriculaAlumno, parcial, calificacion } = req.body;
        const [result] = await pool.query('INSERT INTO calificaciones (matriculaAlumno, parcial, calificacion) VALUES (?, ?, ?)', [matriculaAlumno, parcial, calificacion]);
        res.status(201).json({ message: 'Calificación creada', insertId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la calificación', error });
    }
};


module.exports = {
    getAllCalif,
    getCalifByParcial,
    updateCalifByAlumno,
    getCalifByAlumno,
    createCalif
};