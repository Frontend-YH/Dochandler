import mysql from 'mysql2';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST, 
  user: process.env.MYSQL_USER, 
  password: process.env.MYSQL_PASSWORD, 
  database: process.env.MYSQL_DATABASE, 
  port: process.env.MYSQL_PORT, 
});

// Function to query the database
export async function query({ query, values = [] }) {
  const dbconnection = pool.promise();
  try {
    const [rows, fields] = await dbconnection.execute(query, values);
    return rows; 
  } catch (error) {
    throw new Error(error.message);
  }
}

