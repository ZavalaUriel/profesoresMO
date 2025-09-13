// src/db/database.js
const mysql = require('mysql2/promise');
const { db: dbConfig } = require('../config');

// Crear un pool de conexiones
const pool = mysql.createPool({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

console.log('Pool de conexiones a MySQL creado.');

module.exports = pool;