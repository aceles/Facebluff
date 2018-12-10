"use strict";

const mysql = require("mysql");
const config = require("./config");
const DAOUsers = require("./DAOUsers");
const DAORespuestas = require("./DAORespuestas");

// Crear el pool de conexiones
const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

let daoUser = new DAOUsers(pool);
let daoTask = new DAORespuestas(pool);

// Definición de las funciones callback
// Uso de los métodos de las clases DAOUsers y DAOTasks



