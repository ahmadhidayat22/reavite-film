import React from "react";

import { MovieCatalog, MyNav, Search } from "../components";
import { useParams } from "react-router-dom";

function Catalog() {
    const {category, type} = useParams();

	return (
		<div className="">
			<div className="">
                <MyNav />
                <div className="container-xl h-[15vh] md:h-[20vh] mx-auto flex items-end justify-center">
                    <h1 className="text-4xl uppercase">{category}</h1>
                </div>
            
                <MovieCatalog category={category} type={type}/>
               

            </div>
		</div>
	);
}

export default Catalog;
