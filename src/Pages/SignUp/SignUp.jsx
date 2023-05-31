import signUpImg from '../../assets/others/authentication2.png';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import useAuth from '../../Hooks/useAuth';

const SignUp = () => {
	const { createUser, updateUserProfile } = useAuth();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();

	const onSubmit = (data) => {
		createUser(data.email, data.password)
			.then((result) => {
				console.log(result.user);
				updateUserProfile(data.name, data.photoURL)
					.then(() => {
						const saveUser = { name: data.name, email: data.email };
						fetch('http://localhost:5000/users', {
							method: 'POST',
							headers: {
								'content-type': 'application/json'
							},
							body: JSON.stringify(saveUser)
						})
							.then((res) => res.json())
							.then((data) => {
								if (data.InsertedId) {
									reset();
									console.log(result);
									Swal.fire({
										title: 'Signed up successfully!',
										icon: 'success',
										showConfirmButton: false,
										timer: 2000
									});
									navigate('/');
								}
							});
					})
					.catch((err) => console.log(err.message));
			})
			.catch((err) => console.log(err.message));
	};

	return (
		<>
			<Helmet>
				<title>Sign Up - TastyBites</title>
			</Helmet>
			<div className='hero min-h-screen bg-base-200 authentication'>
				<div className='hero-content flex-col lg:flex-row-reverse md:shadow-xl shadow-slate-400 p-6 md:p-14 w-full max-w-5xl'>
					<div className='text-center lg:text-left'>
						<img src={signUpImg} alt='login' />
					</div>
					<div className='card flex-shrink-0 w-full max-w-[380px]'>
						<form onSubmit={handleSubmit(onSubmit)} className='card-body'>
							<div className='form-control'>
								<label className='label'>Name</label>
								<input
									type='text'
									{...register('name', { required: true })}
									// onChange={handleValidateCaptcha}
									name='name'
									placeholder='Name'
									className='input input-bordered'
								/>
								{errors.name && <span className='mt-2 ml-1 text-red-600 text-xs'>This field is required</span>}
							</div>
							<div className='form-control'>
								<label className='label'>Photo URL</label>
								<input
									type='text'
									{...register('photoURL', { required: true })}
									// onChange={handleValidateCaptcha}
									name='photoURL'
									placeholder='Photo URL'
									className='input input-bordered'
								/>
								{errors.photoURL && <span className='mt-2 ml-1 text-red-600 text-xs'>This field is required</span>}
							</div>
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Email</span>
								</label>
								<input
									type='email'
									{...register('email', { required: true })}
									name='email'
									placeholder='Email'
									className='input input-bordered'
								/>
								{errors.email && <span className='mt-2 ml-1 text-red-600 text-xs'>This field is required</span>}
							</div>
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Password</span>
								</label>
								<input
									type='password'
									{...register('password', {
										required: true,
										minLength: 6,
										maxLength: 12,
										pattern: /(?=.*?[0-9])(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[#?!@$%^&*\-_])/
									})}
									name='password'
									placeholder='password'
									className='input input-bordered'
								/>
								{errors.password?.type === 'required' && (
									<p className='mt-2 ml-1 text-red-600 text-xs' role='alert'>
										Password is required
									</p>
								)}
								{errors.password?.type === 'pattern' && (
									<p className='mt-2 ml-1 text-red-600 text-xs' role='alert'>
										Password must have a number, a uppercase and a lowercase character, also a special character!
									</p>
								)}
								{errors.password?.type === 'minLength' && (
									<p className='mt-2 ml-1 text-red-600 text-xs' role='alert'>
										Password must have atleast 6 characters!
									</p>
								)}
								{errors.password?.type === 'maxLength' && (
									<p className='mt-2 ml-1 text-red-600 text-xs' role='alert'>
										Password can't have more than 12 characters!{' '}
									</p>
								)}
								<label className='label'>
									<a href='#' className='label-text-alt link link-hover'>
										Forgot password?
									</a>
								</label>
							</div>
							<div className='form-control mt-6'>
								<button type='submit' className='btn bg-[#DBB984] border-0'>
									Sign Up
								</button>
							</div>
						</form>
						<p className='text-center text-[#c78c2c] text-sm'>
							Already have an account?
							<Link className='font-semibold ml-2 underline' to='/login'>
								Login
							</Link>
						</p>
						<SocialLogin />
					</div>
				</div>
			</div>
		</>
	);
};

export default SignUp;
