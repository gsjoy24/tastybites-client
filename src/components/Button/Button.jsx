import React from 'react';

const Button = ({ value }) => {
	return (
		<button className='btn btn-outline border-t-0 border-x-0 border-b-2 border-slate-700 m-auto block my-12'>
			{value}
		</button>
	);
};

export default Button;
