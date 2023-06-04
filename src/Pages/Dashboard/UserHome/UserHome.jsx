import React from 'react';
import useAuth from '../../../Hooks/useAuth';

const UserHome = () => {
	const { user } = useAuth();
	return <div>user home</div>;
};

export default UserHome;
