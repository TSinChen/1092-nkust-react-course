import mysql from 'mysql';

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'mmisdb',
});

export const getOrderDetails = async (req, res) => {
	const sql = 'SELECT * FROM orderdetail';

	const query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.status(201).json(result);
	});
};

export const postOrderDetail = async (req, res) => {
	const sql = 'INSERT INTO orderdetail SET ?';
	const newDetail = req.query;

	const query = db.query(sql, newDetail, (err, result) => {
		if (err) throw err;
		res.status(201).json(newDetail);
	});
};

export const getOrderDetail = async (req, res) => {
	const { oid } = req.params;

	const sql = `SELECT * FROM orderDetail WHERE OrderId = ${oid}`;
	const query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.status(200).json(result);
	});
};

export const patchOrderDetail = async (req, res) => {
	const { seq } = req.params;
	const { ProdId, Qty, Discount } = req.query;

	const sql = `UPDATE orderdetail SET ProdId = '${ProdId}', Qty = ${Qty}, Discount = ${Discount} WHERE seq = '${seq}'`;

	const query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.json(result);
	});
};

export const deleteOrderDetail = async (req, res) => {
	const { seq } = req.params;

	const sql = `DELETE FROM orderdetail WHERE seq = ${seq}`;
	const query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.json(result);
	});
};
