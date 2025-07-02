import {
	MyNav,
	HeroDetail,
	TrailerDetail,
	MovieList,
	Footer,
	VideoPlayer
} from "../components";
import tmdbApi, { movieType, category } from "../server/api";
import { useParams } from "react-router";

import React, { useEffect, useState } from "react";

const Movie = () => {
	const { Category, id } = useParams();
	return (
		<div className="snap-y snap-mandatory overflow-y-scroll h-screen">
			<div>
				<MyNav />
			</div>
			<div className="snap-always snap-center">
				<HeroDetail category={category[Category]} id={id} />
			</div>

			<div className="sm:my-5   snap-always snap-center">
				<VideoPlayer category={category[Category]} id={id}/>
			</div>
			{/* <div className="my-5  snap-always snap-center">
				<TrailerDetail category={category[Category]} id={id} />
			</div> */}

			<div className="snap-always snap-center">
				<MovieList
					type="similar"
					category={category[Category]}
					id={id}
					title="Similiar"
				/>
			</div>
			<div className="snap-always snap-center">
				<Footer />
			</div>
		</div>
	);
};

export default Movie;
