import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	Typography,
} from '@material-ui/core';

const AccountProfile = ({ user }) => {
	return (
		<Card>
			<CardContent>
				<Box
					sx={{
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<Avatar
						src={user.avatar}
						sx={{
							height: 100,
							width: 100,
							marginBottom: 1.5,
						}}
					/>
					<Typography color="textPrimary" gutterBottom variant="h3">
						{user.EmpName}
					</Typography>
					<Typography
						color="textSecondary"
						gutterBottom
						variant="body1"
					>
						{user.JobTitle}
					</Typography>
					<Typography
						color="textSecondary"
						gutterBottom
						variant="body1"
					>
						{`${user.ZipCode} ${user.City}${user.Address}`}
					</Typography>
					<Typography
						color="textSecondary"
						gutterBottom
						variant="body1"
					>
						{user.Phone}
					</Typography>
				</Box>
			</CardContent>
			<Divider />
			<CardActions>
				<Button color="primary" fullWidth variant="text">
					Upload picture
				</Button>
			</CardActions>
		</Card>
	);
};

export default AccountProfile;
