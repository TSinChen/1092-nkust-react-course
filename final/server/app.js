import express, { json } from 'express';
import mysql from 'mysql';
import cors from 'cors';

import employeesRoutes from './routes/employees.js';
import productsRoutes from './routes/products.js';
import customersRoutes from './routes/customers.js';
import salesOrdersRoutes from './routes/salesOrders.js';
import orderDetailsRoutes from './routes/orderDetails.js';

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

app.use('/employees', employeesRoutes);
app.use('/products', productsRoutes);
app.use('/customers', customersRoutes);
app.use('/salesOrders', salesOrdersRoutes);
app.use('/orderDetails', orderDetailsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
