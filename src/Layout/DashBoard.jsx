import { NavLink, Outlet } from 'react-router-dom';
import {
	FaWallet,
	FaCartPlus,
	FaHome,
	FaCalendarAlt,
	FaBars,
	FaShoppingBag,
	FaEnvelope,
	FaBook,
	FaUsers
} from 'react-icons/fa';
import { ImSpoonKnife } from 'react-icons/im';
import { AiOutlineBars } from 'react-icons/ai';
import useCart from '../Hooks/useCart';
import useAdmin from '../Hooks/useAdmin';

const DashBoard = () => {
	const [cart] = useCart();
	const [isAdmin] = useAdmin();
	const userNav = (
		<>
			<li>
				<NavLink className={({ isActive }) => (isActive ? 'text-[#fff] ' : '')} to='/dashboard/user-home'>
					<FaHome /> User Home
				</NavLink>
			</li>
			<li>
				<NavLink className={({ isActive }) => (isActive ? 'text-[#fff]' : '')} to='/dashboard/reservation'>
					<FaCalendarAlt /> Reservation
				</NavLink>
			</li>
			<li>
				<NavLink className={({ isActive }) => (isActive ? 'text-[#fff]' : '')} to='/dashboard/payment-history'>
					<FaWallet /> Payment History
				</NavLink>
			</li>
			<li>
				<NavLink className={({ isActive }) => (isActive ? 'text-[#fff]' : '')} to='/dashboard/my-cart'>
					<FaCartPlus />
					<span>My Cart</span>
					<div className='badge bg-[#fff] font-medium text-slate-800 border-0 text-[14px]'>{cart?.length || 0}</div>
				</NavLink>
			</li>
		</>
	);
	const adminNav = (
		<>
			<li>
				<NavLink className={({ isActive }) => (isActive ? 'text-[#fff]' : '')} to='/dashboard/admin-home'>
					<FaHome /> Admin Home
				</NavLink>
			</li>
			<li>
				<NavLink className={({ isActive }) => (isActive ? 'text-[#fff]' : '')} to='/dashboard/add-item'>
					<ImSpoonKnife /> Add an Item
				</NavLink>
			</li>
			<li>
				<NavLink className={({ isActive }) => (isActive ? 'text-[#fff]' : '')} to='/dashboard/manage-items'>
					<AiOutlineBars /> manage items
				</NavLink>
			</li>
			<li>
				<NavLink className={({ isActive }) => (isActive ? 'text-[#fff]' : '')} to='/dashboard/manage-bookings'>
					<FaBook /> manage bookings
				</NavLink>
			</li>
			<li>
				<NavLink className={({ isActive }) => (isActive ? 'text-[#fff]' : '')} to='/dashboard/all-users'>
					<FaUsers /> all users
				</NavLink>
			</li>
		</>
	);
	const commonNav = (
		<>
			<li>
				<NavLink className={({ isActive }) => (isActive ? 'text-[#fff]' : '')} to='/'>
					<FaHome /> Home
				</NavLink>
			</li>
			<li>
				<NavLink className={({ isActive }) => (isActive ? 'text-[#fff]' : '')} to='/our-menu'>
					<FaBars /> Menu
				</NavLink>
			</li>
			<li>
				<NavLink className={({ isActive }) => (isActive ? 'text-[#fff]' : '')} to='/order/salad'>
					<FaShoppingBag /> Shop
				</NavLink>
			</li>
			<li>
				<NavLink className={({ isActive }) => (isActive ? 'text-[#fff]' : '')} to='/contact-us'>
					<FaEnvelope /> Contact
				</NavLink>
			</li>
		</>
	);
	return (
		<div className='drawer drawer-mobile'>
			<input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
			<div className='drawer-content flex flex-col items-center '>
				<label htmlFor='my-drawer-2' className='btn btn-primary drawer-button lg:hidden'>
					Open drawer
				</label>
				<Outlet />
			</div>
			<div className='drawer-side '>
				<label htmlFor='my-drawer-2' className='drawer-overlay'></label>
				<ul className='menu p-4 w-80 text-base-content bg-[#d1a054] uppercase'>
					{isAdmin ? adminNav : userNav}
					<div className='divider'></div>
					{commonNav}
				</ul>
			</div>
		</div>
	);
};

export default DashBoard;
