import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { Helmet } from 'react-helmet-async';
import useMenu from '../../../Hooks/useMenu';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ManageItems = () => {
	const [menu, refetch] = useMenu();
	// console.log(menu);
	const [axiosSecure] = useAxiosSecure();

	const handleDeleteItem = (id) => {
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
				axiosSecure.delete(`/menu/${id}`).then((res) => {
					refetch();
					if (res.data.deletedCount > 0) {
						Swal.fire({
							title: 'Deleted Successful!',
							icon: 'success',
							showConfirmButton: false,
							timer: 2000
						});
					} else {
						Swal.fire({
							title: 'Failed to delete!',
							text: 'something went wrong! please try again!',
							icon: 'error',
							showConfirmButton: false,
							timer: 2000
						});
					}
				});
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

	// if (data?.deletedCount > 0) {
	// 	refetch();
	// 	Swal.fire({
	// 		title: 'Deleted!',
	// 		icon: 'success',
	// 		showConfirmButton: false,
	// 		timer: 2000
	// 	});
	// } else {
	// 	Swal.fire({
	// 		title: 'Failed!',
	// 		text: 'Please try again!',
	// 		icon: 'error',
	// 		confirmButtonColor: '#d1a054'
	// 	});
	// }
	return (
		<div className='w-full p-8'>
			<Helmet>
				<title>Manage Items - TastyBites</title>
			</Helmet>
			<SectionTitle heading='manage all items' subHeading='hurry up' />
			<table className='table w-full'>
				{/* head */}
				<thead>
					<tr>
						<th>#</th>
						<th>item image</th>
						<th>item name</th>
						<th>price</th>
						<th>action</th>
						<th>action</th>
					</tr>
				</thead>
				<tbody>
					{menu.map((item, i) => (
						<tr key={item?._id}>
							<th>{i + 1}</th>
							<td>
								<img className='w-24' src={item?.image} alt='' />
							</td>
							<td>{item?.name}</td>
							<td>${item?.price}</td>
							<td>
								<button className='btn bg-[#d1a054] border-0 btn-sm text-white'>
									<FaRegEdit size={20} />
								</button>
							</td>
							<td>
								<button
									onClick={() => handleDeleteItem(item._id)}
									className='btn bg-red-600 border-0 btn-sm text-white'>
									<FaRegTrashAlt size={20} />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ManageItems;
