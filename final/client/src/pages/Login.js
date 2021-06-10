import { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Formik } from 'formik';
import {
	Box,
	Button,
	Container,
	Grid,
	Link,
	TextField,
	Typography,
} from '@material-ui/core';
import FacebookIcon from 'src/icons/Facebook';
import GoogleIcon from 'src/icons/Google';
import * as constants from '../apis/constants';

const Login = () => {
	const navigate = useNavigate();
	const [employeeID, setEmployeeID] = useState('');
	const [password, setPassword] = useState('');
	const { setUser } = useContext(UserContext);

	const handleSubmit = (employeeID) => {
		const getUser = async (id) => {
			const res = await axios.get(`${constants.URL}/employees/${id}`, {
				params: {
					password,
				},
			});
			if (res.data[0]) {
				setUser(res.data[0]);
				navigate('/app/account', { replace: true });
			} else {
				window.location.reload();
				alert(res.data.message);
			}
		};
		getUser(employeeID);
	};

	return (
		<>
			<Helmet>
				<title>Login | Material Kit</title>
			</Helmet>
			<Box
				sx={{
					backgroundColor: 'background.default',
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
					justifyContent: 'center',
				}}
			>
				<Container maxWidth="sm">
					<Formik
						initialValues={{
							email: '',
							password: '',
						}}
						onSubmit={() => {
							// localStorage.setItem('employeeID', employeeID);
							handleSubmit(employeeID);
						}}
					>
						{({
							errors,
							handleBlur,
							handleSubmit,
							isSubmitting,
							touched,
						}) => (
							<form onSubmit={handleSubmit}>
								<Box sx={{ mb: 3 }}>
									<Typography
										color="textPrimary"
										variant="h2"
									>
										Sign in
									</Typography>
									<Typography
										color="textSecondary"
										gutterBottom
										variant="body2"
									>
										Sign in on the internal platform
									</Typography>
								</Box>
								<Grid container spacing={3}>
									<Grid item xs={12} md={6}>
										<Button
											color="primary"
											fullWidth
											startIcon={<FacebookIcon />}
											onClick={handleSubmit}
											size="large"
											variant="contained"
										>
											Login with Facebook
										</Button>
									</Grid>
									<Grid item xs={12} md={6}>
										<Button
											fullWidth
											startIcon={<GoogleIcon />}
											onClick={handleSubmit}
											size="large"
											variant="contained"
										>
											Login with Google
										</Button>
									</Grid>
								</Grid>
								<Box
									sx={{
										pb: 1,
										pt: 3,
									}}
								>
									<Typography
										align="center"
										color="textSecondary"
										variant="body1"
									>
										or login with employee id
									</Typography>
								</Box>
								<TextField
									error={Boolean(
										touched.email && errors.email
									)}
									fullWidth
									helperText={touched.email && errors.email}
									label="Employee ID"
									margin="normal"
									name="email"
									onBlur={handleBlur}
									onChange={(e) => {
										setEmployeeID(e.target.value);
									}}
									type="text"
									value={employeeID}
									variant="outlined"
								/>
								<TextField
									error={Boolean(
										touched.password && errors.password
									)}
									fullWidth
									helperText={
										touched.password && errors.password
									}
									label="Password"
									margin="normal"
									name="password"
									onBlur={handleBlur}
									onChange={(e) => {
										setPassword(e.target.value);
									}}
									type="password"
									value={password}
									variant="outlined"
								/>
								<Box sx={{ py: 2 }}>
									<Button
										color="primary"
										disabled={isSubmitting}
										fullWidth
										size="large"
										type="submit"
										variant="contained"
									>
										Sign in now
									</Button>
								</Box>
								<Typography
									color="textSecondary"
									variant="body1"
								>
									Don&apos;t have an account?{' '}
									<Link
										component={RouterLink}
										to="/register"
										variant="h6"
									>
										Sign up
									</Link>
								</Typography>
							</form>
						)}
					</Formik>
				</Container>
			</Box>
		</>
	);
};

export default Login;
