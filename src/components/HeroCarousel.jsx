import { useState, useEffect, useRef } from "react";
import { ArrowDown, ChevronLeft, ChevronRight } from "react-feather";
import {
	Carousel,
	Typography,
	Button,
	IconButton,
} from "@material-tailwind/react";
import { star, half_star, play_button } from "../assets";
import MyModal, { ModalContent } from "./Modal";
import tmdbApi, { category, movieType, tvType } from "../server/api";

import { genres } from "../constant";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const HeroSlideItem = (props) => {
	const item = props.movie;
	const imgUrl = import.meta.env.VITE_REACT_APP_HEROIMGURL;
	const [image, setImage] = useState([]);
	let rating = item.vote_average;
	const remainingStars = rating % 1 ? true : false;

	const starItem = [];
	for (let i = 1; i < Math.floor(rating); i++) {
		// console.log(i)
		starItem.push(
			<span key={i}>
				<img key={i} src={star} alt="rating" className="w-5" />
			</span>
		);
	}
	if (remainingStars) {
		starItem.push(
			<span key={0}>
				<img key="0" src={half_star} alt="rating" className="w-5" />
			</span>
		);
	}

	const setModalActive = async () => {
		// console.log(item.id);
		const modal = document.querySelector(`#modal_${item.id}`);

		let videos = await tmdbApi.getVideos(category.movie, item.id);
		videos = videos.results;
		let key = 0;
		videos.map((item) => {
			if (item.type == "Trailer") {
				key = item.key;
				// console.log(key);
			}
			// console.log(item.type);
		});

		if (key != 0) {
			const videoSrc = `https://www.youtube.com/embed/${key}?autoplay=1`;
			modal.querySelector("iframe").setAttribute("src", videoSrc);
		} else {
			// modal.querySelector('.modal_content').innerHTML= "no trailer";
			alert("tidak ada trailer");
			// console.log(modal);
			console.log("tidak ada videos");
			return;
		}
		modal.classList.add("fixed");
		modal.classList.remove("hidden");

		// console.log(videos);
	};

	let genreName = [];
	const genresID = item.genre_ids;

	const getGenres = () => {
		for (let i = 0; i < genresID.length; i++) {
			const e = genresID[i];

			genres.map((item, j) => {
				if (e == item.id) {
					genreName.push(item.name);
				}
			});
		}
	};

	getGenres();

	useEffect(() => {
		setImage(`${imgUrl}${item.backdrop_path}`)

	}, [])

	console.log(image);
	// const images = `${import.meta.env.VITE_REACT_APP_HEROIMGURL}${item.backdrop_path}`
	// console.log(images);	

	return (
		<div 
		className="relative h-[80vh] lg:h-full w-full " 
		key={item.id}
		
		>
			
			
			<img
				src={`${import.meta.env.VITE_REACT_APP_HEROIMGURL}/${
					item.backdrop_path
				}`}
				alt="hero image"
				className="h-full object-cover "
				loading="eager"
			/>
			
			<div className="absolute inset-0 flex h-full w-full  md:bg-gradient-to-r bg-gradient-to-t from-10%  from-black  overflow-hidden">
				<div className="xl:w-4/6 lg:w-[50%]  w-[80%] h-[70%] my-auto flex items-start flex-col animate-fade xl:gap-3 gap-0  justify-center  md:mx-14 xl:mx-28 lg:mx-20 px-3 mx-auto  md:w-[55%]">
					<Typography
						variant="h1"
						color="white"
						className="lg:mb-4 md:mb-1  font-[inherit] text-4xl lg:text-5xl xl:text-7xl"
					>
						{item.title}
					</Typography>
					<div className="md:flex  justify-start items-center hidden gap-1">
						{starItem}
						<span>
							<p className="text-white font-body ms-1 lg:ms-3 text-xs ">
								{Math.round(rating * 10) / 10}
							</p>
						</span>
						<span className="text-white hidden md:block lg:py-1 lg:px-2 ms-2 rounded-md bg-[#4B5663] ">
							<p className="font-body ">Rating</p>
						</span>
					</div>
					<Typography
						color="white"
						className="lg:leading-relaxed leading-snug  text-sm md:block  md:opacity-80 xl:text-xl lg:text-base"
					>
						{item.overview}
					</Typography>

					<div>
						<div className="flex items-center  lg:gap-2 flex-wrap  lg:mt-5 mt-2">
							{genreName.map((i, q) => {
								return (
									<span
										className="border font-body text-xs  lg:py-1 lg:px-2 me-1 mb-1 px-1.5 lg:text-base md:text-sm rounded-xl "
										key={q}
									>
										{i}
									</span>
								);
							})}
						</div>
						<p className="lg:text-xl md:text-base text-white mt-3">
							<span className="text-green-400">Released date</span>{" "}
							{item.release_date}{" "}
						</p>
					</div>

					<div className="lg:mt-5 mt-2">
						<button
							className="lg:py-3 px-2 lg:px-6 md:py-1 md:px-4 rounded-lg bg-[#AD110B] font-[inherit] text-xl text-white hover:scale-110 transition-all duration-500"
							onClick={setModalActive}
						>
							watch Trailer
						</button>
					</div>
				</div>
				<div className="flex items-center xl:ms-16 md:ms-14  lg:ms-28 ">
					<button
						className="hover:-rotate-12 hover:scale-125 transition-transform duration-300  "
						onClick={setModalActive}
					>
						<img
							src={play_button}
							alt="play"
							className="lg:w-28 md:w-20 hidden md:block  "
						/>
					</button>
				</div>
			</div>
		</div>
	);
};
const Carousels = (props) => {
	const movie = props.movies;

	return (
		<>
			<Carousel
				className="mt-10"
				navigation={() => {}}
				prevArrow={({ handlePrev }) => (
					<button
						aria-label="prev"
						variant="text"
						color="white"
						size="lg"
						onClick={handlePrev}
						className="!absolute top-2/4 left-1 -translate-y-2/4"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="3"
							stroke="currentColor"
							class="size-8"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.75 19.5 8.25 12l7.5-7.5"
							/>
						</svg>
					</button>
				)}
				nextArrow={({ handleNext }) => (
					<button
						aria-label="next"
						id="next"
						variant="text"
						color="white"
						size="lg"
						onClick={handleNext}
						className="!absolute top-2/4 right-1 -translate-y-2/4"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="3"
							stroke="currentColor"
							class="size-8"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="m8.25 4.5 7.5 7.5-7.5 7.5"
							/>
						</svg>
					</button>
				)}
				autoplay={false}
				loop={true}
				autoplayDelay={8000}
			>
				{movie.map((item, i) => (
					<HeroSlideItem movie={item} key={i} />
				))}
			</Carousel>

			{movie.map((item, i) => (
				<TrailerModal item={item} key={i} />
			))}
		</>
	);
};

