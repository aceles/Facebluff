/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
    Created on : 20-oct-2018, 14:53:27
    Author     : Alejandro Celestino Pombo, Sergio Díaz Renedo
*/

let listaTareas=[
    {text:"Preparar práctica AW",tags:["AW","Práctica"]},
    {text:"Mirar fechas congreso",done:true,tags:[]},
    {text:"Ir al supermercado",tags:["Personal"]},
    {text:"Mudanza",done:false,tags:["Personal"]}
];

function getToDoTasks(tasks){
    
    //Creamos una variable llamada TODO. Filtramos el parámetro de 
    //entrada 'tasks' para guardar en la variable todos los objetos que
    //tengan un atributo 'done' como false o no tengan atributo 'done'
    let todo = tasks.filter(tasks => tasks.done === false 
                                    || !tasks.done);
    
    //Guardamos en la variable tareasTexto el valor del atributo 'text'
    //para cada uno de los objetos que contiene la variable TODO
    let tareasTexto = todo.map(item => item.text);
    
    return tareasTexto;
}

console.log("Tareas pendientes:");
console.log(getToDoTasks(listaTareas));

function findByTag(tasks, tag){
    
    //Creamos una variable llamada byTag. Filtramos el parámetro de 
    //entrada 'tasks' para guardar en la variable todos los objetos que
    //tengan un atributo 'tags' igual al tag de entrada
    let byTag = tasks.filter(tasks => tasks.tags == tag);
    
    return byTag;
}

console.log("Tareas por tag específico:");
console.log(JSON.stringify(findByTag(listaTareas,"Personal")));

function findByTags(tasks, tags){

    //Creamos una variable llamada byTags. Filtramos el parámetro de 
    //entrada 'tasks' para guardar en la variable todos los objetos que
    //tengan un atributo 'tags' igual al array de tags de entrada
    let byTags = tasks.filter(tasks => tags.includes(tasks.tags.toString()));
    
    return byTags;
}

console.log("Tareas por tags específicos:");
console.log(JSON.stringify(findByTags(listaTareas,["Personal","pdap"])));

function countDone(tasks){
    
    let todo = tasks.filter(tasks => tasks.done === true);
    return todo.reduce(n => n + 1, 0);
}

console.log("Número de tareas realizadas:");
console.log(countDone(listaTareas));

/*
function createTask(text){
    
    let tarea = text.split('@');
    let tamaño = tarea.length;
    return{
        text: tarea[0],
        tags:[tarea[1], tarea[2]]
        
    };
}

console.log("Crear tareas:");
console.log(createTask("Ir al médico @personal @salud"));*/