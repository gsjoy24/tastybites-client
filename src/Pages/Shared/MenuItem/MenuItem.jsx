const MenuItem = ({ item }) => {
	const { name, image, price, recipe } = item;
	return (
		<div className='p-3 flex flex-col md:flex-row space-x-5 justify-center items-center'>
			<img className='w-32 h-28 rounded-full rounded-tl-none mb-6 md:mb-0' src={image} alt={name} />
			<div className='md:flex space-y-2'>
				<div>
					<h3 className='uppercase text-lg'>{name}-----------</h3>
					<p>{recipe}</p>
				</div>
				<p className='text-[#BB8506]'>${price}</p>
			</div>
		</div>
	);
};

export default MenuItem;
