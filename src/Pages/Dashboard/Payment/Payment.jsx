import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import CheckoutForm from './CheckoutForm';
import useCart from '../../../Hooks/useCart';

const stipePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_KEY);

const Payment = () => {
	const [cart] = useCart();
	const total = cart.reduce((sum, item) => sum + item.price, 0);
	const price = parseFloat(total.toFixed(2));

	return (
		<div className='flex justify-center items-center w-full h-full'>
			<Helmet>
				<title>Add an Item - TastyBites</title>
			</Helmet>
			<div className='min-w-[500px]'>
				<h3 className='text-3xl font-semibold-text-center uppercase mb-6'>payment</h3>
				<Elements stripe={stipePromise}>
					<CheckoutForm price={price} cart={cart} />
				</Elements>
			</div>
		</div>
	);
};

export default Payment;
