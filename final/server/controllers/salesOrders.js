import db from '../db.js';

export const getSalesOrders = async (req, res) => {
	const sql = `SELECT * FROM salesorder`;
	db.query(sql, (err, result) => {
		if (err) throw err;
		res.status(200).json(result);
	});
};

export const postSalesOrder = async (req, res) => {
	const newOrder = { ...req.query, OrderDate: new Date() };

	const sql = 'INSERT INTO salesorder SET ?';
	db.query(sql, newOrder, (err, result) => {
		if (err) throw err;
		res.status(201).json(newOrder);
	});
};

export const getSalesOrder = async (req, res) => {
	const { oid } = req.params;

	const sql = `SELECT * FROM salesorder WHERE OrderId = '${oid}'`;
	db.query(sql, (err, result) => {
		if (err) throw err;
		res.status(200).json(result);
	});
};

export const patchSalesOrder = async (req, res) => {
	const { oid } = req.params;
	const { EmpId, CustId, Descript } = req.query;
	const sql = `UPDATE salesorder SET EmpId = '${EmpId}', CustId = '${CustId}', Descript = '${Descript}' WHERE OrderId = '${oid}'`;
	db.query(sql, (err, result) => {
		if (err) throw err;
		res.json(result);
	});
};

export const deleteSalesOrder = async (req, res) => {
	const { oid } = req.params;

	const sql = `DELETE FROM salesorder WHERE OrderId = '${oid}'`;
	db.query(sql, (err, result) => {
		if (err) throw err;
		res.json(result);
	});
};
