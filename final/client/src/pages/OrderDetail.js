import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Box, Container } from '@material-ui/core';
import ListToolbar from 'src/components/list/ListToolbar';
import ListResults from 'src/components/list/ListResults';

import * as constants from '../apis/constants';

const OrderDetail = () => {
	const [orderDetails, setOrderDetails] = useState([]);
	const { oid } = useParams();

	useEffect(() => {
		const getDetails = async () => {
			const res = await axios.get(constants.URL + '/orderDetails/' + oid);
			setOrderDetails(res.data);
		};
		getDetails();
	}, []);

	return (
		<>
			<Helmet>
				<title>Order Details | Material Kit</title>
			</Helmet>
			<Box
				sx={{
					backgroundColor: 'background.default',
					minHeight: '100%',
					py: 3,
				}}
			>
				<Container maxWidth={false}>
					<ListToolbar type="detail" />
					<Box sx={{ pt: 3 }}>
						<ListResults
							type="orderDetail"
							data={orderDetails}
							cells={['OrderId', 'ProdId', 'Qty', 'Discount']}
						/>
					</Box>
				</Container>
			</Box>
		</>
	);
};

export default OrderDetail;
