import { Fragment } from 'react';
import { Button, TableCell } from '@material-ui/core';

const Buttons = ({ type, editing, handleEdit, handleSubmit, handleDelete }) => {
	// const handleUpdate = () => {
	// 	switch (type) {
	// 		case 'product':
	// 			return;
	// 		case 'customer':
	// 			return;
	// 		default:
	// 			return;
	// 	}
	// };

	return (
		<Fragment>
			<TableCell align="center">
				{editing ? (
					<Button variant="contained" onClick={handleSubmit}>
						Submit
					</Button>
				) : (
					<Button variant="contained" onClick={handleEdit}>
						Edit
					</Button>
				)}
			</TableCell>
			<TableCell align="center">
				<Button
					variant="contained"
					color="secondary"
					onClick={handleDelete}
				>
					Delete
				</Button>
			</TableCell>
		</Fragment>
	);
};

export default Buttons;
