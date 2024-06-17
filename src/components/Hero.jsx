// import React from 'react';

// import { star , half_star } from "../assets/icon";


const Hero = () => {
	const handleVideoClick = () => {
		// Logika untuk menampilkan video
		console.log("Video clicked");
	};
    const path = '/fqv8v6AycXKsivp1T5yKtLbGXce.jpg'
	const picture ="https://image.tmdb.org/t/p/original/" + path;
	return (
		<div className='w-full relative flex h-screen  justify-between border-box '>
            <div className="absolute inset-0 -z-10">
                <img
                    src={picture}
                    alt="Background"
                    className="w-full h-full object-cover object-center brightness-50"
                    
                />
            </div>
			<div className="text-white h-full flex items-start flex-col w-3/5  text-start justify-center px-28  gap-6">
              
                    <h1 className="text-6xl uppercase font-mono font-extrabold ">revenge of the sith</h1>
                    <span>
                        {/* <img src={star} alt="star"  /> */}
                    </span>
                    <div className="border w-3/5">
                        <p className="text-lg">
                            Teenager riley’s mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.
                        </p>
                    </div>
                    <div>
                        <p className="font-mono text-lg">Genres <span>apwd</span> </p>
                        <p className="font-mono text-lg">Tags <span>apwd</span> </p>
                       
                    </div>
                    <button className="rounded-lg shadow-md bg-white text-black px-3 py-2">Watch Trailer</button>
                

			</div>
			<div className="flex items-center">
				<button
					onClick={handleVideoClick}
					className="bg-white text-black px-6 py-4 rounded-lg shadow-md hover:bg-gray-200 transition-colors duration-300"
				>
					Watch Video
				</button>
			</div>
		</div>
	);
};

export default Hero;