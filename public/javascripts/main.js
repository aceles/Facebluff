"use strict";

const mysql = require("mysql");
const config = require("./config");
//const DAOUsers = require("./DAOUsers");
const DAOTasks = require("./DAOTasks");

// Crear el pool de conexiones
const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

let daoUser = new DAOUsers(pool);
let daoTask = new DAOTasks(pool);

let tareaPerro = new Object({
    text: "Sacar al perro",
    done: 0,
    tags: ["Mascota", "Casa"]
});

let tarea = new Object({
    text: "Terminar práctica AW",
    done: 0,
    tags: ["Práctica", "Universidad"]
});

// Definición de las funciones callback

function usuarioCorrecto(err, usuario){
    if (err){
        console.log(err);
    }
    
    else{
        
        if (usuario.length === 0){
            console.log("El usuario y/o la contraseña son incorrectos");
        }
        else console.log("El usuario "+usuario[0].email+" y la contraseña son correctos");
    }
}

function imagenUsuario(err, usuario){
    if (err){
        console.log(err);
    }
    
    else{
        if (usuario.length === 0){
            console.log("El usuario y/o la contraseña son incorrectos");
        }
        else if (usuario[0].img === null) console.log("El usuario no tiene imagen");
        else  console.log("La imagen del usuario es "+usuario[0].img);
    }
}

function listaTareas(err, tareas){
    if (err){
        console.log(err);
    }
    
    else{
        if (tareas.length === 0){
            console.log("No existen tareas que mostrar");
        }     
        else{
            var mensaje;
            var id = -1;
            tareas.forEach(function(tarea){
                if (tarea.id !== id){
                    if (id !==-1) console.log(mensaje);
                    mensaje = "[ID] "+tarea.id+" - [Tarea] "+tarea.text+" - [Done] "+tarea.done+" - [Tags] "+tarea.tag;
                    id = tarea.id;
                }
                else mensaje = mensaje + ", "+tarea.tag;
            });
        
            console.log (mensaje);    
        }
    }
}

function crearTarea(err, tarea){
    if (err){
        console.log(err);
    }
    
    else{
        console.log("Se ha creado la tarea");
    }
}

function marcarTareaCompletada(err, tarea){
    if (err){
        console.log(err);
    }
    
    else{
        console.log("Se ha completado la tarea, con ID "+tarea);
    }
}

function borrarCompletadas(err, tarea){
    if (err){
        console.log(err);
    }
    
    else{
        console.log("Tareas borradas: "+tarea.affectedRows);
    }
}

// Uso de los métodos de las clases DAOUsers y DAOTasks

daoUser.isUserCorrect("usuario@ucm.es","1234567", usuarioCorrecto);
daoUser.getUserImageName("usuario@ucm.es", imagenUsuario);

daoTask.getAllTasks("usuario@ucm.es", listaTareas);
//daoTask.insertTask("usuario@ucm.es", tarea, crearTarea);
//daoTask.markTaskDone("1", marcarTareaCompletada);
//daoTask.deleteCompleted("usuario@ucm.es",borrarCompletadas);