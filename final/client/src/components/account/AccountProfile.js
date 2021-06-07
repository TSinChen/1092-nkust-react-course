import { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	Typography,
} from '@material-ui/core';

const AccountProfile = (props) => {
	const [user, setUser] = useState({});

	useEffect(() => {
		const getUser = async () => {
			const empId = localStorage.getItem('employeeID');
			const res = await axios.get(`/employees/${empId}`);
			setUser(res.data[0]);
		};
		getUser();
	}, []);

	return (
		<Card {...props}>
			<CardContent>
				<Box
					sx={{
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<Avatar
						src={user.avatar}
						sx={{
							height: 100,
							width: 100,
						}}
					/>
					<Typography color="textPrimary" gutterBottom variant="h3">
						{user.EmpName}
					</Typography>
					<Typography color="textSecondary" variant="body1">
						{user.JobTitle}
					</Typography>
					<Typography color="textSecondary" variant="body1">
						{`${user.ZipCode} ${user.City}${user.Address}`}
					</Typography>
					<Typography color="textSecondary" variant="body1">
						{user.Phone}
					</Typography>
				</Box>
			</CardContent>
			<Divider />
			<CardActions>
				<Button color="primary" fullWidth variant="text">
					Upload picture
				</Button>
			</CardActions>
		</Card>
	);
};

export default AccountProfile;
