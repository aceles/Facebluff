"use strict";

class DAOUsers {
    
    constructor(pool) { 
        this.poolBD = pool;
      }
    
    isUserCorrect(email, password, callback){ 
        this.poolBD.getConnection(function(err, con) {
            if (err) {
                callback("Error de conexión a la base de datos");
            } else {
                con.query("select * from user where email ='"+email+"' and password ='"+password+"'",function(err, rows) {
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
    
    getUserImageName(email, callback) {
        this.poolBD.getConnection(function(err, con) {
            if (err) {
                callback("Error de conexión a la base de datos");
            } else {
                con.query("select img from user where email ='"+email+"'",function(err, rows) {
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

module.exports = DAOUsers;