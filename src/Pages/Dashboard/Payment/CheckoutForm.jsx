import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useEffect } from 'react';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';

const CheckoutForm = ({ cart, price }) => {
	const stripe = useStripe();
	const elements = useElements();
	const { user } = useAuth();
	const [cardErr, setCardErr] = useState('');
	const [axiosSecure] = useAxiosSecure();
	const [clientSecret, setClientSecret] = useState('');
	const [processing, setProcessing] = useState(false);
	const [transactionId, setTransactionId] = useState('');

	useEffect(() => {
		axiosSecure.post('/create-payment-intent', { price }).then((res) => {
			// console.log(res.data.clientSecret);
			setClientSecret(res.data.clientSecret);
		});
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!stripe || !elements) {
			return;
		}
		const card = elements.getElement(CardElement);
		if (card === null) {
			return;
		}
		console.log(card);

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card
		});
		if (error) {
			console.log('error', error);
			setCardErr(error.message);
		} else {
			console.log('PaymentMethod', paymentMethod);
			setCardErr('');
		}
		setProcessing(true);
		const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: card,
				billing_details: {
					name: user?.displayName || 'anonymous',
					email: user?.email || 'unknown'
				}
			}
		});
		if (confirmError) {
			console.log(confirmError);
		}
		setProcessing(false);
		if (paymentIntent.status === 'succeeded') {
			setTransactionId(paymentIntent.id);

			const paymentInfo = {
				name: user?.displayName,
				email: user?.email,
				transactionId: paymentIntent.id,
				date: new Date().toDateString(),
				price,
				quantity: cart.length,
				item_names: cart.map((item) => item.name),
				menu_items: cart.map((item) => item.foodId),
				cart_items: cart.map((item) => item._id),
				order_status: 'pending'
			};
			console.log(paymentInfo);

			axiosSecure.post('/payments', paymentInfo).then((res) => {
				console.log(res.data);
				if (res.data.InsertedResult.insertedId) {
					Swal.fire({
						title: 'Payment Complete!',
						icon: 'success',
						showConfirmButton: false,
						timer: 2000
					});
				}
			});
		}
	};

	return (
		<div>
			{cardErr && <p className='text-red-500 my-5'>{cardErr}</p>}
			{transactionId && <p className='text-green-500 my-5'>Transaction Id: {transactionId}</p>}
			<form onSubmit={handleSubmit}>
				<CardElement
					options={{
						style: {
							base: {
								fontSize: '16px',
								color: '#424770',
								'::placeholder': {
									color: '#aab7c4'
								}
							},
							invalid: {
								color: '#9e2146'
							}
						}
					}}
				/>
				<button
					className='btn btn-primary mt-8 mx-auto block min-w-[200px]'
					type='submit'
					disabled={!stripe || !clientSecret || processing}>
					Pay
				</button>
			</form>
		</div>
	);
};

export default CheckoutForm;
