"use client";

import React, { useEffect, useState } from "react";
import tmdbApi, { category, movieType, tvType } from "../server/api";
import { Typography } from "@material-tailwind/react";
import { Input, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

import useFormStatus from "react-dom";

const MovieCatalog = (props) => {
	// const status = useFormStatus();
	const Category = props.category;
	const type= props.type
	const [list, setList] = useState([]);
	const [totalPage, setTotalPage] = useState(0);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);


	console.log(Category,type);

	useEffect(() => {
		const getList = async () => {
			let response = null;
			if (Category == category.movie) {
				response = await tmdbApi.getMoviesList(movieType[type]);
			} else {
				response = await tmdbApi.getTvList(tvType.popular);
			}
			// console.log(response);

			setList(response.results);
			setTotalPage(response.total_pages);
		};

		getList();

		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}, [Category]);

	const ImageSkeleton = () => {
		return (
			<div className=" flex flex-col rounded animate-pulse ">
				<div className="rounded-2xl bg-gray-400 h-full ">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="h-full w-full text-gray-400"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
						/>
					</svg>
				</div>
				<div>
					<Typography
						as="div"
						variant="h1"
						className="mb-4 h-4 w-full mt-4 rounded-full bg-gray-400"
					>
						&nbsp;
					</Typography>
				</div>
			</div>
		);
	};

	const Card = () => {
		return list.map((item, i) => {
			const pictur = `${import.meta.env.VITE_REACT_APP_BASEIMGURL}/${
				item.poster_path
			}`;
			const link = "/" + category[props.category] + "/" + item.id;

			// console.log(pictur);
			return (
				<Link to={link} key={i}>
					<div key={i} className=" flex w-44 rounded hover:scale-105 my-3 transition-all duration-300 h-64 flex-col">
						{/* {loading ? (
						<ImageSkeleton />
					) : (
						
					)} */}
						<div className=" flex rounded flex-col">
							<div className="rounded-2xl h-full overflow-hidden bg-gray-400">
								<img
									src={`${import.meta.env.VITE_REACT_APP_BASEIMGURL}/${
										item.poster_path
									}`}
									loading="lazy"
									alt="image movie"
									className="w-full h-full"
								/>
							</div>

							<div className=" text-center">
								<p>{item.title ? item.title : item.name}</p>
							</div>
						</div>
					</div>
				</Link>
			);
		});
	};
	console.log(totalPage);

	const wait = (x) => {
		return new Promise((res) => {
			setTimeout(() => {
				res(x);
			}, 2000);
		});
	};

	const loadMore = async () => {
		setLoading(true);
		let response = null;
		const params = {
			page: page + 1,
		};
		response = await tmdbApi.getMoviesList(movieType.upcoming, params.page);

		// console.log('ok');

		setList([...list, ...response.results]);
		await wait(1000);
		setPage(params.page);
		setLoading(false);
	};

	const HandleLoad = () => {
		return (
			<>
				{page < totalPage ? (
					<button
						className="border rounded-full my-5 text-xl py-2 px-4 hover:bg-blue-gray-200"
						onClick={loadMore}
					>
						{loading ? "loading...." : "Load More "}
					</button>
				) : null}
			</>
		);
	};

	const Search = () => {
		const [getValue, setValue] = useState("");
		const onChange = ({ target }) => setValue(target.value);

		const searching = async () => {
			let res = null;
			if (getValue) {
				console.log("ada");
				res = await tmdbApi.search(getValue);
				console.log(res);
			}
			setList(res.results);
			// console.log(getValue);
		};

		return (
			<div className="relative flex w-full max-w-[24rem]">
				<Input
					type="search"
					label="Search"
					color="white"
					variant="outlined"
					value={getValue}
					onChange={onChange}
					className="pr-20"
					containerProps={{
						className: "min-w-0 text-wrap",
					}}
				/>
				<Button
					size="sm"
					color={getValue ? "blue" : "gray"}
					disabled={!getValue}
					className="!absolute  right-1 top-1 rounded"
					onClick={searching}
				>
					Search
				</Button>
			</div>
		);
	};

	return (
		<div>
			<div className="w-full text-white p-10 ">
				<Search />
			</div>

			<div className=" mt-2 p-5">
				<div className="  container mx-auto  ">
					<div className="flex flex-wrap gap-10 py-2">
						<Card />
					</div>
					<div className="flex items-center justify-center mt-10 mb-16 ">
						<HandleLoad />
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieCatalog;