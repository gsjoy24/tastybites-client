import React, { useEffect, useState } from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import { Rating, ThinRoundedStar } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const Testimonials = () => {
	const ratingStar = {
		itemShapes: ThinRoundedStar,
		activeFillColor: '#ffb700',
		inactiveFillColor: '#fbf1a9'
	};

	const [reviews, setReviews] = useState([]);
	useEffect(() => {
		fetch('http://localhost:5000/reviews')
			.then((res) => res.json())
			.then((data) => setReviews(data));
	}, []);
	return (
		<section className='max-w-4xl mx-auto mb-12'>
			<SectionTitle subHeading={'What Our Clients Say'} heading={'TESTIMONIALS'} />
			<Swiper navigation={true} modules={[Navigation]} className='mySwiper'>
				{reviews.map((review) => (
					<SwiperSlide key={review._id}>
						<div className='px-12 md:px-24 flex flex-col justify-center items-center gap-5 text-center'>
							<Rating
								style={{ maxWidth: 300 }}
								value={review.rating}
								itemStyles={ratingStar}
								readOnly
								className='mx-auto'
							/>
							<FaQuoteLeft className='text-7xl' />
							<p>{review.details}</p>
							<p className='text-2xl font-semibold text-[#D99904]'>{review.name}</p>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
};

export default Testimonials;
