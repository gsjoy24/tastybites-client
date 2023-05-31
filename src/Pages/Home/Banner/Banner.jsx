import img1 from '../../../assets/home/01.png';
import img2 from '../../../assets/home/02.jpg';
import img3 from '../../../assets/home/03.png';
import img4 from '../../../assets/home/04.jpg';
import img5 from '../../../assets/home/05.png';
import img6 from '../../../assets/home/06.png';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Banner = () => {
	return (
		<div className='mt-[70px] lg:mt-0'>
			<Carousel autoPlay='true' infiniteLoop='true' showStatus={false} swipeable={true}>
				<div className='border-x-4 border-white'>
					<img className='w-[100vw]' src={img1} />
				</div>
				<div className='border-x-4 border-white'>
					<img className='w-[100vw]' src={img2} />
				</div>
				<div className='border-x-4 border-white'>
					<img className='w-[100vw]' src={img3} />
				</div>
				<div className='border-x-4 border-white'>
					<img className='w-[100vw]' src={img4} />
				</div>
				<div className='border-x-4 border-white'>
					<img className='w-[100vw]' src={img5} />
				</div>
				<div className='border-x-4 border-white'>
					<img className='w-[100vw]' src={img6} />
				</div>
			</Carousel>
		</div>
	);
};

export default Banner;
