import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import {
	Box,
	Container,
	TableRow,
	TableCell,
	Input,
	Checkbox,
} from '@material-ui/core';
import ListToolbar from 'src/components/list/ListToolbar';
import ListResults from 'src/components/list/ListResults';

import * as constants from '../apis/constants';
import Buttons from 'src/components/list/buttons/Buttons';

const OrderDetail = () => {
	const { oid } = useParams();
	const [orderDetail, setOrderDetail] = useState([]);
	const [adding, setAdding] = useState(false);
	const [addData, setAddData] = useState({});
	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		const getDetail = async () => {
			const res_currentOrder = await axios.get(
				constants.URL + '/orderDetails/' + oid
			);
			setOrderDetail(res_currentOrder.data);

			const res_allOrders = await axios.get(
				constants.URL + '/orderDetails'
			);
			if (res_allOrders.data) {
				setAddData({
					...addData,
					seq:
						res_allOrders.data[res_allOrders.data.length - 1].seq +
						1,
					OrderId: oid,
				});
			}
		};
		getDetail();
	}, []);

	const handleAdd = () => {
		setAdding(true);
	};

	const handlePost = async () => {
		setAdding(false);
		await axios.post(constants.URL + '/orderDetails', null, {
			params: addData,
		});
		window.location.reload();
	};

	const handleCancel = () => {
		setAdding(false);
		setAddData({});
	};

	const onSearchQueryChange = (value) => {
		setSearchQuery(value);
	};

	const showAdd = () => {
		return (
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox checked={false} value="true" disabled />
				</TableCell>
				<TableCell>{oid}</TableCell>
				<TableCell>
					<Input
						style={{ width: '100%' }}
						placeholder={'Product ID here...'}
						value={addData.ProdId}
						onChange={(e) => {
							setAddData({
								...addData,
								ProdId: e.target.value,
							});
						}}
					/>
				</TableCell>
				<TableCell>
					<Input
						type="number"
						style={{ width: '100%' }}
						placeholder={'Quantity here...'}
						value={addData.Qty}
						onChange={(e) => {
							setAddData({
								...addData,
								Qty: e.target.value,
							});
						}}
					/>
				</TableCell>
				<TableCell>
					<Input
						type="number"
						style={{ width: '100%' }}
						placeholder={'Discount here...'}
						value={addData.Discount}
						onChange={(e) => {
							setAddData({
								...addData,
								Discount: e.target.value,
							});
						}}
					/>
				</TableCell>
				<Buttons
					adding={adding}
					handlePost={handlePost}
					handleCancel={handleCancel}
				/>
			</TableRow>
		);
	};

	return (
		<>
			<Helmet>
				<title>Order Detail | Material Kit</title>
			</Helmet>
			<Box
				sx={{
					backgroundColor: 'background.default',
					minHeight: '100%',
					py: 3,
				}}
			>
				<Container maxWidth={false}>
					<ListToolbar
						type="detail"
						handleAdd={handleAdd}
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
					/>
					<Box sx={{ pt: 3 }}>
						<ListResults
							type="detail"
							data={orderDetail}
							cells={['OrderId', 'ProdId', 'Qty', 'Discount']}
							searchQuery={searchQuery}
						>
							{adding ? showAdd() : ''}
						</ListResults>
					</Box>
				</Container>
			</Box>
		</>
	);
};

export default OrderDetail;
