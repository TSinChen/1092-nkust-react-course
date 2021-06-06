import { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	TextField,
} from '@material-ui/core';

const states = [
	{
		value: 'taipei',
		label: 'Taipei',
	},
	{
		value: 'taichung',
		label: 'Taichung',
	},
	{
		value: 'kaohsiung',
		label: 'Kaohsiung',
	},
];

const AccountProfileDetails = (props) => {
	const [user, setUser] = useState();

	const handleChange = (event) => {
		setUser({
			...user,
			[event.target.name]: event.target.value,
		});
	};

	useEffect(() => {
		const getUser = async () => {
			const empId = localStorage.getItem('employeeID');
			const res = await axios.get(`/employees/${empId}`);
			setUser(res.data[0]);
		};
		getUser();
	}, []);

	if (user) {
		return (
			<form autoComplete="off" noValidate {...props}>
				<Card>
					<CardHeader
						subheader="The information can be edited"
						title="Profile"
					/>
					<Divider />
					<CardContent>
						<Grid container spacing={3}>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label="Employee ID"
									name="EmpId"
									required
									value={user.EmpId}
									variant="outlined"
									placeholder={user.EmpId}
									disabled
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label="Name"
									name="EmpName"
									required
									value={user.EmpName}
									variant="outlined"
									placeholder={user.EmpName}
									onChange={handleChange}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label="Job Title"
									name="JobTitle"
									required
									value={user.JobTitle}
									variant="outlined"
									placeholder={user.JobTitle}
									onChange={handleChange}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label="Phone Number"
									name="Phone"
									required
									value={user.Phone}
									variant="outlined"
									placeholder={user.Phone}
									onChange={handleChange}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label="Select City"
									name="City"
									required
									select
									SelectProps={{ native: true }}
									value={user.City}
									variant="outlined"
									onChange={handleChange}
								>
									{states.map((option) => (
										<option
											key={option.value}
											value={option.value}
										>
											{option.label}
										</option>
									))}
								</TextField>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label="Address"
									name="Address"
									required
									value={user.Address}
									variant="outlined"
									placeholder={user.Address}
									onChange={handleChange}
								/>
							</Grid>
						</Grid>
					</CardContent>
					<Divider />
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'flex-end',
							p: 2,
						}}
					>
						<Button color="primary" variant="contained">
							Save details
						</Button>
					</Box>
				</Card>
			</form>
		);
	}
	return '';
};

export default AccountProfileDetails;
