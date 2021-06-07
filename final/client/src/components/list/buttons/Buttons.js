import { Fragment } from 'react';
import { Button, TableCell } from '@material-ui/core';

const Buttons = ({
	editing,
	handleEdit,
	handleSubmit,
	handleDelete,
	adding,
	handlePost,
	handleCancel,
}) => {
	if (adding) {
		return (
			<Fragment>
				<TableCell align="center">
					<Button variant="contained" onClick={handlePost}>
						Add
					</Button>
				</TableCell>
				<TableCell align="center">
					<Button
						variant="contained"
						color="secondary"
						onClick={handleCancel}
					>
						Cancel
					</Button>
				</TableCell>
			</Fragment>
		);
	}

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
