import { useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { useEffect } from 'react';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import useMenu from '../../../Hooks/useMenu';
import Button from '../../../components/Button/Button';

const PopularMenu = () => {
	const [menu] = useMenu();
	const popularMenus = menu.filter((menu) => menu.category === 'popular');

	return (
		<section className='py-12'>
			<SectionTitle subHeading='---Check it out---' heading='FROM OUR MENU' />
			<div className='grid grid-cols-1 md:grid-cols-2 px-12 gap-6'>
				{popularMenus.map((item) => (
					<MenuItem key={item._id} item={item} />
				))}
			</div>
			<Button value={'View Full  Menu'} />
		</section>
	);
};

export default PopularMenu;
