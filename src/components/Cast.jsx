import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import tmdbApi, { movieType, category } from "../server/api";

const Cast = (props) => {
	// console.log(props);

	const [casts, setCasts] = useState([]);

	useEffect(() => {
		if (props.id) {
			tmdbApi.credit(props.category, props.id).then((res) => {
				// console.log(res);
				setCasts(res.cast.slice(0, 5));
			});
		}
	}, [props.id]);
	// console.log(casts);

	return (
		<>
			{casts.map((item, i) => {
                const picture = 'https://image.tmdb.org/t/p/w500/' + item.profile_path;
                return(
				<div className="w-28 text-center" key={i}>
					<img src={picture} alt="cast" className="w-full rounded" />
					<p>{item.name}</p>
				</div>
                )

            })}
		</>
	);
};

export default Cast;
