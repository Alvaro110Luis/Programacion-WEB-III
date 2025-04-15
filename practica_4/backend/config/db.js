import mysql from "mysql2";
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_tienda_product",
}).promise();
export default pool;
