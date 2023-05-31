import { useEffect } from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import Featured from '../Featured/Featured';
import IntroSection from '../IntroSection/IntroSection';
import PopularMenu from '../PopularMenu/PopularMenu';
import Testimonials from '../Testimonials/Testimonials';
import { Helmet } from 'react-helmet-async';

const Home = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<div>
			<Helmet>
				<title>Home - TastyBites</title>
			</Helmet>
			<Banner />
			<Category />
			<IntroSection />
			<PopularMenu />
			<div className='px-12 py-16 bg-slate-800 text-2xl sm:text-4xl text-center text-white max-w-4xl mb-12 mx-auto'>
				<p className='flex flex-col md:flex-row justify-center gap-3'>
					<span>Call Us:</span> <span>+88 0192345678910</span>
				</p>
			</div>
			<Featured />
			<Testimonials />
		</div>
	);
};

export default Home;
