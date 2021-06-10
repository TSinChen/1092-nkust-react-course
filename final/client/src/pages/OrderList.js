import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
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

const OrderList = () => {
	const { user } = useContext(UserContext);
	const [salesOrders, setSalesOrders] = useState([]);
	const [adding, setAdding] = useState(false);
	const [addData, setAddData] = useState({
		OrderId: '',
		EmpId: user.EmpId,
		CustId: '',
		Descript: '',
	});
	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		const getSalesOrder = async () => {
			const res = await axios.get(constants.URL + '/salesOrders');
			setSalesOrders(res.data);
		};
		getSalesOrder();
	}, []);

	const handleAdd = () => {
		setAdding(true);
		setAddData({
			...addData,
			seq: salesOrders[salesOrders.length - 1].seq + 1,
		});
	};

	const handlePost = async () => {
		setAdding(false);
		await axios.post(constants.URL + '/salesOrders', null, {
			params: addData,
		});
		window.location.reload();
	};

	const handleCancel = () => {
		setAdding(false);
		setAddData({
			OrderId: '',
			CustId: '',
			Descript: '',
		});
	};

	const showAdd = () => {
		return (
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox checked={false} value="true" disabled />
				</TableCell>
				<TableCell>
					<Input
						style={{ width: '100%' }}
						placeholder={'Order ID here...'}
						value={addData.OrderId}
						onChange={(e) => {
							setAddData({
								...addData,
								OrderId: e.target.value,
							});
						}}
					/>
				</TableCell>
				<TableCell>
					<Input
						style={{ width: '100%' }}
						placeholder={'Employee ID here...'}
						value={addData.EmpId}
						onChange={(e) => {
							setAddData({
								...addData,
								EmpId: e.target.value,
							});
						}}
					/>
				</TableCell>
				<TableCell>
					<Input
						style={{ width: '100%' }}
						placeholder={'Customer ID here...'}
						value={addData.CustId}
						onChange={(e) => {
							setAddData({
								...addData,
								CustId: e.target.value,
							});
						}}
					/>
				</TableCell>
				<TableCell>
					<Input
						style={{ width: '100%' }}
						placeholder={'Date here...(Auto Generate)'}
						disabled
					/>
				</TableCell>
				<TableCell>
					<Input
						style={{ width: '100%' }}
						placeholder={'Descript here...'}
						value={addData.Descript}
						onChange={(e) => {
							setAddData({
								...addData,
								Descript: e.target.value,
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
					<ListToolbar
						type="order"
						handleAdd={handleAdd}
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
					/>
					<Box sx={{ pt: 3 }}>
						<ListResults
							type="salesOrder"
							data={salesOrders}
							cells={[
								'OrderId',
								'EmpId',
								'CustId',
								'OrderDate',
								'Descript',
							]}
							searchQuery={searchQuery}
						>
							{adding && showAdd()}
						</ListResults>
					</Box>
				</Container>
			</Box>
		</>
	);
};

export default OrderList;
