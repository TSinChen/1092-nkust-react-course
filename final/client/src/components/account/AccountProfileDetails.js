import { useState, useEffect } from 'react';
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
	{ label: '臺北市' },
	{ label: '新北市' },
	{ label: '桃園市' },
	{ label: '臺中市' },
	{ label: '臺南市' },
	{ label: '高雄市' },
	{ label: '基隆市' },
	{ label: '新竹市' },
	{ label: '新竹縣' },
	{ label: '苗栗縣' },
	{ label: '彰化縣' },
	{ label: '南投縣' },
	{ label: '雲林縣' },
	{ label: '嘉義縣' },
	{ label: '嘉義市' },
	{ label: '屏東縣' },
	{ label: '宜蘭縣' },
	{ label: '花蓮縣' },
	{ label: '臺東縣' },
	{ label: '金門縣' },
	{ label: '澎湖縣' },
	{ label: '連江縣' },
];

const AccountProfileDetails = ({ user }) => {
	const [newUser, setNewUser] = useState({
		EmpId: '',
		EmpName: '',
		JobTitle: '',
		Phone: '',
		City: '',
		Address: '',
	});

	const handleChange = (event) => {
		setNewUser({
			...newUser,
			[event.target.name]: event.target.value,
		});
	};

	useEffect(() => {
		setNewUser(user);
	}, [user]);

	if (newUser) {
		return (
			<form autoComplete="off" noValidate>
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
									value={newUser.EmpId}
									variant="outlined"
									placeholder={newUser.EmpId}
									disabled
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label="Name"
									name="EmpName"
									required
									value={newUser.EmpName}
									variant="outlined"
									placeholder={newUser.EmpName}
									onChange={handleChange}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label="Job Title"
									name="JobTitle"
									required
									value={newUser.JobTitle}
									variant="outlined"
									placeholder={newUser.JobTitle}
									onChange={handleChange}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label="Phone Number"
									name="Phone"
									required
									value={newUser.Phone}
									variant="outlined"
									placeholder={newUser.Phone}
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
									variant="outlined"
									value={newUser.City}
									onChange={handleChange}
								>
									<option value={newUser.City}>
										{newUser.City}
									</option>
									{states.map((option) => (
										<option
											key={option.label}
											value={option.label}
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
									value={newUser.Address}
									variant="outlined"
									placeholder={newUser.Address}
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
