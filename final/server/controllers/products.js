import mysql from 'mysql';

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'mmisdb',
});

export const getProducts = async (req, res) => {
	const sql = 'SELECT * FROM product';
	const query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.status(200).json(result);
	});
};

export const postProduct = async (req, res) => {
	const sql = 'INSERT INTO product SET ?';
	const newProduct = req.query;
	const query = db.query(sql, newProduct, (err, result) => {
		if (err) throw err;
		res.status(201).json(newProduct);
	});
};

export const getProduct = async (req, res) => {
	const { pid } = req.params;

	const sql = `SELECT * FROM product WHERE ProdID = '${pid}'`;
	const query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.status(200).json(result);
	});
};

export const patchProduct = async (req, res) => {
	const { pid } = req.params;
	const { ProdName, UnitPrice, Cost } = req.query;

	const sql = `UPDATE product SET ProdName = '${ProdName}', UnitPrice = ${UnitPrice}, Cost = ${Cost} WHERE ProdID = '${pid}'`;
	const query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.json(result);
	});
};

export const deleteProduct = async (req, res) => {
	const { pid } = req.params;

	const sql = `DELETE FROM product WHERE ProdID = '${pid}'`;
	const query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.json(result);
	});
};
