"use strict";

class DAOTasks {
    
    constructor(pool) { 
        this.poolBD = pool;
    }
      
    getAllTasks(email, callback) {
        this.poolBD.getConnection(function(err, con) {
            if (err) {
                callback("Error de conexión a la base de datos");
            } else {
                con.query("select task.id, task.text, task.done, tag.tag from task right join tag ON tag.taskId = task.id WHERE task.user ='"+email+"'",function(err, rows) {
                    con.release();
                    if (err) {
                        callback("Error de acceso a la base de datos");
                    } else {
                        //Creamos un array, que contendrá las consultas en un formato más accesible
                        var consulta = [];
                        //El array tags contendrá todos los tags de una tarea
                        var tags = [];
                        var id = -1;
                        var iteracion = -1;
                        
                        //Se recorre lo que ha devuelto la query
                        rows.forEach(function(tarea){
                            // Si el ID de la fila que estamos procesando no es el mismo que el que procesamos antes, comprobamos
                            // que id no sea -1 (lo será la primera vez que ejecutemos la función) y si no lo es introducimos
                            // en la posición "iteración" del array "consulta" el array "tags", que contiene todos los tags de la tarea
                            if (tarea.id !== id){
                                if (id !== -1){
                                    if (tags.length !== 0) consulta[iteracion]["Tags"] = tags;
                                }
                            
                            // Reinicializamos el array tags para borrar el contenido que pudiera tener antes de otra tarea,
                            // aumentamos el valor de la iteración y creamos en la posición "iteración" del array "consulta"
                            // un objeto nuevo con los campos ID, Text y Done, que conocemos de la query y son únicos.
                            // Guardamos el ID procesado e introducimos en el array "tags" el tag de la tarea
                            iteracion = iteracion + 1;
                            tags = [];
                            consulta[iteracion] = {};
                            consulta[iteracion]["ID"] = tarea.id;
                            consulta[iteracion]["Text"] = tarea.text;
                            consulta[iteracion]["Done"] = tarea.done;
                            tags.push(tarea.tag);
                            id = tarea.id;
                            }
                            
                            // Si el ID a procesar ya lo procesamos antes, significa que los datos de ID, Text y Done ya están en el 
                            // objeto dentro del array "consultas", así que lo que estamos procesando es una fila duplicada de la query
                            // que contiene un tag diferente al de antes. La query devuelve tantas filas de una tarea como tags tenga
                            // así que una tarea con 2 tags tiene dos filas, que son idénticas salvo por el valor de su columna Tag
                            else {
                                tags.push(tarea.tag);
                            }
                        });
                        
                        // Al finalizar la función queda por introducir en el array "consultas" los tags de la última tarea procesada.
                        // Comprobamos que el array no esté vacío, porque si lo estuviera significa que no había tareas a procesar
                        if (tags.length !== 0) consulta[iteracion]["Tags"] = tags;
                        callback(null,consulta);
                    }                
                });
            }
        });		
    }
    insertTask(email, task, callback) {
        var tagValues = "";
        var iteracion = 0;
        this.poolBD.getConnection(function(err, con) {
            if (err) {
                callback("Error de conexión a la base de datos");
            } else {
                con.query("INSERT INTO task(id, user, text, done) VALUES (null,'"+email+"','"+task.text+"','"+task.done+"')",function(err, rows) {
                    if (err) {
                        callback("Error de acceso a la base de datos");
                    } else {
                        task.tags.forEach(function(tag){
                            if (tag !== ""){
                                if (iteracion !== 0) tagValues = tagValues + ",";
                                tagValues = tagValues + ("('"+rows.insertId+"','"+tag+"')");
                                iteracion = iteracion + 1;
                            }
                        });
                        con.query("INSERT INTO tag(taskId, tag) VALUES "+tagValues,function(err, rows) {
                        con.release();
                        if (err) {
                            callback("Error de acceso a la base de datos");
                        } else {
                            callback(null,rows);
                        }                
                        });
                    }                
                });
            }
        });
    }
    markTaskDone(idTask, callback) {
        this.poolBD.getConnection(function(err, con) {
            if (err) {
                callback("Error de conexión a la base de datos");
            } else {
                con.query("update task set done = '1' where id = '"+idTask+"'",function(err, rows) {
                    con.release();
                    if (err) {
                        callback("Error de acceso a la base de datos");
                    } else {
                        callback(null,idTask);
                    }                
                });
            }
        });
    }
    deleteCompleted(email, callback) {
        this.poolBD.getConnection(function(err, con) {
            if (err) {
                callback("Error de conexión a la base de datos");
            } else {
                con.query("DELETE FROM task WHERE user = '"+email+"' AND done = '1'",function(err, rows) {
                    con.release();
                    if (err) {
                        callback("Error de acceso a la base de datos");
                    } else {
                        callback(null,rows);
                    }                
                });
            }
        });
    }
}
module.exports = DAOTasks;