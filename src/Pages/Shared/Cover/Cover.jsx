import { Parallax } from 'react-parallax';

const Cover = ({ img, title, desc }) => {
	return (
		<Parallax blur={{ min: -15, max: 15 }} bgImage={img} bgImageAlt={title} strength={-300}>
			<div className='hero h-[60vh]'>
				<div className='hero-overlay bg-opacity-60'></div>
				<div className='hero-content text-center text-neutral-content'>
					<div className='max-w-xl'>
						<h1 className='mb-5 text-5xl font-bold uppercase'>{title}</h1>
						<p className='mb-5 uppercase'>{desc}</p>
					</div>
				</div>
			</div>
		</Parallax>
	);
};

export default Cover;
