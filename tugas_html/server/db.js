import mysql from 'mysql2/promise'

export const db = mysql.createPool({
  host: 'localhost',
  port: 8111,            
  user: 'root',
  password: '170305', 
  database: 'todolist'        
})
