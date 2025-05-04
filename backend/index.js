const pg = require('pg');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
const bcrypt = require('bcrypt');
require('dotenv').config();

const port=3000;

const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
    connectionTimeoutMillis: 5000
})

console.log("Connecting...:")

app.use(cors({origin: 'http://localhost:8080'}));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/authenticate/:username/:password', async (request, response) => {
    const username = request.params.username;
    const password = request.params.password;

    const query = 'SELECT * FROM users WHERE user_name = $1';
    pool.query(query, [username], async (error, results) => {
        if (error) throw error;
        
        if (results.rows.length === 0) {
            return response.status(401).json({ error: "User not found" });
        }

        const user = results.rows[0];
        
        const passwordMatches = await bcrypt.compare(password, user.password);
        
        if (!passwordMatches) {
            return response.status(401).json({ error: "Invalid credentials" });
        }

        delete user.password;
        response.status(200).json(user);
    });
      
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

