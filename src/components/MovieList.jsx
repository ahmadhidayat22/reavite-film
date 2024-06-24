import { useState, useEffect } from "react";
import tmdbApi, { category, movieType, tvType } from "../server/api";
import { play_button, play_button_red } from "../assets";
import { Link } from "react-router-dom";

const MovieList = (props) => {
	const [Movies, setMovies] = useState([]);
	const [available, setAvailable] = useState(false);
	const type = props.type;

	useEffect(() => {
		const getList = async () => {
			let response = null;
			if (type !== "similar") {
				switch (props.category) {
					case category.movie:
						response = await tmdbApi.getMoviesList(type);

						break;

					default:
						// get tv list
						break;
				}
			} else {
				response = await tmdbApi.similiar(category[props.category], props.id);
			}
			if (response.results == "") {
				setAvailable(false);
			} else {
				setAvailable(true);
			}

			setMovies(response.results);
			console.log(Movies);
		};

		getList();
	}, []);

	const Movie_list = () => {
		return Movies.map((movie, i) => {
			const title = movie.title ? movie.title : movie.name;
			// console.log(movie);
			const shortTitle = title;
			const link = "/" + category[props.category] + "/" + movie.id;

			return (
				// eslint-disable-next-line react/jsx-key
				<Link to={link} key={i} reloadDocument={true}>
					<div
						key={i}
						className="group cursor-pointer hover:scale-110  transition-all relative overflow-hidden ease-in-out duration-300 mx-3"
					>
						<div className="w-32 h-44 md:w-44 md:h-64 max-w-xs overflow-hidden rounded-lg  bg-red-400  ease-in-out">
							<img
								src={`${import.meta.env.VITE_REACT_APP_BASEIMGURL}/${
									movie.poster_path
								}`}
								alt="poster image"
								className="w-full h-full"
							/>
						</div>

						<div className="w-full  *:translate-y-5 *:group-hover:translate-y-0 *:opacity-0 *:group-hover:opacity-100 *:duration-300 group-hover:h-24 md:group-hover:h-32 px-3 py-1 group-hover:bg-gradient-to-t  group-hover:from-black  text-white items-center flex gap-2 absolute bottom-0 rounded-b-lg ">
							<div className="w-40 text-lg md:text-xl  text-wrap">
								<h3 className="font-bold ">{shortTitle}</h3>
							</div>
							<div className="">
								<button>
									<img src={play_button_red} alt="" className="w-10" />
								</button>
							</div>
						</div>
					</div>
				</Link>
			);
		});
	};

	return (
		<>
			{available ? (
				<div
					id="popular"
					className="flex flex-col  m-auto p-auto my-10 mx-5 md:mx-16"
				>
					<div className="flex justify-between ">
						<h1 className="flex py-3  md:mx-15 mx-5 font-bold text-xl  md:text-4xl text-white">
							{props.title}
						</h1>
						<div className=" mx-3 flex items-end px-2  ">
							<a
								href={`/catalog/${category[props.category]}/${type}`}
								className="text-red-400"
							>
								{" "}
								Show more{" "}
							</a>
						</div>
					</div>

					<div className="flex overflow-x-scroll  pb-5 md:pb-10 hide-scroll-bar ">
						<div className="flex flex-nowrap snap-x snap-mandatory py-5 ">
							<Movie_list />
						</div>
					</div>
				</div>
			) : null}
		</>
	);
};

export default MovieList;
