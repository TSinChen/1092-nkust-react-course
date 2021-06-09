import mysql from 'mysql';

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'mmisdb',
});

export const getEmployee = async (req, res) => {
	const { eid } = req.params;

	const sql = `SELECT * FROM employee WHERE EmpId = '${eid}'`;
	const query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.status(200).json(result);
	});
};
