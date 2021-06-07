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

const ProductList = () => {
	const [products, setProducts] = useState([]);
	const [adding, setAdding] = useState(false);
	const [addData, setAddData] = useState({});

	useEffect(() => {
		const getProducts = async () => {
			const res = await axios.get(constants.URL + '/products');
			setProducts(res.data);
		};
		getProducts();
	}, []);

	const handleAdd = () => {
		setAdding(true);
	};

	const handlePost = async () => {
		setAdding(false);
		await axios.post(constants.URL + '/products', null, {
			params: addData,
		});
		window.location.reload();
	};

	const handleCancel = () => {
		setAdding(false);
		setAddData({});
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
						placeholder={'Product name here...'}
						value={addData.ProdName}
						onChange={(e) => {
							setAddData({
								...addData,
								ProdName: e.target.value,
							});
						}}
					/>
				</TableCell>
				<TableCell>
					<Input
						style={{ width: '100%' }}
						placeholder={'Product ID here...'}
						value={addData.ProdID}
						onChange={(e) => {
							setAddData({
								...addData,
								ProdID: e.target.value,
							});
						}}
					/>
				</TableCell>
				<TableCell>
					<Input
						type="number"
						style={{ width: '100%' }}
						placeholder={'Unit Price here...'}
						value={addData.UnitPrice}
						onChange={(e) => {
							setAddData({
								...addData,
								UnitPrice: e.target.value,
							});
						}}
					/>
				</TableCell>
				<TableCell>
					<Input
						type="number"
						style={{ width: '100%' }}
						placeholder={'Cost here...'}
						value={addData.Cost}
						onChange={(e) => {
							setAddData({
								...addData,
								Cost: e.target.value,
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
				<title>Products | Material Kit</title>
			</Helmet>
			<Box
				sx={{
					backgroundColor: 'background.default',
					minHeight: '100%',
					py: 3,
				}}
			>
				<Container maxWidth={false}>
					<ListToolbar type="product" handleAdd={handleAdd} />
					<Box sx={{ pt: 3 }}>
						<ListResults
							type="product"
							data={products}
							cells={['ProdName', 'ProdID', 'UnitPrice', 'Cost']}
						>
							{adding ? showAdd() : ''}
						</ListResults>
					</Box>
				</Container>
			</Box>
		</>
	);
};

export default ProductList;
