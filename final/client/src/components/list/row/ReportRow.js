import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TableCell, TableRow } from '@material-ui/core';

import * as constants from '../../../apis/constants';

const ReportRow = ({ custId, orderIds, productMap }) => {
	const [customer, setCustomer] = useState({});
	const [totalSales, setTotalSales] = useState(0);
	const [totalProfit, setTotalProfit] = useState(0);
	const [details, setDetails] = useState('');

	useEffect(() => {
		const getCustomer = async (cid) => {
			const res = await axios.get(`${constants.URL}/customers/${cid}`);
			setCustomer(res.data[0]);
		};
		getCustomer(custId);
	}, [custId]);

	useEffect(() => {
		let arr = [];
		if (orderIds) {
			orderIds.forEach((oid) => {
				const getSalesOrders = async () => {
					const res = await axios.get(
						`${constants.URL}/orderDetails/${oid}`
					);
					arr = arr.concat(res.data);
					setDetails(arr);
				};
				getSalesOrders();
			});
		}
	}, [productMap, orderIds]);

	useEffect(() => {
		if (details) {
			let sales = 0;
			let profit = 0;

			details.forEach((detail) => {
				// console.log(detail);
				// console.log('產品：' + detail.ProdId);
				// console.log('單價：' + productMap.get(detail.ProdId).UnitPrice);
				// console.log('成本：' + productMap.get(detail.ProdId).Cost);
				// console.log('數量：' + detail.Qty);
				// console.log('折扣：' + detail.Discount);
				if (productMap.get(detail.ProdId)) {
					sales =
						sales +
						productMap.get(detail.ProdId).UnitPrice *
							detail.Discount *
							detail.Qty;
					profit =
						profit +
						(productMap.get(detail.ProdId).UnitPrice *
							detail.Discount -
							productMap.get(detail.ProdId).Cost) *
							detail.Qty;
					// console.log('銷售額：' + sales);
					// console.log('利潤：' + profit);
				}
			});
			setTotalSales(sales);
			setTotalProfit(profit);
		}
	}, [details, productMap]);

	return (
		<TableRow hover>
			<TableCell>{customer ? customer.CustName : ''}</TableCell>
			<TableCell>{customer ? customer.CustId : ''}</TableCell>
			<TableCell>{totalSales}</TableCell>
			<TableCell>{totalProfit}</TableCell>
		</TableRow>
	);
};

export default ReportRow;
