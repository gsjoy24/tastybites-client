import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import Navigation from '../Pages/Shared/Navigation/Navigation';

const Main = () => {
	const location = useLocation();
	const isOnAuth = location.pathname.includes('login') || location.pathname.includes('signup');
	return (
		<div>
			{isOnAuth || <Navigation />}
			<Outlet />
			{isOnAuth || <Footer />}
		</div>
	);
};

export default Main;
