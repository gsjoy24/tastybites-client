import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const Payment = () => {
	return (
		<div>
			<Helmet>
				<title>Add an Item - TastyBites</title>
			</Helmet>
			<SectionTitle subHeading={`What's new`} heading='add an item' />
		</div>
	);
};

export default Payment;
