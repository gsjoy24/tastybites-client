import { Swiper, SwiperSlide } from 'swiper/react';
import slid1 from '../../../assets/home/slide1.jpg';
import slid2 from '../../../assets/home/slide2.jpg';
import slid3 from '../../../assets/home/slide3.jpg';
import slid4 from '../../../assets/home/slide4.jpg';
import slid5 from '../../../assets/home/slide5.jpg';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
const Category = () => {
	return (
		<section className='my-16 px-12'>
			<SectionTitle subHeading='---From 11:00am to 10:00pm---' heading='ORDER ONLINE' />
			<Swiper
				breakpoints={{
					414: {
						slidesPerView: 1,
						spaceBetween: 10
					},
					540: {
						slidesPerView: 2,
						spaceBetween: 20
					},
					768: {
						slidesPerView: 3,
						spaceBetween: 30
					},
					1024: {
						slidesPerView: 4,
						spaceBetween: 40
					}
				}}
				centeredSlides={true}
				pagination={{
					clickable: true,
					dynamicBullets: true
				}}
				grabCursor={true}
				modules={[Pagination]}
				className='mySwiper'>
				<SwiperSlide>
					<img className='w-full' src={slid1} alt='slider' />
					<h4
						style={{ textShadow: '3px 3px 3px rgba(0,0,0,0.93)' }}
						className='text-3xl uppercase text-white text-center drop-shadow-xl -translate-y-16 font-semibold'>
						Salad
					</h4>
				</SwiperSlide>
				<SwiperSlide>
					<img className='w-full' src={slid2} alt='slider' />
					<h4
						style={{ textShadow: '3px 3px 3px rgba(0,0,0,0.93)' }}
						className='text-3xl uppercase text-white text-center drop-shadow-xl -translate-y-16 font-semibold'>
						Soups
					</h4>
				</SwiperSlide>
				<SwiperSlide>
					<img className='w-full' src={slid3} alt='slider' />
					<h4
						style={{ textShadow: '3px 3px 3px rgba(0,0,0,0.93)' }}
						className='text-3xl uppercase text-white text-center drop-shadow-xl -translate-y-16 font-semibold'>
						pizzas
					</h4>
				</SwiperSlide>
				<SwiperSlide>
					<img className='w-full' src={slid4} alt='slider' />
					<h4
						style={{ textShadow: '3px 3px 3px rgba(0,0,0,0.93)' }}
						className='text-3xl uppercase text-white text-center drop-shadow-xl -translate-y-16 font-semibold'>
						desserts
					</h4>
				</SwiperSlide>
				<SwiperSlide>
					<img className='w-full' src={slid5} alt='slider' />
					<h4
						style={{ textShadow: '3px 3px 3px rgba(0,0,0,0.93)' }}
						className='text-3xl uppercase text-white text-center drop-shadow-xl -translate-y-16 font-semibold'>
						Salad
					</h4>
				</SwiperSlide>
			</Swiper>
		</section>
	);
};

export default Category;
