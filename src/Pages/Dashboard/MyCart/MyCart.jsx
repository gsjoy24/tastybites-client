import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useCart from '../../../Hooks/useCart';
import { FaRegTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const MyCart = () => {
	const [cart, refetch] = useCart();
	const totalPrice = cart.reduce((sum, item) => item.price + sum, 0);

	const handleDelete = (id) => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
			if (result.isConfirmed) {
				fetch(`http://localhost:5000/cart/${id}`, { method: 'DELETE' })
					.then((res) => res.json())
					.then((data) => {
						// console.log(data);
						if (data?.deletedCount > 0) {
							refetch();
							Swal.fire({
								title: 'Deleted!',
								icon: 'success',
								showConfirmButton: false,
								timer: 2000
							});
						} else {
							Swal.fire({
								title: 'Failed!',
								text: 'Please try again!',
								icon: 'error',
								confirmButtonColor: '#d1a054'
							});
						}
					})
					.catch((err) => console.log(err.message));
			} else {
				Swal.fire({
					title: 'Canceled!',
					icon: 'warning',
					showConfirmButton: false,
					timer: 2000
				});
			}
		});
	};
	return (
		<div className='py-12'>
			<Helmet>
				<title>My Cart - TastyBites</title>
			</Helmet>
			<SectionTitle subHeading='My Cart' heading='wanna add more' />
			<div className='uppercase font-semibold flex flex-col sm:flex-row justify-center items-center gap-5 sm:justify-evenly mb-6'>
				<h3 className='text-3xl'>Total Items: {cart.length}</h3>
				<h3 className='text-3xl'> Total price:{totalPrice}</h3>
				<Link to='/dashboard/payment' className='btn btn-sm px-8 bg-[#d1a054] border-0 max-w-[200px]'>
					pay
				</Link>
			</div>
			<div className='overflow-x-auto w-full'>
				<table className='table w-full'>
					{/* head */}
					<thead>
						<tr>
							<th className='bg-[#d1a054] text-white'>#</th>
							<th className='bg-[#d1a054] text-white'>Item image</th>
							<th className='bg-[#d1a054] text-white'>Item Nama</th>
							<th className='bg-[#d1a054] text-white'>price</th>
							<th className='bg-[#d1a054] text-white'>action</th>
						</tr>
					</thead>
					<tbody>
						{cart.map((row, i) => (
							<tr key={row._id}>
								<th className='border-r-[1px] border-stone-300'>{i + 1}</th>
								<td>
									<div className='avatar'>
										<div className='mask mask-squircle w-12 h-12'>
											<img src={row.image} alt='Avatar Tailwind CSS Component' />
										</div>
									</div>
								</td>
								<td>{row.name}</td>
								<td> $ {row.price}</td>
								<th>
									<button onClick={() => handleDelete(row._id)} className='btn bg-red-600 border-0 btn-sm text-white'>
										<FaRegTrashAlt size={20} />
									</button>
								</th>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MyCart;
