const config = require("./config");
const DAOTasks = require("./DAOTasks");
const DAOUsers = require("./DAOUsers");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const bodyParser = require("body-parser");
const fs = require("fs");
const morgan = require("morgan");

// Crear un servidor Express.js
const app = express();

// Crear un pool de conexiones a la base de datos de MySQL
const pool = mysql.createPool(config.mysqlConfig);
const MySQLStore = mysqlSession(session);
const sessionStore = new MySQLStore(config.mysqlConfig);

// Crear instancias DAOs
const daoT = new DAOTasks(pool);
const daoU = new DAOUsers(pool);

// Se incluye el middleware body-parser en la cadena de middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Middleware session
const middlewareSession = session({
    saveUninitialized: false,
    secret: "foobar34",
    resave: false,
    store: sessionStore
});
app.use(middlewareSession);

// Middleware para comprobar si el usuario está logeado actualmente
function currentUserExists (req, res, next) {
    if (req.session.currentUser !== null){
        res.locals.userEmail = req.session.currentUser;
        next();
    }
    
    else res.redirect("/login");
};

app.use(currentUserExists);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + '/public'));
app.use(morgan("dev"));

// Arrancar el servidor
app.listen(config.port, function (err) {
    if (err) {
        console.log("ERROR al iniciar el servidor");
    } else {
        console.log(`Servidor arrancado en el puerto ${config.port}`);
    }
});

// Motor de plantillas

app.get("/", function (req, response) {
    response.status(300);
    response.redirect("/index.html");
});

// Tareas

app.get("/index", function (req, response) {

    daoT.getAllTasks(response.locals.userEmail, function (err, taskList) {
        if (err !== null) {
            console.log(err); //Llevar a pantalla de error cuando se tenga          
        } else {
            response.render("index", {tareas: taskList});
        }
    });
});

app.post("/addTask", function (req, response) {

    var tarea = {
        text: "",
        done: 0,
        tags: []
    };

    tarea.text = req.body.datosTarea.Text;
    tarea.tags = ((req.body.datosTarea.Tag).trim()).split("@");
    
    daoT.insertTask(response.locals.userEmail, tarea, function (err, taskList) {
        if (err !== null) {
            console.log(err); //Llevar a pantalla de error cuando se tenga  
        } else {
            response.redirect("/index");
        }
    });
});

app.get('/finish/:taskID', function (req, response) {

    daoT.markTaskDone(req.params.taskID, function (err, taskList) {
        if (err !== null)
        {
            console.log(err); //Llevar a pantalla de error cuando se tenga  
        } else {
            response.redirect('/index');
        }
    });
});


app.get("/deleteCompleted", function (req, response) {
    
    daoT.deleteCompleted(response.locals.userEmail, function (err, taskList) {
        if (err !== null) {
            console.log(err); //Llevar a pantalla de error cuando se tenga  
        } else {
            response.redirect("/index");
        }
    });
});

// Usuarios

app.post("/login", function(req, response){

    daoU.isUserCorrect(req.body.usuario, req.body.pass, function(err, userList){
        if (err !== null) {
            console.log(err); //Llevar a pantalla de error cuando se tenga  
        } 
        else if (userList.length !== 0){ //usuario y passwords correctos
            req.session.currentUser = req.body.usuario;
            req.session.errMsg = null;
            response.redirect("/index");
        }
        else {
            response.render('login', {errorMsg : "Dirección de correo y/o contraseña no válidos."});
        }
    });
    
});

app.get('/login', function(req, response){
    response.render('login', {errorMsg : null});
});

app.get('/logout', function(req, response){
    req.session.destroy();
    response.redirect("/login");
});

app.get('/imagenUsuario', function(req, response){
    daoU.getUserImageName(response.locals.userEmail, function(err, avatar){
        if (avatar[0].img === null){
            response.sendFile('public/images/noAvatar.png', { root: __dirname});
        }      
        else response.sendFile('profile_imgs/' + avatar[0].img, { root: __dirname});
    });
});

module.exports = app;