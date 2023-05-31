import featuredImg from '../../../assets/home/featured.jpg';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
const Featured = () => {
	return (
		<section className='text-white pt-16 bg-fixed featured my-12'>
			<SectionTitle heading={'FROM OUR MENU'} subHeading={'---Check it out---'} />
			<div className='flex flex-col md:flex-row justify-center items-center gap-8 pb-20 px-5'>
				<img className='max-w-sm w-full' src={featuredImg} alt='featured' />
				<div className='max-w-md'>
					<span>March 20, 2023</span>
					<h3 className='font-semibold text-lg'>WHERE CAN I GET SOME?</h3>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores
						quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam
						maxime tenetur.
					</p>
					<button className='btn btn-outline mt-5 border-t-0 border-x-0 border-b-2 text-white'>Read More</button>
				</div>
			</div>
		</section>
	);
};

export default Featured;
