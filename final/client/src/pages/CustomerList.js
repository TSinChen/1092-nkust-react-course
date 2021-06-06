import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import ListToolbar from 'src/components/list/ListToolbar';
import ListResults from 'src/components/list/ListResults';
import CustomerListResults from 'src/components/customer/CustomerListResults';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import customers from 'src/__mocks__/customers';

const CustomerList = () => (
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
				<ListToolbar type="customer" />
				<Box sx={{ pt: 3 }}>
					<ListResults
						type="customer"
						data={customers}
						cells={[
							'CustName',
							'CustID',
							'City',
							'Address',
							'ZipCode',
							'Contact',
							'JobTitle',
							'Phone',
							'Industry',
							'TaxNo',
						]}
					/>
					{/* <CustomerListResults customers={customers} /> */}
				</Box>
			</Container>
		</Box>
	</>
);

export default CustomerList;
