import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Box, Container } from '@material-ui/core';
import ListToolbar from 'src/components/list/ListToolbar';
import ListResults from 'src/components/list/ListResults';

import * as constants from '../apis/constants';

const ProductList = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const getProducts = async () => {
			const res = await axios.get(constants.URL + '/products');
			setProducts(res.data);
		};
		getProducts();
	}, []);

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
					<ListToolbar type="product" />
					<Box sx={{ pt: 3 }}>
						<ListResults
							type="product"
							data={products}
							cells={['ProdName', 'ProdID', 'UnitPrice', 'Cost']}
						/>
					</Box>
				</Container>
			</Box>
		</>
	);
};

export default ProductList;
