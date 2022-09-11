const mysql = require("mysql");

const dbConn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    // database: ""  //
    database: process.env.DATABASE
});

dbConn.connect((err)=>{
    if(err) console.log(err);
    else console.log("Database connected successfully!!..");
})

module.exports = dbConn;
