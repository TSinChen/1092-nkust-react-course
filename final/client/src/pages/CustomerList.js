import React, { useState, useEffect } from 'react';
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

const CustomerList = () => {
	const [customers, setCustomers] = useState([]);
	const [adding, setAdding] = useState(false);
	const [addData, setAddData] = useState({
		CustName: '',
		CustId: '',
		City: '',
		Address: '',
		ZipCode: '',
		Contact: '',
		JobTitle: '',
		Phone: '',
		Industry: '',
		TaxNo: '',
	});
	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		const getCustomers = async () => {
			const res = await axios.get(constants.URL + '/customers');
			setCustomers(res.data);
		};
		getCustomers();
	}, []);

	const handleAdd = () => {
		setAdding(true);
	};

	const handlePost = async () => {
		setAdding(false);
		await axios.post(constants.URL + '/customers', null, {
			params: addData,
		});
		window.location.reload();
	};

	const handleCancel = () => {
		setAdding(false);
		setAddData({
			CustName: '',
			CustId: '',
			City: '',
			Address: '',
			ZipCode: '',
			Contact: '',
			JobTitle: '',
			Phone: '',
			Industry: '',
			TaxNo: '',
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
						placeholder={'Customer Name here...'}
						value={addData.CustName}
						onChange={(e) => {
							setAddData({
								...addData,
								CustName: e.target.value,
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
						placeholder={'City here...'}
						value={addData.City}
						onChange={(e) => {
							setAddData({
								...addData,
								City: e.target.value,
							});
						}}
					/>
				</TableCell>
				<TableCell>
					<Input
						style={{ width: '100%' }}
						placeholder={'Address here...'}
						value={addData.Address}
						onChange={(e) => {
							setAddData({
								...addData,
								Address: e.target.value,
							});
						}}
					/>
				</TableCell>
				<TableCell>
					<Input
						style={{ width: '100%' }}
						placeholder={'Zip Code here...'}
						value={addData.ZipCode}
						onChange={(e) => {
							setAddData({
								...addData,
								ZipCode: e.target.value,
							});
						}}
					/>
				</TableCell>
				<TableCell>
					<Input
						style={{ width: '100%' }}
						placeholder={'Contact Information here...'}
						value={addData.Contact}
						onChange={(e) => {
							setAddData({
								...addData,
								Contact: e.target.value,
							});
						}}
					/>
				</TableCell>
				<TableCell>
					<Input
						style={{ width: '100%' }}
						placeholder={'Job Title here...'}
						value={addData.JobTitle}
						onChange={(e) => {
							setAddData({
								...addData,
								JobTitle: e.target.value,
							});
						}}
					/>
				</TableCell>
				<TableCell>
					<Input
						style={{ width: '100%' }}
						placeholder={'Phone Number here...'}
						value={addData.Phone}
						onChange={(e) => {
							setAddData({
								...addData,
								Phone: e.target.value,
							});
						}}
					/>
				</TableCell>
				<TableCell>
					<Input
						style={{ width: '100%' }}
						placeholder={'Industry here...'}
						value={addData.Industry}
						onChange={(e) => {
							setAddData({
								...addData,
								Industry: e.target.value,
							});
						}}
					/>
				</TableCell>
				<TableCell>
					<Input
						style={{ width: '100%' }}
						placeholder={'Tax Number here...'}
						value={addData.TaxNo}
						onChange={(e) => {
							setAddData({
								...addData,
								TaxNo: e.target.value,
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
				<title>Customers | Material Kit</title>
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
						type="customer"
						handleAdd={handleAdd}
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
					/>
					<Box sx={{ pt: 3 }}>
						<ListResults
							type="customer"
							data={customers}
							cells={[
								'CustName',
								'CustId',
								'City',
								'Address',
								'ZipCode',
								'Contact',
								'JobTitle',
								'Phone',
								'Industry',
								'TaxNo',
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

export default CustomerList;