const TrailerModal = (props) => {
	// console.log("c",props.item.id);
	const iframe = useRef(null);

	const onClose = () => iframe.current.setAttribute("src", "");

	return (
		<MyModal active={false} id={`modal_${props.item.id}`}>
			<ModalContent onClose={onClose}>
				<iframe
					ref={iframe}
					className="w-full rounded-lg xl:h-[80vh] h-[300px] md:h-[500px]"
					allow="fullscreen;encrypted-media;autoplay;"
					mozallowfullscreen="mozallowfullscreen"
					msallowfullscreen="msallowfullscreen"
					oallowfullscreen="oallowfullscreen"
					webkitallowfullscreen="webkitallowfullscreen"
				></iframe>
			</ModalContent>
		</MyModal>
	);
};

{
	/* <div className="absolute inset-0 -z-10">
                <img
                        src=""
                        alt="Background"
                        className="w-full h-full object-cover object-center brightness-50"
                        
                    />
                </div>

                <div className="relative bg-gradient-to-r from-black z-0 text-white h-full flex items-start flex-col w-3/5  text-start justify-center px-28 lg:px-16  gap-5">
                    <h1 className="text-6xl lg:text-4xl uppercase font-mono font-extrabold ">p</h1>
                    <div className="flex justify-start items-center gap-1">
                        p
                        <span className="text-white font-medium py-1 px-2 ms-2 rounded-md bg-yellow-500 ">
                            <p>p</p>
                        </span>    
                    </div>

                    <div className="border w-3/5 lg:w-11/12">
                        <p className="text-lg lg:text-base">
                            awd
                        </p>
                    </div>
                    <div>
                        <p className="font-mono text-lg"><span className="text-green-400">Genres</span> apwdlaw </p>
                        <p className="font-mono text-lg"><span className="text-green-400">Tags</span> apwdlaw </p>
                    
                    </div>
                    <button className="rounded-lg shadow-md bg-white text-black px-3 py-2 " onClick="{handleVideoClick}">Watch Trailer</button>
                
                    
                </div>
                <div className="flex items-center ms-32">
                    <button 
                        className="hover:-rotate-12 hover:scale-125 transition-transform duration-300 "
                        onClick="{handleVideoClick}"
                    >
                    <img 
                        src="{play_button}" 
                        alt="play"
                        className="w-28 "
                        
                        />
                    </button>
                    
                </div> */
}
export default Carousels;
