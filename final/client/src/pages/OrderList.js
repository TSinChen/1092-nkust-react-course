import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Box, Container } from '@material-ui/core';
import ListToolbar from 'src/components/list/ListToolbar';
import ListResults from 'src/components/list/ListResults';

import * as constants from '../apis/constants';

const OrderList = () => {
	const [employeeID, setEmployeeID] = useState();
	const [salesOrders, setSalesOrders] = useState([]);

	useEffect(() => {
		const empId = localStorage.getItem('employeeID');
		setEmployeeID(empId);

		if (empId) {
			const getSalesOrder = async () => {
				const res = await axios.get(constants.URL + '/salesOrders');
				setSalesOrders(res.data);
			};
			getSalesOrder();
		}
	}, []);

	return (
		<>
			<Helmet>
				<title>Orders | Material Kit</title>
			</Helmet>
			<Box
				sx={{
					backgroundColor: 'background.default',
					minHeight: '100%',
					py: 3,
				}}
			>
				<Container maxWidth={false}>
					<ListToolbar type="order" />
					<Box sx={{ pt: 3 }}>
						<ListResults
							type="salesOrder"
							data={salesOrders}
							cells={['OrderId', 'EmpId', 'CustId', 'OrderDate']}
						/>
					</Box>
				</Container>
			</Box>
		</>
	);
};

export default OrderList;
