import { useState } from 'react';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
	Avatar,
	Box,
	Card,
	Checkbox,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';

const ListResults = ({ type, data, cells, ...rest }) => {
	const [selectedDataIds, setSelectedDataIds] = useState([]);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(0);

	const handleSelectAll = (event) => {
		let newSelectedDataIds;

		if (event.target.checked) {
			newSelectedDataIds = data.map((item) => item.ProdID);
		} else {
			newSelectedDataIds = [];
		}

		setSelectedDataIds(newSelectedDataIds);
	};

	const handleSelectOne = (event, id) => {
		const selectedIndex = selectedDataIds.indexOf(id);
		let newSelectedDataIds = [];

		if (selectedIndex === -1) {
			newSelectedDataIds = newSelectedDataIds.concat(selectedDataIds, id);
		} else if (selectedIndex === 0) {
			newSelectedDataIds = newSelectedDataIds.concat(
				selectedDataIds.slice(1)
			);
		} else if (selectedIndex === selectedDataIds.length - 1) {
			newSelectedDataIds = newSelectedDataIds.concat(
				selectedDataIds.slice(0, -1)
			);
		} else if (selectedIndex > 0) {
			newSelectedDataIds = newSelectedDataIds.concat(
				selectedDataIds.slice(0, selectedIndex),
				selectedDataIds.slice(selectedIndex + 1)
			);
		}

		setSelectedDataIds(newSelectedDataIds);
	};

	const handleLimitChange = (event) => {
		setLimit(event.target.value);
	};

	const handlePageChange = (event, newPage = page + 1) => {
		setPage(newPage);
	};

	const setTableBody = () => {
		switch (type) {
			case 'product':
				return (
					<TableBody>
						{data
							.slice(page * limit, (page + 1) * limit)
							.map((item) => (
								<TableRow
									hover
									key={item.ProdID}
									selected={
										selectedDataIds.indexOf(item.ProdID) !==
										-1
									}
								>
									<TableCell padding="checkbox">
										<Checkbox
											checked={
												selectedDataIds.indexOf(
													item.ProdID
												) !== -1
											}
											onChange={(event) =>
												handleSelectOne(
													event,
													item.ProdID
												)
											}
											value="true"
										/>
									</TableCell>
									<TableCell>
										<Box
											sx={{
												alignItems: 'center',
												display: 'flex',
											}}
										>
											<Typography
												color="textPrimary"
												variant="body1"
											>
												{item.ProdName}
											</Typography>
										</Box>
									</TableCell>
									<TableCell>{item.ProdID}</TableCell>
									<TableCell>{item.UnitPrice}</TableCell>
									<TableCell>{item.Cost}</TableCell>
								</TableRow>
							))}
					</TableBody>
				);
			case 'customer':
				return (
					<TableBody>
						{data
							.slice(page * limit, (page + 1) * limit)
							.map((item) => (
								<TableRow
									hover
									key={item.ProdID}
									selected={
										selectedDataIds.indexOf(item.ProdID) !==
										-1
									}
								>
									<TableCell padding="checkbox">
										<Checkbox
											checked={
												selectedDataIds.indexOf(
													item.ProdID
												) !== -1
											}
											onChange={(event) =>
												handleSelectOne(
													event,
													item.ProdID
												)
											}
											value="true"
										/>
									</TableCell>
									<TableCell>
										<Box
											sx={{
												alignItems: 'center',
												display: 'flex',
											}}
										>
											<Typography
												color="textPrimary"
												variant="body1"
											>
												{item.ProdName}
											</Typography>
										</Box>
									</TableCell>
									<TableCell>{item.ProdID}</TableCell>
									<TableCell>{item.UnitPrice}</TableCell>
									<TableCell>{item.Cost}</TableCell>
								</TableRow>
							))}
					</TableBody>
				);
			default:
				return;
		}
	};

	return (
		<Card {...rest}>
			<PerfectScrollbar>
				<Box sx={{ minWidth: 1050 }}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell padding="checkbox">
									<Checkbox
										checked={
											selectedDataIds.length ===
											data.length
										}
										color="primary"
										indeterminate={
											selectedDataIds.length > 0 &&
											selectedDataIds.length < data.length
										}
										onChange={handleSelectAll}
									/>
								</TableCell>
								{cells.map((cell, index) => {
									return (
										<TableCell key={index}>
											{cell}
										</TableCell>
									);
								})}
							</TableRow>
						</TableHead>
						{setTableBody()}
					</Table>
				</Box>
			</PerfectScrollbar>
			<TablePagination
				component="div"
				count={data.length}
				onPageChange={handlePageChange}
				onRowsPerPageChange={handleLimitChange}
				page={page}
				rowsPerPage={limit}
				rowsPerPageOptions={[5, 10, 25]}
			/>
		</Card>
	);
};

export default ListResults;
