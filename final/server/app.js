import express, { json } from 'express';
import mysql from 'mysql';
import cors from 'cors';

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
app.use(cors());

const PORT = process.env.PORT || 5000;

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

// /customers
app.get('/customers', (req, res) => {
	const sql = 'SELECT * FROM customer';
	const query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.status(200).json(result);
	});
});

// /customers/:cid
app.patch('/customers/:cid', (req, res) => {
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
});

app.delete('/customers/:cid', (req, res) => {
	const { cid } = req.params;

	const sql = `DELETE FROM customer WHERE CustId = '${cid}'`;
	const query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.json(result);
	});
});

// /salesOrders
app.get('/salesOrders', (req, res) => {
	const sql = `SELECT * FROM salesorder`;
	const query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.status(200).json(result);
	});
});

// /salesOrders/:oid
app.patch('/salesOrders/:oid', (req, res) => {
	const { oid } = req.params;
	const { EmpId, CustId } = req.query;

	const sql = `UPDATE salesorder SET EmpId = '${EmpId}', CustId = '${CustId}' WHERE OrderId = '${oid}'`;
	const query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.json(result);
	});
});

app.delete('/salesOrders/:oid', (req, res) => {
	const { oid } = req.params;

	const sql = `DELETE FROM salesorder WHERE OrderId = '${oid}'`;
	const query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.json(result);
	});
});

// /orderDetail/:oid
app.get('/orderDetails/:oid', (req, res) => {
	const { oid } = req.params;

	const sql = `SELECT * FROM orderDetail WHERE OrderId = ${oid}`;
	const query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.status(200).json(result);
	});
});

// // /salesOrders/:eid
// app.get('/salesOrders/:eid', (req, res) => {
// 	const { eid } = req.params;

// 	const sql = `SELECT * FROM salesorder WHERE EmpId = ${eid}`;
// 	const query = db.query(sql, (err, result) => {
// 		if (err) throw err;
// 		res.status(200).json(result);
// 	});
// });

// // /orderDetail/:oid
// app.get('/orderDetail/:oid', (req, res) => {
// 	const { oid } = req.params;

// 	const sql = `SELECT * FROM orderDetail WHERE OrderId = ${oid}`;
// 	const query = db.query(sql, (err, result) => {
// 		if (err) throw err;
// 		res.status(200).json(result);
// 	});
// });

// /employees/:eid
app.get('/employees/:eid', (req, res) => {
	const { eid } = req.params;
	const sql = `SELECT * FROM employee WHERE EmpId = '${eid}'`;
	const query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.status(200).json(result);
	});
});

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
