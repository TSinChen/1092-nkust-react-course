import {
	Box,
	Button,
	Card,
	CardContent,
	TextField,
	InputAdornment,
	SvgIcon,
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const ListToolbar = (props) => {
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
		<Box {...props}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'flex-end',
				}}
			>
				<Button>Import</Button>
				<Button sx={{ mx: 1 }}>Export</Button>
				<Button
					color="primary"
					variant="contained"
					onClick={props.handleAdd}
				>
					{`add ${props.type}`}
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
								placeholder={`Search ${setPlaceholder(
									props.type
								)}`}
								variant="outlined"
								value={props.searchQuery}
								onChange={(e) => {
									props.setSearchQuery(e.target.value);
								}}
							/>
						</Box>
					</CardContent>
				</Card>
			</Box>
		</Box>
	);
};

export default ListToolbar;
