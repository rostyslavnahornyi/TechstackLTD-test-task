const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
client.connect();

router.get("/", (req, res) => {
    client.query("SELECT * FROM bikes;", (err, bikes) => {
        if (err) {
            console.log(err);
            res.status(404);
        } else res.json(bikes.rows).status(200);
    });
});

router.post("/", (req, res) => {
    const { name, type, price } = req.body;
    const sqlAddBike = `INSERT INTO bikes(name, type, price, rented) VALUES(\'${name}\',\'${type}\',\'${price}\', false);`;

    client.query(sqlAddBike, (err) => {
        if (err) {
            console.log(err);
            res.status(404);
        } else {
            res.status(200);
        }
    });
});

router.put("/:id", async (req, res) => {
    let error = false;
    const { id } = req.params;
    const sqlFindBike = `SELECT rented, price FROM bikes WHERE id_bike = ${id};`;
    const sqlGetSum = `SELECT value FROM total_sum;`;

    const bike = await client.query(sqlFindBike);
    const sum = await client.query(sqlGetSum);
    let { rented, price } = bike.rows[0];
    let { value } = sum.rows[0];

    if (rented) value -= +price;
    else value += +price;

    const sqlUpdateRentingBike = `UPDATE bikes SET rented = ${!rented} WHERE id_bike = ${id};`;
    const sqlUpdateSum = `UPDATE total_sum SET value = ${value};`;

    client.query(sqlUpdateRentingBike, (err) => {
        if (err) {
            console.log(err);
            error = true;
        };
    });
    client.query(sqlUpdateSum, (err) => {
        if (err) {
            console.log(err);
            error = true;
        };
    });
    error ? res.status(404) : res.status(200);
    client.query("SELECT name, rented, id_bike FROM bikes ORDER BY id_bike;", (err, bikes) => {
        console.log(bikes.rows)
    });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const sqlDeleteBike = `DELETE FROM bikes WHERE id_bike = ${id};`;

    client.query(sqlDeleteBike, (err) => {
        if (err) {
            console.log(err);
            res.status(404);
        } else res.status(200);
    });
});

module.exports = router;
