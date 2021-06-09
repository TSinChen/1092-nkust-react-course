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

const ProductRow = ({
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
			return id === item.ProdID;
		});
		isEditing ? setEditing(true) : setEditing(false);
	}, [editingItems, item.ProdID]);

	const updateNewData = async (newData) => {
		await axios.patch(`${constants.URL}/products/${newData.ProdID}`, null, {
			params: newData,
		});
	};

	const deleteData = async (id) => {
		await axios.delete(`${constants.URL}/products/${id}`);
		handleCancelEdit(id);
		setDeleting(false);
		window.location.reload();
	};

	return (
		<TableRow
			hover
			key={item.ProdID}
			selected={selectedDataIds.indexOf(item.ProdID) !== -1}
		>
			<TableCell padding="checkbox">
				<Checkbox
					checked={selectedDataIds.indexOf(item.ProdID) !== -1}
					onChange={(event) => handleSelectOne(event, item.ProdID)}
					value="true"
				/>
			</TableCell>
			<TableCell>
				{editing ? (
					<Input
						style={{ width: '100%' }}
						placeholder={item.ProdName}
						value={newData.ProdName}
						onChange={(e) => {
							setNewData({
								...newData,
								ProdName: e.target.value,
							});
						}}
					/>
				) : (
					newData.ProdName
				)}
			</TableCell>
			<TableCell>{item.ProdID}</TableCell>
			<TableCell>
				{editing ? (
					<Input
						style={{ width: '100%' }}
						placeholder={item.UnitPrice.toString()}
						value={newData.UnitPrice}
						onChange={(e) => {
							setNewData({
								...newData,
								UnitPrice: e.target.value,
							});
						}}
					/>
				) : (
					newData.UnitPrice
				)}
			</TableCell>
			<TableCell>
				{editing ? (
					<Input
						style={{ width: '100%' }}
						placeholder={item.Cost.toString()}
						value={newData.Cost}
						onChange={(e) => {
							setNewData({
								...newData,
								Cost: e.target.value,
							});
						}}
					/>
				) : (
					newData.Cost
				)}
			</TableCell>
			<Buttons
				type={type}
				editing={editing}
				handleEdit={() => handleEdit(item.ProdID)}
				handleCancelEdit={() => handleCancelEdit(item.ProdID)}
				handleSubmit={() => {
					handleCancelEdit(item.ProdID);
					updateNewData(newData);
				}}
				handleDelete={() => setDeleting(true)}
			/>
			<Dialog open={deleting} onClose={() => setDeleting(false)}>
				<Box component="div" m={2}>
					<Typography variant="h3" m={2}>
						DELETE <b>{item.ProdID}</b> ?
					</Typography>
					<Box component="div" m={2}>
						<Button
							style={{
								marginRight: '30px',
							}}
							variant="contained"
							color="secondary"
							onClick={() => {
								deleteData(item.ProdID);
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

export default ProductRow;
