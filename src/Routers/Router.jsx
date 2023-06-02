import { createBrowserRouter } from 'react-router-dom';

import Main from '../Layout/Main';
import Home from '../Pages/Home/Home/Home';
import OurMenu from '../Pages/OurMenu/OurMenu';
import Order from '../Pages/Order/Order';
import Login from '../Pages/Login/Login';
import SignUp from '../Pages/SignUp/SignUp';
import PrivateRoute from './PrivateRoute';
import Secret from '../Pages/Shared/Secret/Secret';
import DashBoard from '../Layout/DashBoard';
import MyCart from '../Pages/Dashboard/MyCart/MyCart';
import AllUsers from '../Pages/Dashboard/AllUsers/AllUsers';
import AdminRoute from './AdminRoute';
import AddItem from '../Pages/Dashboard/AddItem/AddItem';
import ManageItems from '../Pages/Dashboard/ManageItems/ManageItems';
import Payment from '../Pages/Dashboard/Payment/Payment';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Main />,
		children: [
			{
				path: '/',
				element: <Home />
			},
			{
				path: '/our-menu',
				element: <OurMenu />
			},
			{
				path: '/order/:category',
				element: <Order />
			},
			{
				path: '/login',
				element: <Login />
			},
			{
				path: '/signup',
				element: <SignUp />
			},
			{
				path: '/secret',
				element: (
					<PrivateRoute>
						<Secret />
					</PrivateRoute>
				)
			}
		]
	},
	{
		path: '/dashboard',
		element: (
			<PrivateRoute>
				<DashBoard />
			</PrivateRoute>
		),
		children: [
			{
				path: 'my-cart',
				element: <MyCart />
			},
			{
				path: 'payment',
				element: <Payment />
			},

			// admin routes
			{
				path: 'all-users',
				element: (
					<AdminRoute>
						<AllUsers />
					</AdminRoute>
				)
			},
			{
				path: 'add-item',
				element: (
					<AdminRoute>
						<AddItem />
					</AdminRoute>
				)
			},
			{
				path: 'manage-items',
				element: (
					<AdminRoute>
						<ManageItems />
					</AdminRoute>
				)
			}
		]
	}
]);
