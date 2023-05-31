import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
const useCart = () => {
	const { user, loading } = useAuth();
	// const token = localStorage.getItem('access-token');
	const [axiosSecure] = useAxiosSecure();
	const { refetch, data: cart = [] } = useQuery({
		queryKey: ['carts', user?.email],
		enabled: !loading,
		// queryFn: async () => {
		// 	const response = await fetch(`http://localhost:5000/cart?email=${user?.email}`, {
		// 		headers: { authorization: `bearer ${token}` }
		// 	});
		// 	return response.json();
		// }
		queryFn: async () => {
			const res = await axiosSecure(`/cart?email=${user?.email}`);
			console.log('res from axios', res);
			return res.data;
		}
	});
	return [cart, refetch];
};

export default useCart;
