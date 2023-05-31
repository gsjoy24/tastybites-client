import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Cover from '../Shared/Cover/Cover';
import MenuItem from '../Shared/MenuItem/MenuItem';

const MenuCategory = ({ items, title, desc, coverImg }) => {
	return (
		<div>
			{title && <Cover img={coverImg} title={title} desc={desc} />}
			<div className='grid grid-cols-1 md:grid-cols-2 px-12 gap-6 mt-12'>
				{items.map((item) => (
					<MenuItem key={item._id} item={item} />
				))}
			</div>
			<Link to={`/order/${title}`}>
				<Button value={'ORDER YOUR FAVOURITE FOOD'} />
			</Link>
		</div>
	);
};

export default MenuCategory;
