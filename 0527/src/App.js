import React from 'react';
import {
	Button,
	ButtonGroup,
	Typography,
	makeStyles,
	ThemeProvider,
	createMuiTheme,
	Container,
	Grid,
	Paper,
} from '@material-ui/core';
import { Save, Delete } from '@material-ui/icons';
import { blue } from '@material-ui/core/colors';
import 'fontsource-roboto';

import './style.css';
import Navbar from './components/Navbar';
import CheckboxGroup from './components/CheckboxGroup';

const useStyle = makeStyles({
	root: {
		background: 'linear-gradient(45deg, #fe6b8b, #ff8e53)',
		border: 0,
		borderRadius: 15,
		color: 'white',
		marginBottom: 15,
		padding: '5px 30px',
	},
});

const theme = createMuiTheme({
	typography: {
		h1: {
			marginBottom: 5,
			fontSize: 36,
		},
		subtitle1: {
			marginBottom: 5,
		},
	},
	palette: {
		primary: {
			main: blue[500],
		},
	},
});

const ButtonStyled = () => {
	const classes = useStyle();
	return <Button className={classes.root}>Test Styled Button</Button>;
};

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<Container maxWidth="sm">
				<Navbar />
				<div className="container">
					<Typography variant="h1">Welcome to MUI</Typography>
					<Typography variant="subtitle1">
						Learn how to use Material UI
					</Typography>
					<ButtonStyled />
					<Grid container spacing={2} justify="center">
						<Grid item xs={12} lg={6}>
							<Paper style={{ height: 300 }} />
						</Grid>
						<Grid item xs={12} lg={6}>
							<Paper style={{ height: 300 }} />
						</Grid>
						<Grid item xs={12} lg={6}>
							<Paper style={{ height: 300 }} />
						</Grid>
						<Grid item xs={12} lg={6}>
							<Paper style={{ height: 300 }} />
						</Grid>
					</Grid>
					<CheckboxGroup />
					<ButtonGroup>
						<Button
							startIcon={<Save />}
							size="large"
							variant="contained"
							color="primary"
						>
							Save
						</Button>
						<Button
							startIcon={<Delete />}
							size="large"
							variant="contained"
							color="secondary"
						>
							Discard
						</Button>
					</ButtonGroup>
				</div>
			</Container>
		</ThemeProvider>
	);
};

export default App;
