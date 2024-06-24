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
	const type = props.type;
	const [list, setList] = useState([]);
	const [totalPage, setTotalPage] = useState(0);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [searchVal, setSearchVal] = useState("");
	const [available, setAvailable] = useState(false);

	useEffect(() => {
		const getList = async () => {
			let response = null;
			if (Category == category.movie) {
				response = await tmdbApi.getMoviesList(movieType[type]);
			} else {
				response = await tmdbApi.getTvList(tvType.popular);
			}

			setList(response.results);
			setTotalPage(response.total_pages);
			
		};

		setAvailable(true)
		getList();

		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}, [Category]);

	
	const Card = () => {
		return list.map((item, i) => {
			const pictur = `${import.meta.env.VITE_REACT_APP_BASEIMGURL}/${
				item.poster_path
			}`;
			const link = "/" + category[props.category] + "/" + item.id;

			return (
				<Link to={link} key={i}>
					<div
						key={i}
						className=" flex md:w-44 md:h-64 w-32 h-44 rounded  hover:scale-105 my-3 transition-all duration-300  flex-col"
					>
						<div className="flex rounded flex-col h-full ">
							<div className="rounded-xl md:rounded-2xl h-full  overflow-hidden bg-gray-400">
								<img
									src={`${import.meta.env.VITE_REACT_APP_BASEIMGURL}/${
										item.poster_path
									}`}
									loading="lazy"
									alt="poster image"
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
	// console.log(totalPage);

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

		if (searchVal === "") {
			if (Category == category.movie) {
				response = await tmdbApi.getMoviesList(movieType[type], params.page);
			} else {
				response = await tmdbApi.getTvList(movieType[type], params.page);
			}
		} else {
			// console.log(Category);
			response = await tmdbApi.search(Category, searchVal, params.page);
		}

		// console.log(response);

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
						id="load_more"
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
				res = await tmdbApi.search(Category, getValue);

				if (res.results != "") {
					// console.log("ada",res);
					setPage(1);

					setTotalPage(res.total_pages);
					setAvailable(true);
				} else {
					setAvailable(false);
					// console.log("kosong pok", res);
				}
				setSearchVal(getValue);
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
					onKeyUp={(e) => {
						e.key === "Enter" ? searching() : null;
					}}
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
			<div className="w-full  text-white p-10 ">
				<Search />
			</div>

			<div className=" mt-2 p-5">
				<div className="container mx-auto  ">
					{available ? (
						<>
							<div className="flex  justify-center flex-wrap gap-2  md:gap-10 py-2">
								<Card />
							</div>
							<div className="flex items-center justify-center mt-10 mb-16 ">
								<HandleLoad />
							</div>
						</>
					) : (
						<div className="mx-auto text-xl lg:text-2xl text-center">Tidak ditemukan</div>
					)
					
					}
				</div>
			</div>
		</div>
	);
};

export default MovieCatalog;
