import Cover from '../Shared/Cover/Cover';
import orderBg from '../../../src/assets/shop/banner2.jpg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useEffect, useState } from 'react';
import FoodCard from '../../components/FoodCard/FoodCard';
import useMenu from '../../Hooks/useMenu';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
const Order = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
	const { category } = useParams();
	const initialIndex = categories.indexOf(category);
	const [tabInd, setTabInd] = useState(initialIndex);

	const [menu] = useMenu();
	const desserts = menu.filter((menu) => menu.category === 'dessert');
	const soups = menu.filter((menu) => menu.category === 'soup');
	const salads = menu.filter((menu) => menu.category === 'salad');
	const pizzas = menu.filter((menu) => menu.category === 'pizza');
	const drinks = menu.filter((menu) => menu.category === 'drinks');

	return (
		<div>
			<Helmet>
				<title>Order - TastyBites</title>
			</Helmet>
			<Cover img={orderBg} title={'order'} desc={'See your orders'} />
			<Tabs defaultIndex={tabInd} onSelect={(index) => setTabInd(index)} className={'my-12'}>
				<TabList className={`border-0`}>
					<div className='flex justify-center flex-wrap gap-5 font-semibold'>
						<Tab className={`border-0`}>
							<span
								className={`uppercase cursor-pointer ${
									tabInd === 0 ? `text-orange-500 border-b-2 border-orange-500  p-3` : ``
								}`}>
								salads
							</span>
						</Tab>
						<Tab className='uppercase cursor-pointer'>
							<span
								className={`uppercase cursor-pointer ${
									tabInd === 1 ? `text-orange-500 border-b-2 border-orange-500  p-3` : ``
								}`}>
								pizzas
							</span>
						</Tab>
						<Tab className='uppercase cursor-pointer'>
							<span
								className={`uppercase cursor-pointer ${
									tabInd === 2 ? `text-orange-500 border-b-2 border-orange-500  p-3` : ``
								}`}>
								soups
							</span>
						</Tab>
						<Tab className='uppercase cursor-pointer'>
							<span
								className={`uppercase cursor-pointer ${
									tabInd === 3 ? `text-orange-500 border-b-2 border-orange-500  p-3` : ``
								}`}>
								desserts
							</span>
						</Tab>
						<Tab className='uppercase cursor-pointer'>
							<span
								className={`uppercase cursor-pointer ${
									tabInd === 4 ? `text-orange-500 border-b-2 border-orange-500  p-3` : ``
								}`}>
								drinks
							</span>
						</Tab>
					</div>
				</TabList>

				<TabPanel>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 my-12'>
						{salads.map((item) => (
							<FoodCard key={item._id} item={item} />
						))}
					</div>
				</TabPanel>
				<TabPanel>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 my-12'>
						{pizzas.map((item) => (
							<FoodCard key={item._id} item={item} />
						))}
					</div>
				</TabPanel>
				<TabPanel>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 my-12'>
						{soups.map((item) => (
							<FoodCard key={item._id} item={item} />
						))}
					</div>
				</TabPanel>
				<TabPanel>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 my-12'>
						{desserts.map((item) => (
							<FoodCard key={item._id} item={item} />
						))}
					</div>
				</TabPanel>
				<TabPanel>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 my-12'>
						{drinks.map((item) => (
							<FoodCard key={item._id} item={item} />
						))}
					</div>
				</TabPanel>
			</Tabs>
		</div>
	);
};

export default Order;
