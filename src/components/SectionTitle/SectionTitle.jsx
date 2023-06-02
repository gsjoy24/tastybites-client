const SectionTitle = ({ subHeading, heading }) => {
	return (
		<div className='max-w-[340px] mx-auto text-center my-12'>
			<h4 className='text-sm text-[#D99904] italic border-b-[3px] pb-2'>---{subHeading}---</h4>
			<h2 className='text-4xl  border-b-[3px] py-4 uppercase'>{heading}</h2>
		</div>
	);
};

export default SectionTitle;
