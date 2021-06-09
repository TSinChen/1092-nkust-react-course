import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Box,
	Checkbox,
	TableCell,
	TableRow,
	Typography,
	Input,
	Dialog,
	Button,
} from '@material-ui/core';
import Buttons from '../buttons/Buttons';
import * as constants from '../../../apis/constants';

const SalesOrderRow = ({
	item,
	selectedDataIds,
	handleSelectOne,
	type,
	editingItems,
	handleEdit,
	handleCancelEdit,
}) => {
	const [newData, setNewData] = useState(item);
	const [editing, setEditing] = useState(false);
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		const isEditing = editingItems.find((id) => {
			return id === item.seq;
		});
		isEditing ? setEditing(true) : setEditing(false);
	}, [editingItems, item.seq]);

	const updateNewData = async (newData) => {
		await axios.patch(
			`${constants.URL}/orderDetails/${newData.seq}`,
			null,
			{
				params: newData,
			}
		);
	};

	const deleteData = async (seq) => {
		await axios.delete(`${constants.URL}/orderDetails/${seq}`);
		handleCancelEdit(seq);
		setDeleting(false);
		window.location.reload();
	};

	return (
		<TableRow
			hover
			key={item.seq}
			selected={selectedDataIds.indexOf(item.seq) !== -1}
		>
			<TableCell padding="checkbox">
				<Checkbox
					checked={selectedDataIds.indexOf(item.seq) !== -1}
					onChange={(event) => handleSelectOne(event, item.seq)}
					value="true"
				/>
			</TableCell>
			<TableCell>{item.OrderId}</TableCell>
			<TableCell>
				{editing ? (
					<Input
						style={{ width: '100%' }}
						placeholder={item.ProdId}
						value={newData.ProdId}
						onChange={(e) => {
							setNewData({
								...newData,
								ProdId: e.target.value,
							});
						}}
						onClick={(e) => {
							e.stopPropagation();
						}}
					/>
				) : (
					newData.ProdId
				)}
			</TableCell>
			<TableCell>
				{editing ? (
					<Input
						type="number"
						style={{ width: '100%' }}
						placeholder={item.Qty.toString()}
						value={newData.Qty}
						onChange={(e) => {
							setNewData({
								...newData,
								Qty: e.target.value,
							});
						}}
						onClick={(e) => {
							e.stopPropagation();
						}}
					/>
				) : (
					newData.Qty
				)}
			</TableCell>
			<TableCell>
				{editing ? (
					<Input
						type="number"
						style={{ width: '100%' }}
						placeholder={item.Discount.toString()}
						value={newData.Discount}
						onChange={(e) => {
							setNewData({
								...newData,
								Discount: e.target.value,
							});
						}}
						onClick={(e) => {
							e.stopPropagation();
						}}
					/>
				) : (
					newData.Discount
				)}
			</TableCell>
			<Buttons
				type={type}
				editing={editing}
				handleEdit={() => handleEdit(item.seq)}
				handleCancelEdit={() => handleCancelEdit(item.seq)}
				handleSubmit={() => {
					handleCancelEdit(item.seq);
					updateNewData(newData);
				}}
				handleDelete={() => setDeleting(true)}
			/>
			<Dialog open={deleting} onClose={() => setDeleting(false)}>
				<Box component="div" m={2}>
					<Typography variant="h3" m={2}>
						DELETE <b>{item.ProdId}</b> ?
					</Typography>
					<Box component="div" m={2}>
						<Button
							style={{
								marginRight: '30px',
							}}
							variant="contained"
							color="secondary"
							onClick={() => {
								deleteData(item.seq);
							}}
						>
							Delete
						</Button>
						<Button
							variant="contained"
							onClick={() => {
								setDeleting(false);
							}}
						>
							Cancel
						</Button>
					</Box>
				</Box>
			</Dialog>
		</TableRow>
	);
};

export default SalesOrderRow;
