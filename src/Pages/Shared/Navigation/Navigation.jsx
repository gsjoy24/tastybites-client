import { Link, NavLink } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';
import useCart from '../../../Hooks/useCart';
import useAuth from '../../../Hooks/useAuth';
import useAdmin from '../../../Hooks/useAdmin';

const Navigation = () => {
	const { user, logoutUser } = useAuth();
	const [cart] = useCart();
	const [isAdmin] = useAdmin();

	const navItems = (
		<>
			<li>
				<NavLink className={({ isActive }) => (isActive ? 'text-[#EEFF25]' : '')} to='/'>
					HOME
				</NavLink>
			</li>
			<li>
				<NavLink className={({ isActive }) => (isActive ? 'text-[#EEFF25]' : '')} to='/contact-us'>
					CONTACT US
				</NavLink>
			</li>
			{user && (
				<li>
					<NavLink
						className={({ isActive }) => (isActive ? 'text-[#EEFF25]' : '')}
						to={isAdmin ? '/dashboard/admin-home' : '/dashboard/user-home'}>
						DASHBOARD
					</NavLink>
				</li>
			)}
			<li>
				<NavLink className={({ isActive }) => (isActive ? 'text-[#EEFF25]' : '')} to='/our-menu'>
					OUR MENU
				</NavLink>
			</li>
			<li>
				<NavLink className={({ isActive }) => (isActive ? 'text-[#EEFF25]' : '')} to='/order/salad'>
					ORDER
				</NavLink>
			</li>
			<li>
				<NavLink className={({ isActive }) => (isActive ? 'text-[#EEFF25]' : '')} to='/dashboard/my-cart'>
					<div className='relative'>
						<FaCartPlus size={30} />
						<div className='badge bg-[#EEFF25] text-slate-800 absolute -top-2 -right-3 border-0 text-[10px]'>
							{cart.length || 0}
						</div>
					</div>
				</NavLink>
			</li>
			{user ? (
				<>
					<li>
						<button onClick={logoutUser}>Logout</button>
					</li>
					<li>
						<div>
							<img className='w-10 h-10 object-cover rounded-full' src={user?.photoURL} alt={user?.displayName} />
						</div>
					</li>
				</>
			) : (
				<>
					<li>
						<NavLink className={({ isActive }) => (isActive ? 'text-[#EEFF25]' : '')} to='/login'>
							LOGIN
						</NavLink>
					</li>
					<li>
						<NavLink className={({ isActive }) => (isActive ? 'text-[#EEFF25]' : '')} to='/signup'>
							SIGN UP
						</NavLink>
					</li>
				</>
			)}
		</>
	);

	return (
		<div className='navbar items-center px-6 md:px-24 py-1 fixed bg-opacity-80 lg:bg-opacity-50  bg-black text-white  top-0 right-0 z-50 w-full shadow-lg'>
			<div className='navbar-start justify-between items-center flex w-full'>
				<Link to='/' className='font-bold text-2xl'>
					TastyBites
				</Link>
				<div className='dropdown dropdown-end'>
					<label tabIndex={0} className='btn btn-ghost lg:hidden'>
						<svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='white' viewBox='0 0 24 24' stroke='white'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h8m-8 6h16' />
						</svg>
					</label>
					<ul
						tabIndex={0}
						className='menu menu-compact dropdown-content mt-3 p-4 shadow rounded-box w-52 gap-4 bg-gray-900 bg-opacity-90 font-semibold'>
						{navItems}
					</ul>
				</div>
			</div>
			<div className='navbar-center hidden lg:flex text-sm'>
				<ul className='menu menu-horizontal font-semibold'>{navItems}</ul>
			</div>
		</div>
	);
};

export default Navigation;
