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

const CustomerRow = ({
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
			return id === item.CustId;
		});
		isEditing ? setEditing(true) : setEditing(false);
	}, [editingItems]);

	const updateNewData = async (newData) => {
		await axios.patch(
			`${constants.URL}/customers/${newData.CustId}`,
			null,
			{
				params: newData,
			}
		);
	};

	const deleteData = async (id) => {
		await axios.delete(`${constants.URL}/customers/${id}`);
		handleCancelEdit(id);
		setDeleting(false);
		window.location.reload();
	};

	return (
		<TableRow
			hover
			key={item.CustId}
			selected={selectedDataIds.indexOf(item.CustId) !== -1}
		>
			<TableCell padding="checkbox">
				<Checkbox
					checked={selectedDataIds.indexOf(item.CustId) !== -1}
					onChange={(event) => handleSelectOne(event, item.CustId)}
					value="true"
				/>
			</TableCell>
			<TableCell>
				{editing ? (
					<Input
						style={{ width: '100%' }}
						placeholder={item.CustName}
						value={newData.CustName}
						onChange={(e) => {
							setNewData({
								...newData,
								CustName: e.target.value,
							});
						}}
					/>
				) : (
					newData.CustName
				)}
			</TableCell>
			<TableCell>{item.CustId}</TableCell>
			<TableCell>
				{editing ? (
					<Input
						style={{ width: '100%' }}
						placeholder={item.City}
						value={newData.City}
						onChange={(e) => {
							setNewData({
								...newData,
								City: e.target.value,
							});
						}}
					/>
				) : (
					newData.City
				)}
			</TableCell>
			<TableCell>
				{editing ? (
					<Input
						style={{ width: '100%' }}
						placeholder={item.Address}
						value={newData.Address}
						onChange={(e) => {
							setNewData({
								...newData,
								Address: e.target.value,
							});
						}}
					/>
				) : (
					newData.Address
				)}
			</TableCell>
			<TableCell>
				{editing ? (
					<Input
						style={{ width: '100%' }}
						placeholder={item.ZipCode}
						value={newData.ZipCode}
						onChange={(e) => {
							setNewData({
								...newData,
								ZipCode: e.target.value,
							});
						}}
					/>
				) : (
					newData.ZipCode
				)}
			</TableCell>
			<TableCell>
				{editing ? (
					<Input
						style={{ width: '100%' }}
						placeholder={item.Contact}
						value={newData.Contact}
						onChange={(e) => {
							setNewData({
								...newData,
								Contact: e.target.value,
							});
						}}
					/>
				) : (
					newData.Contact
				)}
			</TableCell>
			<TableCell>
				{editing ? (
					<Input
						style={{ width: '100%' }}
						placeholder={item.JobTitle}
						value={newData.JobTitle}
						onChange={(e) => {
							setNewData({
								...newData,
								JobTitle: e.target.value,
							});
						}}
					/>
				) : (
					newData.JobTitle
				)}
			</TableCell>
			<TableCell>
				{editing ? (
					<Input
						style={{ width: '100%' }}
						placeholder={item.Phone}
						value={newData.Phone}
						onChange={(e) => {
							setNewData({
								...newData,
								Phone: e.target.value,
							});
						}}
					/>
				) : (
					newData.Phone
				)}
			</TableCell>
			<TableCell>
				{editing ? (
					<Input
						style={{ width: '100%' }}
						placeholder={item.Industry}
						value={newData.Industry}
						onChange={(e) => {
							setNewData({
								...newData,
								Industry: e.target.value,
							});
						}}
					/>
				) : (
					newData.Industry
				)}
			</TableCell>
			<TableCell>
				{editing ? (
					<Input
						style={{ width: '100%' }}
						placeholder={item.TaxNo}
						value={newData.TaxNo}
						onChange={(e) => {
							setNewData({
								...newData,
								TaxNo: e.target.value,
							});
						}}
					/>
				) : (
					newData.TaxNo
				)}
			</TableCell>
			<Buttons
				type={type}
				editing={editing}
				handleEdit={() => handleEdit(item.CustId)}
				handleCancelEdit={() => handleCancelEdit(item.CustId)}
				handleSubmit={() => {
					handleCancelEdit(item.CustId);
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
								deleteData(item.CustId);
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

export default CustomerRow;
