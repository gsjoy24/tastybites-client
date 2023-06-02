import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { ImSpoonKnife } from 'react-icons/im';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AddItem = () => {
	const [axiosSecure] = useAxiosSecure();
	const img_upload_token = import.meta.env.VITE_img_upload_token;
	const img_upload_url = `https://api.imgbb.com/1/upload??expiration=600&key=${img_upload_token}`;

	const { register, handleSubmit, reset } = useForm();

	const onSubmit = (data) => {
		const formData = new FormData();
		formData.append('image', data.image[0]);
		fetch(img_upload_url, {
			method: 'POST',
			body: formData
		})
			.then((res) => res.json())
			.then((imgRes) => {
				if (imgRes.success) {
					const imageURL = imgRes.data.display_url;
					const { name, price, category, recipe } = data;
					const newItem = { name, price: parseFloat(price), category, recipe, image: imageURL };
					console.log(newItem);
					axiosSecure.post('/menu', newItem).then((response) => {
						console.log(response);
						if (response.data.insertedId) {
							reset();
							Swal.fire({
								icon: 'success',
								title: 'Item added successfully!',
								showConfirmButton: false,
								timer: 2000
							});
						}
					});
				}
			});
	};

	return (
		<div className='w-full max-w-3xl p-12'>
			<Helmet>
				<title>Add an Item - TastyBites</title>
			</Helmet>
			<SectionTitle subHeading={`What's new`} heading='add an item' />

			<form onSubmit={handleSubmit(onSubmit)} className='bg-slate-100 p-12'>
				<div className='form-control w-full'>
					<label className='label'>
						<span className='label-text font-semibold'>Recipe Name*</span>
					</label>
					<input
						type='text'
						{...register('name', { required: true, maxLength: 80 })}
						placeholder='Recipe Name'
						className='input input-bordered w-full '
					/>
				</div>
				{/* category and price */}
				<div className='flex gap-4'>
					<div className='form-control w-full'>
						<label className='label'>
							<span className='label-text font-semibold'>Category*</span>
						</label>
						<select
							{...register('category', { required: true })}
							defaultValue='default'
							name='category'
							className='select select-bordered'>
							<option value='default' disabled>
								Pick one
							</option>
							<option value='salad'>Salad</option>
							<option value='dessert'>Dessert</option>
							<option value='soup'>Soup</option>
							<option value='pizza'>Pizza</option>
							<option value='drinks'>Drinks</option>
						</select>
					</div>
					{/* price */}
					<div className='form-control w-full'>
						<label className='label'>
							<span className='label-text font-semibold'>Price*</span>
						</label>
						<input
							{...register('price', { required: true })}
							type='number'
							name='price'
							placeholder='Price'
							className='input input-bordered w-full '
						/>
					</div>
				</div>
				{/* recipe details */}
				<div className='form-control w-full'>
					<label className='label'>
						<span className='label-text font-semibold'>Recipe Details*</span>
					</label>
					<textarea
						{...register('recipe', { required: true })}
						className='textarea textarea-bordered h-24'
						placeholder='Recipe Details'></textarea>
				</div>
				{/* picture */}
				<div className='form-control w-full'>
					<input
						{...register('image', { required: true })}
						type='file'
						className='file-input mt-4 file-input-sm w-full max-w-xs'
					/>
				</div>
				<button type='submit' className='btn mt-4 bg-[#d1a054]  border-0'>
					add item <ImSpoonKnife className='ml-3' size={20} />
				</button>
			</form>
		</div>
	);
};

export default AddItem;
