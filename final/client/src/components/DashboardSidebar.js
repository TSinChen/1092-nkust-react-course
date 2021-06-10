import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
	Avatar,
	Box,
	Button,
	Divider,
	Drawer,
	Hidden,
	List,
	Typography,
} from '@material-ui/core';
import {
	AlertCircle as AlertCircleIcon,
	AlignLeft as AlignLeftIcon,
	BarChart as BarChartIcon,
	Lock as LockIcon,
	Settings as SettingsIcon,
	ShoppingBag as ShoppingBagIcon,
	User as UserIcon,
	UserPlus as UserPlusIcon,
	Users as UsersIcon,
	ShoppingCart as ShoppingCartIcon,
} from 'react-feather';
import NavItem from './NavItem';

const items = [
	{
		href: '/app/dashboard',
		icon: BarChartIcon,
		title: 'Dashboard',
	},
	{
		href: '/app/customers',
		icon: UsersIcon,
		title: 'Customers',
	},
	{
		href: '/app/products',
		icon: ShoppingBagIcon,
		title: 'Products',
	},
	{
		href: '/app/orders',
		icon: AlignLeftIcon,
		title: 'Orders',
	},
	{
		href: '/app/report',
		icon: ShoppingCartIcon,
		title: 'Report',
	},
	{
		href: '/app/account',
		icon: UserIcon,
		title: 'Account',
	},
	{
		href: '/app/settings',
		icon: SettingsIcon,
		title: 'Settings',
	},
	{
		href: '/login',
		icon: LockIcon,
		title: 'Login',
	},
	{
		href: '/register',
		icon: UserPlusIcon,
		title: 'Register',
	},
	{
		href: '/404',
		icon: AlertCircleIcon,
		title: 'Error',
	},
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
	const { user, setUser } = useContext(UserContext);
	const location = useLocation();
	const [isLogin, setIsLogin] = useState();

	useEffect(() => {
		if (user.EmpId) {
			setIsLogin(true);
		} else {
			setIsLogin(false);
		}
	}, [user]);

	useEffect(() => {
		if (openMobile && onMobileClose) {
			onMobileClose();
		}
	}, [location.pathname, openMobile, onMobileClose]);

	const content = (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				height: '100%',
			}}
		>
			<Box
				sx={{
					alignItems: 'center',
					display: 'flex',
					flexDirection: 'column',
					p: 2,
				}}
			>
				<Avatar
					component={RouterLink}
					src={'/'}
					sx={{
						cursor: 'pointer',
						width: 64,
						height: 64,
						marginBottom: 1,
					}}
					to={isLogin ? '/app/account' : '/login'}
				/>
				<Typography color="textPrimary" gutterBottom variant="h5">
					{isLogin ? user.EmpName : '尚未登入'}
				</Typography>
				<Typography color="textSecondary" gutterBottom variant="body2">
					{isLogin ? user.JobTitle : '尚未登入'}
				</Typography>
			</Box>
			<Divider />
			<Box sx={{ p: 2 }}>
				<List>
					{items.map((item) => {
						if (item.title === 'Login' && isLogin) {
							return (
								<NavItem
									href="/"
									key={item.title}
									title="Logout"
									icon={item.icon}
									onClick={() => {
										setUser({});
									}}
								/>
							);
						}
						if (item.title === 'Account' && !isLogin) {
							return (
								<NavItem
									href={'/login'}
									key={item.title}
									title={item.title}
									icon={item.icon}
								/>
							);
						}
						return (
							<NavItem
								href={item.href}
								key={item.title}
								title={item.title}
								icon={item.icon}
							/>
						);
					})}
				</List>
			</Box>
			<Box sx={{ flexGrow: 1 }} />
			<Box
				sx={{
					backgroundColor: 'background.default',
					m: 2,
					p: 2,
				}}
			>
				<Typography align="center" gutterBottom variant="h4">
					Need more?
				</Typography>
				<Typography align="center" variant="body2">
					Upgrade to PRO version and access 20 more screens
				</Typography>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						pt: 2,
					}}
				>
					<Button
						color="primary"
						component="a"
						href="https://react-material-kit.devias.io"
						variant="contained"
					>
						See PRO version
					</Button>
				</Box>
			</Box>
		</Box>
	);

	return (
		<>
			<Hidden lgUp>
				<Drawer
					anchor="left"
					onClose={onMobileClose}
					open={openMobile}
					variant="temporary"
					PaperProps={{
						sx: {
							width: 256,
						},
					}}
				>
					{content}
				</Drawer>
			</Hidden>
			<Hidden lgDown>
				<Drawer
					anchor="left"
					open
					variant="persistent"
					PaperProps={{
						sx: {
							width: 256,
							top: 64,
							height: 'calc(100% - 64px)',
						},
					}}
				>
					{content}
				</Drawer>
			</Hidden>
		</>
	);
};

DashboardSidebar.propTypes = {
	onMobileClose: PropTypes.func,
	openMobile: PropTypes.bool,
};

DashboardSidebar.defaultProps = {
	onMobileClose: () => {},
	openMobile: false,
};

export default DashboardSidebar;
