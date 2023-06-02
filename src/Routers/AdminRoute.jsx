import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useAdmin from '../Hooks/useAdmin';

const AdminRoute = ({ children }) => {
	const { user, loading } = useAuth();
	const location = useLocation();
	const [isAdmin, isAdminLoading] = useAdmin();

	if (loading || isAdminLoading) {
		return (
			<div className='w-full h-96 flex justify-center items-center'>
				<button className='btn loading border-none bg-[#DBB984]'>loading</button>
			</div>
		);
	}

	if (user && isAdmin) {
		return children;
	}

	return <Navigate to='/' state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
