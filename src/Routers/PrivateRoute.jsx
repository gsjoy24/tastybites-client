import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const PrivateRoute = ({ children }) => {
	const { user, loading } = useAuth();
	const location = useLocation();
	if (loading) {
		return (
			<div className='w-full h-96 flex justify-center items-center'>
				<button className='btn loading border-none bg-[#DBB984]'>loading</button>
			</div>
		);
	}

	if (user) {
		return children;
	}

	return <Navigate to='/login' state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
