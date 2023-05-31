import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaRegTrashAlt, FaUserShield } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AllUsers = () => {
	const [axiosSecure] = useAxiosSecure();
	const { data: users = [], refetch } = useQuery(['users'], async () => {
		const res = await axiosSecure.get('/users');
		return res.data;
	});
	const handleMakeAdmin = (user) => {
		Swal.fire({
			title: 'Are you sure?',
			text: `${user.name} will have all the admin permissions!`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d1a054',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, do it!'
		}).then((result) => {
			if (result.isConfirmed) {
				fetch(`http://localhost:5000/users/admin/${user._id}`, {
					method: 'PATCH'
				})
					.then((res) => res.json())
					.then((data) => {
						console.log('make admin', data);
						if (data.modifiedCount > 0) {
							refetch();
							Swal.fire({
								title: 'Operation Successful',
								text: `${user.name} is an admin now!`,
								icon: 'success',
								showConfirmButton: false,
								timer: 2000
							});
						}
					});
			} else {
				Swal.fire({
					title: 'Operation Cancelled',
					icon: 'error',
					showConfirmButton: false,
					timer: 2000
				});
			}
		});
	};
	const handleDelete = (id) => {};
	return (
		<div>
			{' '}
			<Helmet>
				<title>All Users - TastyBites</title>
			</Helmet>
			<h4 className='text-3xl font-semibold mb-4'>Total Users: {users.length}</h4>
			<div className='overflow-x-auto'>
				<table className='table w-full'>
					{/* head */}
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>email</th>
							<th>role</th>
							<th>action</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user, i) => (
							<tr key={user?._id}>
								<th>{i + 1}</th>
								<td>{user?.name}</td>
								<td>{user?.email}</td>
								<td>
									{user?.role === 'admin' ? (
										'Admin'
									) : (
										<button
											onClick={() => handleMakeAdmin(user)}
											className='btn bg-[#d1a054] border-0 btn-sm text-white'>
											<FaUserShield size={20} />
										</button>
									)}
								</td>
								<td>
									<button onClick={() => handleDelete(user._id)} className='btn bg-red-600 border-0 btn-sm text-white'>
										<FaRegTrashAlt size={20} />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AllUsers;
