import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
	Box,
	Container,
	TableRow,
	TableCell,
	Input,
	Card,
	Table,
	TableHead,
	TablePagination,
	CardContent,
	TableBody,
	Button,
} from '@material-ui/core';

import * as constants from '../apis/constants';
import ReportRow from '../components/list/row/ReportRow';

const Report = () => {
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(0);
	const [dateStart, setDateStart] = useState(0);
	const [dateEnd, setDateEnd] = useState(Date.now());
	const [productMap, setProductMap] = useState(new Map());
	const [salesOrders, setSalesOrders] = useState([]);
	const [showSalesOrders, setShowSalesOrders] = useState([]);
	const cells = ['CustName', 'CustId', 'TotalSales', 'TotalProfit'];

	const [map, setMap] = useState(new Map()); // CustName: [OrderIds]
	const [keys, setKeys] = useState([]);

	const handleLimitChange = (event) => {
		setLimit(event.target.value);
	};

	const handlePageChange = (event, newPage = page + 1) => {
		setPage(newPage);
	};

	useEffect(() => {
		const getOrders = async () => {
			const res = await axios.get(`${constants.URL}/salesOrders`);
			setSalesOrders(res.data);
			setShowSalesOrders(res.data);
		};
		getOrders();

		const getProducts = async () => {
			const res = await axios.get(`${constants.URL}/products`);
			res.data.forEach((product) => {
				setProductMap(
					productMap.set(product.ProdID, {
						UnitPrice: product.UnitPrice,
						Cost: product.Cost,
					})
				);
			});
		};
		getProducts();
	}, []);

	useEffect(() => {
		showSalesOrders.forEach((order) => {
			setMap(
				map.set(
					order.CustId,
					map.get(order.CustId)
						? [...map.get(order.CustId), order.OrderId]
						: [order.OrderId]
				)
			);
		});

		const arr_keys = [];
		for (const [key] of map.entries()) {
			arr_keys.push(key);
		}
		setKeys(arr_keys);
	}, [showSalesOrders]);

	const handleSubmit = () => {
		setMap(new Map());
		const searchDateStart = new Date(dateStart);
		const searchDateEnd = new Date(dateEnd);
		console.log(searchDateStart, searchDateEnd);

		const orders = salesOrders.filter((order) => {
			const date = new Date(order.OrderDate);
			return (
				date.getTime() > searchDateStart.getTime() - 86400000 &&
				date.getTime() < searchDateEnd.getTime()
			);
		});
		setShowSalesOrders(orders);
	};

	return (
		<>
			<Helmet>
				<title>Report | Material Kit</title>
			</Helmet>
			<Box
				sx={{
					backgroundColor: 'background.default',
					minHeight: '100%',
					py: 3,
				}}
			>
				<Container maxWidth={false}>
					<Box>
						<Box sx={{ mb: 3 }}>
							<Card>
								<CardContent>
									<Box sx={{ maxWidth: 600 }}>
										<Input
											sx={{ mr: 3 }}
											type="date"
											placeholder={`Search Report`}
											variant="outlined"
											value={dateStart}
											onChange={(e) => {
												setDateStart(e.target.value);
											}}
										/>
										<Input
											sx={{ mr: 3 }}
											type="date"
											placeholder={`Search Report`}
											variant="outlined"
											value={dateEnd}
											onChange={(e) => {
												setDateEnd(e.target.value);
											}}
										/>
										<Button
											color="primary"
											variant="contained"
											onClick={handleSubmit}
										>
											Submit
										</Button>
									</Box>
								</CardContent>
							</Card>
						</Box>
						<Card>
							<PerfectScrollbar>
								<Box sx={{ minWidth: 1050 }}>
									<Table>
										<TableHead>
											<TableRow>
												{cells.map((cell, index) => {
													return (
														<TableCell key={index}>
															{cell}
														</TableCell>
													);
												})}
											</TableRow>
										</TableHead>
										<TableBody>
											{keys
												.slice(
													page * limit,
													(page + 1) * limit
												)
												.map((key) => {
													return (
														<ReportRow
															key={key}
															custId={key}
															orderIds={map.get(
																key
															)}
															productMap={
																productMap
															}
														/>
													);
												})}
										</TableBody>
									</Table>
								</Box>
							</PerfectScrollbar>
							<TablePagination
								component="div"
								count={showSalesOrders.length}
								onPageChange={handlePageChange}
								onRowsPerPageChange={handleLimitChange}
								page={page}
								rowsPerPage={limit}
								rowsPerPageOptions={[5, 10, 25]}
							/>
						</Card>
					</Box>
				</Container>
			</Box>
		</>
	);
};

export default Report;
