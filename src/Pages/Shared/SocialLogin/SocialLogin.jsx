import { FaGoogle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';

const SocialLogin = () => {
	const { signInWithGoogle } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();
	const from = location.state?.from?.pathname || '/';

	const handleGoogleSignIn = () => {
		signInWithGoogle()
			.then((result) => {
				// console.log(result.user);
				const saveUser = { name: result.user.displayName, email: result.user.email };
				fetch('http://localhost:5000/users', {
					method: 'POST',
					headers: {
						'content-type': 'application/json'
					},
					body: JSON.stringify(saveUser)
				})
					.then((res) => res.json())
					.then(() => {
						Swal.fire({
							title: 'Signed up successfully!',
							icon: 'success',
							showConfirmButton: false,
							timer: 2000
						});
						navigate(from, { replace: true });
					});
			})
			.catch((err) => console.log(err.message));
	};
	return (
		<div>
			<div className='divider'></div>
			<div className='w-full text-center'>
				<button onClick={handleGoogleSignIn} className='btn btn-circle btn-outline'>
					<FaGoogle />
				</button>
			</div>
		</div>
	);
};

export default SocialLogin;
