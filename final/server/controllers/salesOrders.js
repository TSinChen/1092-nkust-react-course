import mysql from 'mysql';

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'mmisdb',
});

export const getSalesOrders = async (req, res) => {
	const sql = `SELECT * FROM salesorder`;

	const query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.status(200).json(result);
	});
};

export const postSalesOrder = async (req, res) => {
	const sql = 'INSERT INTO salesorder SET ?';
	const newOrder = { ...req.query, OrderDate: new Date(), Descript: '' };

	const query = db.query(sql, newOrder, (err, result) => {
		if (err) throw err;
		res.status(201).json(newOrder);
	});
};

export const getSalesOrder = async (req, res) => {
	const { oid } = req.params;
	const sql = `SELECT * FROM salesorder WHERE OrderId = '${oid}'`;

	const query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.status(200).json(result);
	});
};

export const patchSalesOrder = async (req, res) => {
	const { oid } = req.params;
	const { EmpId, CustId } = req.query;

	const sql = `UPDATE salesorder SET EmpId = '${EmpId}', CustId = '${CustId}' WHERE OrderId = '${oid}'`;
	const query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.json(result);
	});
};

export const deleteSalesOrder = async (req, res) => {
	const { oid } = req.params;

	const sql = `DELETE FROM salesorder WHERE OrderId = '${oid}'`;
	const query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.json(result);
	});
};
