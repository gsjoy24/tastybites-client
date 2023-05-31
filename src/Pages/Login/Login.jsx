import React, { useEffect, useRef, useState } from 'react';
import LoginImg from '../../assets/others/authentication2.png';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import useAuth from '../../Hooks/useAuth';

const Login = () => {
	const captchaField = useRef();
	const [disable, setDisable] = useState(true);
	const { signInUser } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();
	const from = location.state?.from?.pathname || '/';

	useEffect(() => {
		loadCaptchaEnginge(6);
	}, []);

	const handleLogin = (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.password.value;
		signInUser(email, password)
			.then((result) => {
				console.log(result.user);
				Swal.fire({
					icon: 'success',
					title: 'Successfully logged in!',
					showConfirmButton: false,
					timer: 2000
				});
				navigate(from, { replace: true });
			})
			.catch((err) => console.log(err.message));
	};
	const handleValidateCaptcha = (e) => {
		e.preventDefault();
		const userValue = captchaField.current.value;
		if (validateCaptcha(userValue)) {
			setDisable(false);
		} else {
			setDisable(true);
		}
	};

	return (
		<>
			<Helmet>
				<title>Login - TastyBites</title>
			</Helmet>
			<div className='hero min-h-screen bg-base-200 authentication'>
				<div className='hero-content flex-col-reverse lg:flex-row-reverse md:shadow-xl shadow-slate-400 p-6 md:p-14 w-full max-w-5xl'>
					<div className='card flex-shrink-0 w-full max-w-[380px]'>
						<form onSubmit={handleLogin} className='card-body'>
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Email</span>
								</label>
								<input type='email' name='email' placeholder='email' className='input input-bordered' />
							</div>
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Password</span>
								</label>
								<input type='password' name='password' placeholder='password' className='input input-bordered' />
								<label className='label'>
									<a href='#' className='label-text-alt link link-hover'>
										Forgot password?
									</a>
								</label>
							</div>
							<div className='form-control'>
								<label className='label'>
									<LoadCanvasTemplate />
								</label>
								<input
									type='text'
									ref={captchaField}
									// onChange={handleValidateCaptcha}
									name='captcha'
									placeholder='Enter the captcha above'
									className='input input-bordered'
								/>
								<button className='btn btn-xs btn-outline mt-3' onClick={handleValidateCaptcha}>
									validate
								</button>
							</div>
							<div className='form-control mt-6'>
								<button disabled={disable} type='submit' className='btn bg-[#DBB984] border-0'>
									Login
								</button>
							</div>
						</form>
						<p className='text-center text-[#c78c2c] text-sm'>
							New Here?
							<Link className='font-semibold ml-2 underline' to='/signup'>
								Create a New Account
							</Link>
						</p>
						<SocialLogin />
					</div>
					<div className='text-center lg:text-left'>
						<img src={LoginImg} alt='login' />
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
// #DBB984
