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
import { dateFormat } from '../../../helpers/dateFormat';

const SalesOrderRow = ({
	item,
	selectedDataIds,
	handleSelectOne,
	type,
	editingItems,
	handleEdit,
	handleSubmit,
	handleDelete,
	handleNavigation,
}) => {
	const [newData, setNewData] = useState(item);
	const [editing, setEditing] = useState(false);
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		const isEditing = editingItems.find((id) => {
			return id === item.OrderId;
		});
		isEditing ? setEditing(true) : setEditing(false);
	}, [editingItems]);

	const updateNewData = async (newData) => {
		await axios.patch(
			`${constants.URL}/salesOrders/${newData.OrderId}`,
			null,
			{
				params: newData,
			}
		);
	};

	const deleteData = async (id) => {
		await axios.delete(`${constants.URL}/salesOrders/${id}`);
	};

	return (
		<TableRow
			hover
			key={item.OrderId}
			selected={selectedDataIds.indexOf(item.OrderId) !== -1}
		>
			<TableCell
				padding="checkbox"
				style={{ cursor: 'pointer' }}
				onClick={() => handleNavigation(item.OrderId)}
			>
				<Checkbox
					checked={selectedDataIds.indexOf(item.OrderId) !== -1}
					onChange={(event) => handleSelectOne(event, item.OrderId)}
					value="true"
					onClick={(e) => {
						e.stopPropagation();
					}}
				/>
			</TableCell>
			<TableCell
				style={{ cursor: 'pointer' }}
				onClick={() => handleNavigation(item.OrderId)}
			>
				{item.OrderId}
			</TableCell>
			<TableCell
				style={{ cursor: 'pointer' }}
				onClick={() => handleNavigation(item.OrderId)}
			>
				{editing ? (
					<Input
						style={{ width: '100%' }}
						placeholder={item.EmpId}
						value={newData.EmpId}
						onChange={(e) => {
							setNewData({
								...newData,
								EmpId: e.target.value,
							});
						}}
						onClick={(e) => {
							e.stopPropagation();
						}}
					/>
				) : (
					newData.EmpId
				)}
			</TableCell>
			<TableCell
				style={{ cursor: 'pointer' }}
				onClick={() => handleNavigation(item.OrderId)}
			>
				{editing ? (
					<Input
						style={{ width: '100%' }}
						placeholder={item.CustId}
						value={newData.CustId}
						onChange={(e) => {
							setNewData({
								...newData,
								CustId: e.target.value,
							});
						}}
						onClick={(e) => {
							e.stopPropagation();
						}}
					/>
				) : (
					newData.CustId
				)}
			</TableCell>
			<TableCell
				style={{ cursor: 'pointer' }}
				onClick={() => handleNavigation(item.OrderId)}
			>
				{dateFormat(newData.OrderDate)}
			</TableCell>
			<Buttons
				type={type}
				editing={editing}
				handleEdit={() => handleEdit(item.OrderId)}
				handleSubmit={() => {
					handleSubmit(item.OrderId);
					updateNewData(newData);
				}}
				handleDelete={() => setDeleting(true)}
			/>
			<Dialog open={deleting} onClose={() => setDeleting(false)}>
				<Box component="div" m={2}>
					<Typography variant="h3" m={2}>
						DELETE <b>{item.CustName}</b> ?
					</Typography>
					<Box component="div" m={2}>
						<Button
							style={{
								marginRight: '30px',
							}}
							variant="contained"
							color="secondary"
							onClick={() => {
								handleDelete(item.OrderId);
								deleteData(item.OrderId);
								setDeleting(false);
								window.location.reload();
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
