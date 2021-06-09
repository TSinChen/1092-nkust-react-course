import mysql from 'mysql';

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'mmisdb',
});

export const getCustomers = async (req, res) => {
	const sql = 'SELECT * FROM customer';
	const query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.status(200).json(result);
	});
};

export const postCustomer = async (req, res) => {
	const sql = 'INSERT INTO customer SET ?';
	const newCustomer = req.query;
	const query = db.query(sql, newCustomer, (err, result) => {
		if (err) throw err;
		res.status(201).json(newCustomer);
	});
};

export const getCustomer = async (req, res) => {
	const { cid } = req.params;
	const sql = `SELECT * FROM customer WHERE CustId = '${cid}'`;
	const query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.status(200).json(result);
	});
};

export const patchCustomer = async (req, res) => {
	const { cid } = req.params;
	const {
		CustName,
		City,
		Address,
		ZipCode,
		Contact,
		JobTitle,
		Phone,
		Industry,
		TaxNo,
	} = req.query;

	const sql = `UPDATE customer SET CustName = '${CustName}', City = '${City}', Address = '${Address}', ZipCode = '${ZipCode}', Contact = '${Contact}', JobTitle = '${JobTitle}', Phone = '${Phone}', Industry = '${Industry}', TaxNo = '${TaxNo}' WHERE CustId = '${cid}'`;
	const query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.json(result);
	});
};

export const deleteCustomer = async (req, res) => {
	const { cid } = req.params;

	const sql = `DELETE FROM customer WHERE CustId = '${cid}'`;
	const query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.json(result);
	});
};
