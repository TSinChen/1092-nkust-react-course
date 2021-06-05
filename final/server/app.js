const express = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'mmisdb',
});

db.connect((err) => {
	if (err) {
		throw err;
	}

	console.log('MySql Connected...');
});

const app = express();

// /products
app.get('/products', (req, res) => {
	const sql = 'SELECT * FROM product';
	const query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.status(200).json(result);
	});
});

app.post('/products', (req, res) => {
	const sql = 'INSERT INTO product SET ?';
	const newProduct = req.query;

	const query = db.query(sql, newProduct, (err, result) => {
		if (err) throw err;
		res.status(201).json(newProduct);
	});
});

// /products/:pid
app.get('/products/:pid', (req, res) => {
	const { pid } = req.params;
	const sql = `SELECT * FROM product WHERE ProdID = '${pid}'`;
	const query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.status(200).json(result);
	});
});

app.patch('/products/:pid', (req, res) => {
	const { pid } = req.params;
	const { ProdName, UnitPrice, Cost } = req.query;

	const sql = `UPDATE product SET ProdName = '${ProdName}', UnitPrice = ${UnitPrice}, Cost = ${Cost} WHERE ProdID = '${pid}'`;
	const query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.json(result);
	});
});

app.delete('/products/:pid', (req, res) => {
	const { pid } = req.params;

	const sql = `DELETE FROM product WHERE ProdID = '${pid}'`;
	const query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.json(result);
	});
});

app.listen('5000', () => {
	console.log('Server started on port 5000');
});
