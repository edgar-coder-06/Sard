const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = 3000;

// PostgreSQL connection configuration
const pool = new Pool({
    host: "10.0.40.140",
    port: 5432,
    user: "postgres",
    password: "edgar321",
    database: "postgres2",
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to handle the percentage retrieval
app.post("/getPercentage", async (req, res) => {
    const { username } = req.body;

    try {
        const percentageResult = await pool.query("SELECT percentage FROM usernames WHERE username = $1", [username]);
        const requestsResult = await pool.query("SELECT requests FROM usernames WHERE username = $1", [username]);

        const percentage = percentageResult.rows[0]?.percentage || null;
        let requests = requestsResult.rows[0]?.requests || 0;

        requests += 1;

        await pool.query("UPDATE usernames SET requests = $1 WHERE username = $2", [requests, username]);

        res.json({
            percentage,
            status: `${requests} request(s) made.`,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
