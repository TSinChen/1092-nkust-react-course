import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
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
import Buttons from './buttons/Buttons';
import ProductRow from './row/ProductRow';
import CustomerRow from './row/CustomerRow';
import SalesOrderRow from './row/SalesOrderRow';

const ListResults = ({ type, data, cells, ...rest }) => {
	const navigate = useNavigate();
	const [selectedDataIds, setSelectedDataIds] = useState([]);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(0);
	const [editingItems, setEditingItems] = useState([]);

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

	const handleNavigation = (id) => {
		navigate(`/app/orders/${id}`);
	};

	const handleEdit = (id) => {
		setEditingItems([...editingItems, id]);
	};

	const handleSubmit = (id) => {
		setEditingItems([
			...editingItems.filter((itemId) => {
				return id !== itemId;
			}),
		]);
	};

	const handleDelete = (id) => {
		setEditingItems([
			...editingItems.filter((itemId) => {
				return id !== itemId;
			}),
		]);
	};

	const setTableBody = () => {
		switch (type) {
			case 'product':
				return (
					<TableBody>
						{data
							.slice(page * limit, (page + 1) * limit)
							.map((item) => (
								<ProductRow
									key={item.ProdID}
									item={item}
									selectedDataIds={selectedDataIds}
									handleSelectOne={handleSelectOne}
									type={type}
									editingItems={editingItems}
									handleEdit={handleEdit}
									handleSubmit={handleSubmit}
									handleDelete={handleDelete}
								/>
							))}
					</TableBody>
				);
			case 'customer':
				return (
					<TableBody>
						{data
							.slice(page * limit, (page + 1) * limit)
							.map((item) => (
								<CustomerRow
									key={item.CustId}
									item={item}
									selectedDataIds={selectedDataIds}
									handleSelectOne={handleSelectOne}
									type={type}
									editingItems={editingItems}
									handleEdit={handleEdit}
									handleSubmit={handleSubmit}
									handleDelete={handleDelete}
								/>
							))}
					</TableBody>
				);
			case 'salesOrder':
				return (
					<TableBody>
						{data
							.slice(page * limit, (page + 1) * limit)
							.map((item) => (
								<SalesOrderRow
									key={item.OrderId}
									item={item}
									selectedDataIds={selectedDataIds}
									handleSelectOne={handleSelectOne}
									type={type}
									editingItems={editingItems}
									handleEdit={handleEdit}
									handleSubmit={handleSubmit}
									handleDelete={handleDelete}
									handleNavigation={handleNavigation}
								/>
							))}
					</TableBody>
				);
			case 'orderDetail':
				return (
					<TableBody>
						{data
							.slice(page * limit, (page + 1) * limit)
							.map((item) => (
								<TableRow
									hover
									key={item.seq}
									selected={
										selectedDataIds.indexOf(item.seq) !== -1
									}
								>
									<TableCell padding="checkbox">
										<Checkbox
											checked={
												selectedDataIds.indexOf(
													item.seq
												) !== -1
											}
											onChange={(event) =>
												handleSelectOne(event, item.seq)
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
												{item.OrderId}
											</Typography>
										</Box>
									</TableCell>
									<TableCell>{item.ProdId}</TableCell>
									<TableCell>{item.Qty}</TableCell>
									<TableCell>{item.Discount}</TableCell>
									<Buttons
										type={type}
										editingItems={editingItems.find(
											(id) => {
												return id === item.ProdId;
											}
										)}
										handleEditing={() =>
											handleEdit(item.ProdId)
										}
									/>
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
								<TableCell
									colSpan={2}
									align="center"
								></TableCell>
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
