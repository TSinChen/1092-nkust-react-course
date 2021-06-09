import { Fragment } from 'react';
import { Search as SearchIcon } from 'react-feather';
import {
	Box,
	Button,
	Card,
	CardContent,
	TextField,
	InputAdornment,
	SvgIcon,
} from '@material-ui/core';

const ListToolbar = ({ type, handleAdd, searchQuery, setSearchQuery }) => {
	const setPlaceholder = (type) => {
		switch (type) {
			case 'customer':
				return `Customer Name or Customer ID`;
			case 'product':
				return `Product Name or Product ID`;
			case 'order':
				return `Order ID or Employee ID or Customer ID`;
			case 'detail':
				return `Product ID`;
			default:
				return '';
		}
	};

	return (
		<Fragment>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'flex-end',
				}}
			>
				<Button>Import</Button>
				<Button sx={{ mx: 1 }}>Export</Button>
				<Button color="primary" variant="contained" onClick={handleAdd}>
					{`add ${type}`}
				</Button>
			</Box>
			<Box sx={{ mt: 3 }}>
				<Card>
					<CardContent>
						<Box sx={{ maxWidth: 500 }}>
							<TextField
								fullWidth
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<SvgIcon
												fontSize="small"
												color="action"
											>
												<SearchIcon />
											</SvgIcon>
										</InputAdornment>
									),
								}}
								placeholder={`Search ${setPlaceholder(type)}`}
								variant="outlined"
								value={searchQuery}
								onChange={(e) => {
									setSearchQuery(e.target.value);
								}}
							/>
						</Box>
					</CardContent>
				</Card>
			</Box>
		</Fragment>
	);
};

export default ListToolbar;
