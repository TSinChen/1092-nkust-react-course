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
} from '@material-ui/core';
import ProductRow from './row/ProductRow';
import CustomerRow from './row/CustomerRow';
import SalesOrderRow from './row/SalesOrderRow';
import OrderDetailRow from './row/OrderDetailRow';

const ListResults = ({ type, data, cells, children, searchQuery, ...rest }) => {
	const navigate = useNavigate();
	const [selectedDataIds, setSelectedDataIds] = useState([]);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(0);
	const [editingItems, setEditingItems] = useState([]);

	const handleSelectAll = (event) => {
		let newSelectedDataIds;

		if (event.target.checked) {
			switch (type) {
				case 'product':
					newSelectedDataIds = data.map((item) => item.ProdID);
					break;
				case 'customer':
					newSelectedDataIds = data.map((item) => item.CustId);
					break;
				case 'salesOrder':
					newSelectedDataIds = data.map((item) => item.OrderId);
					break;
				case 'detail':
					newSelectedDataIds = data.map((item) => item.seq);
					break;
				default:
					break;
			}
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

	const handleCancelEdit = (id) => {
		setEditingItems([
			...editingItems.filter((itemId) => {
				return id !== itemId;
			}),
		]);
	};

	const setTableBody = () => {
		switch (type) {
			case 'customer':
				return (
					<TableBody>
						{data
							.filter((item) => {
								return (
									item.CustName.includes(searchQuery) ||
									item.CustId.includes(searchQuery)
								);
							})
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
									handleCancelEdit={handleCancelEdit}
								/>
							))}
					</TableBody>
				);
			case 'product':
				return (
					<TableBody>
						{data
							.filter((item) => {
								return (
									item.ProdName.includes(searchQuery) ||
									item.ProdID.includes(searchQuery)
								);
							})
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
									handleCancelEdit={handleCancelEdit}
								/>
							))}
					</TableBody>
				);
			case 'salesOrder':
				return (
					<TableBody>
						{data
							.filter((item) => {
								return (
									item.OrderId.includes(searchQuery) ||
									item.EmpId.includes(searchQuery) ||
									item.CustId.includes(searchQuery)
								);
							})
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
									handleCancelEdit={handleCancelEdit}
									handleNavigation={handleNavigation}
								/>
							))}
					</TableBody>
				);
			case 'detail':
				return (
					<TableBody>
						{data
							.filter((item) => {
								return (
									item.ProdId.includes(searchQuery)
								);
							})
							.slice(page * limit, (page + 1) * limit)
							.map((item) => (
								<OrderDetailRow
									key={item.seq}
									item={item}
									selectedDataIds={selectedDataIds}
									handleSelectOne={handleSelectOne}
									type={type}
									editingItems={editingItems}
									handleEdit={handleEdit}
									handleCancelEdit={handleCancelEdit}
									handleNavigation={handleNavigation}
								/>
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
						{children}
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
