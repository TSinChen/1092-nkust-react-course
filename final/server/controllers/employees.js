import db from '../db.js';

export const getEmployee = async (req, res) => {
	const { eid } = req.params;
	const { password } = req.query;

	const sql = `SELECT * FROM employee WHERE EmpId = '${eid}'`;
	db.query(sql, (err, result) => {
		if (err) throw err;
		if (password === result[0].Phone) {
			res.status(200).json(result);
		} else {
			res.status(200).json({ message: 'Login failed.' });
		}
	});
};
