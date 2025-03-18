
//enfoque basico de conexion
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testdb",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Conectado a la base de datos!!");
  connection.query("SELECT * FROM users", (err, results, fields) => {
    if (err) throw err;
    for(let i=0;i<=results.length-1;i++){
      console.log(results[i].email);
    }
  });
  connection.end();
});
//usando promesas
/* const mysql = require("mysql2/promise");

async function main() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "testdb",
    });
    console.log("Conectado a la base de datos");
    const [rows, fields] = await connection.execute("SELECT * FROM users");
    console.log("query results", rows);
    await connection.end();
  } catch (err) {
    console.log(err);
  }
}
main(); */
//usando el agrupamiento de conexiones
/* const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'testdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.query('SELECT * FROM users', (err, results, fields) => {
  if (err) throw err;
  console.log(results);
}); */
