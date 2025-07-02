import React, { useEffect, useState } from "react";
import Cast from "./Cast";

import tmdbApi from "../server/api";

const HeroDetail = (props) => {
	const item = props.category;
	//    console.log(props);
	const [movieDetail, setMovieDetail] = useState([]);

	const bigPath = movieDetail.backdrop_path;
	const smallPath = movieDetail.poster_path;

	useEffect(() => {
		const getMovieDetail = async () => {
			{
				await tmdbApi.detail(props.category, props.id).then((res) => {
					// console.log(res);
					setMovieDetail(res);
				});
			}
		};
		// console.log(movieDetail, props);
		
		getMovieDetail();
	}, [props.category, props.id]);

	const GetGenre = () => {
		const genre = movieDetail.genres;
		return (
			genre?.map((element, index) => (
				<span key={index} className="border py-[2px] px-2 rounded-xl">
					{element.name}
				</span>
			)) || null
		);
	};

	return (
		<>
			<div className="relative h-[100vh] w-full ">
				<div className="h-full w-full  bg-gray-300">
					{movieDetail.backdrop_path ? (
						<img
							src={`https://image.tmdb.org/t/p/original${movieDetail.backdrop_path}`}
							alt="image 1"
							loading="lazy"
							className="h-full w-full object-cover"
						/>
					) : null}
				</div>

				<div className="absolute bottom-0  left-0  w-full bg-gradient-to-t  from-black from-40% inset-0 flex justify-center items-center ">
					<div className="flex justify-center items-center px-5 w-full relative gap-3 md:gap-12">
						<div className="hidden md:block  max-w-80 max-h-[30rem] rounded-md overflow-hidden">
							<img
								src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
								alt="poster image"
								loading="lazy"
								className="w-full h-full "
							/>
						</div>

						<div className=" md:w-3/6  relative  w-full flex flex-col gap-3 ">
							<h1 className="font-extrabold text-4xl md:text-5xl ">{movieDetail.title || movieDetail.name || movieDetail.original_name}</h1>
							<div className="flex gap-2 pt-2">{<GetGenre />}</div>

							<p>{movieDetail.overview}</p>

							<h3 className="font-extrabold ">Casts</h3>
							<div className="rounded  flex justify-start gap-3 pe-2 py-3 ">
								{<Cast category={props.category} id={props.id} />}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default HeroDetail;
