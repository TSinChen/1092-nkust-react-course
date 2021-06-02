import React from 'react';
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Container,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';

const Navbar = () => {
	return (
		<AppBar color="secondary">
			<Container maxWidth="md">
				<Toolbar>
					<IconButton>
						<Menu />
					</IconButton>
					<Typography variant="h6">MUI Themeing</Typography>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Navbar;
