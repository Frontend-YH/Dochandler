import mysql from "mysql2/promise";

export async function dbQuery({sql, values}) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD
    });
    try {
        const [data] = await connection.query(sql, values);
        connection.end()
        return data 
    }catch(error) {
        console.log(error)
    }
}