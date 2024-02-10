import express from "express"
const app= express()
const PORT= 3000
import {Pool} from "pg"
require('dotenv').config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

interface SslOptions  {
    require: boolean;
    // Add other SSL options if needed
}

const sslConfig: SslOptions = {
    require: true
    // Add other SSL options if needed
};
const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    require:true
  }
  
});

async function getPgVersion() {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT version()');
      console.log(result.rows[0]);
    } finally {
      client.release();
    }
  }
  getPgVersion();



app.get('/',(req,res)=>{
    res.send('hello world')
})




















app.listen(PORT,()=>{
    console.log("srver connected to port 3000")
})