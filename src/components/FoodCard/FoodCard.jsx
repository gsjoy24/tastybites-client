import React from 'react';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useCart from '../../Hooks/useCart';
import useAuth from '../../Hooks/useAuth';

const FoodCard = ({ item }) => {
	const { _id, name, price, image, recipe } = item;
	const { user } = useAuth;
	const [, refetch] = useCart();

	const navigate = useNavigate();
	const location = useLocation();

	const handleAddToCart = () => {
		if (user && user.email) {
			const cartItem = { foodId: _id, name, image, price, email: user.email };
			fetch('http://localhost:5000/cart', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify(cartItem)
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.insertedId) {
						// refetch data in useCart to update the cart number in navigation
						refetch();
						Swal.fire({
							title: 'added to cart successfully!',
							icon: 'success',
							showConfirmButton: false,
							timer: 2000
						});
					} else {
						Swal.fire({
							title: 'Failed to add!',
							text: 'Please try again later.',
							icon: 'error',
							showConfirmButton: false,
							timer: 2000
						});
					}
				});
		} else {
			Swal.fire({
				title: 'Please login to order the food!',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#DBB984',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Login now!'
			}).then((result) => {
				if (result.isConfirmed) {
					navigate('/login', { state: { from: location } });
				}
			});
		}
	};
	return (
		<div className='card min-w-[300px] max-w-[320px] bg-base-100 shadow-xl mx-auto relative border'>
			<figure>
				<img src={image} alt={name} />
			</figure>
			<div className='card-body'>
				<h2 className='card-title'>{name}</h2>
				<p>{recipe}</p>
				<p className='absolute top-6 right-6 bg-slate-800 text-white px-3 py-1 rounded-lg'>${price}</p>
				<div className='card-actions justify-end'>
					<button onClick={handleAddToCart} className='btn bg-[#DBB984] border-0'>
						add to cart
					</button>
				</div>
			</div>
		</div>
	);
};

export default FoodCard;
