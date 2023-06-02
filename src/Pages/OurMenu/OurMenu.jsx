import { Helmet } from 'react-helmet-async';
import Cover from '../Shared/Cover/Cover';
import coverBg from '../../assets/menu/menu-bg.jpg';
import useMenu from '../../Hooks/useMenu';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import MenuCategory from './MenuCategory';
import { useEffect } from 'react';
import dessertBg from '../../../src/assets/menu/dessert-bg.jpeg';
import pizzaBg from '../../../src/assets/menu/pizza-bg.jpg';
import saladBg from '../../../src/assets/menu/salad-bg.jpg';
import soupBg from '../../../src/assets/menu/soup-bg.jpg';
const OurMenu = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const [menu] = useMenu();
	const desserts = menu.filter((menu) => menu.category === 'dessert');
	const soups = menu.filter((menu) => menu.category === 'soup');
	const salads = menu.filter((menu) => menu.category === 'salad');
	const pizzas = menu.filter((menu) => menu.category === 'pizza');
	const offered = menu.filter((menu) => menu.category === 'offered');

	return (
		<div>
			<Helmet>
				<title>Menu - TastyBites</title>
			</Helmet>
			<Cover img={coverBg} title='our menu' desc='Would you like to try a dish?' />
			<SectionTitle heading={`TODAY'S OFFER`} subHeading={`Don't miss`} />
			<MenuCategory items={offered} />
			{/* dessert items */}
			<MenuCategory
				items={desserts}
				coverImg={dessertBg}
				title={'dessert'}
				desc={`Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}
			/>
			{/* pizza items */}
			<MenuCategory
				items={pizzas}
				coverImg={pizzaBg}
				title={'pizza'}
				desc={`Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}
			/>
			{/* salad items */}
			<MenuCategory
				items={salads}
				coverImg={saladBg}
				title={'salad'}
				desc={`Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}
			/>
			{/* soup items */}
			<MenuCategory
				items={soups}
				coverImg={soupBg}
				title={'soup'}
				desc={`Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}
			/>
		</div>
	);
};

export default OurMenu;
