import { useState, useEffect, useRef, memo, useMemo } from "react";
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
import HeroSkeleton from "./HeroSkeleton";

const HeroSlideItem = (props) => {
  // 1. Selalu letakkan semua Hook di bagian atas komponen
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const item = props.movie;
	// console.log(item);
	
  // 2. Gunakan useMemo sebelum useEffect
  const genreName = useMemo(() => {
    return item.genre_ids
      .map((id) => {
        const found = genres.find((g) => g.id === id);
        return found ? found.name : null;
      })
      .filter(Boolean);
  }, [item.genre_ids]);

  useEffect(() => {
    const img = new Image();
    img.src = `https://image.tmdb.org/t/p/w1280${item.backdrop_path}`;
    img.onload = () => {
      setImageLoaded(true);
      setIsLoading(false);
    };
    img.onerror = () => setIsLoading(false);
  }, [item.backdrop_path]);

  // 3. Hitung rating setelah Hook
  let rating = item.vote_average;
  const remainingStars = rating % 1 ? true : false;

  const starItem = [];
  for (let i = 1; i < Math.floor(rating); i++) {
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

  // 4. Pindahkan fungsi ke dalam useEffect atau gunakan useCallback jika perlu
  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);
    let videos = await tmdbApi.getVideos(category.movie, item.id);
    videos = videos.results;
    let key = videos.find((v) => v.type === "Trailer")?.key;

    if (key) {
      const videoSrc = `https://www.youtube.com/embed/${key}?autoplay=1`;
      modal.querySelector("iframe").setAttribute("src", videoSrc);
      modal.classList.add("fixed");
      modal.classList.remove("hidden");
    } else {
      alert("Tidak ada trailer");
    }
  };

  if (isLoading) {
    return <HeroSkeleton />;
  }

  return (
    <div className="relative h-[80vh] lg:h-full w-full" key={item.id}>
      {!imageLoaded && <HeroSkeleton />}
	 
      <img
        src={`https://image.tmdb.org/t/p/w1280${item.backdrop_path}`}
        alt={item.title}
        className={`h-full w-full object-cover ${
			imageLoaded ? "block" : "hidden"
			}`}
			loading="lazy"
			decoding="async"
			onLoad={() => setImageLoaded(true)}
			/>
			
      <div className="absolute inset-0 flex h-full w-full  md:bg-gradient-to-r bg-gradient-to-t from-10%  from-black  overflow-hidden">
        <div className="xl:w-4/6 lg:w-[50%]  w-[80%] h-[70%] my-auto flex items-start flex-col animate-fade xl:gap-3 gap-0  justify-center  md:mx-14 xl:mx-28 lg:mx-20 px-3 mx-auto  md:w-[55%]">
          <Typography
            variant="h1"
            color="white"
            className="lg:mb-4 md:mb-1  font-[inherit] text-4xl lg:text-5xl xl:text-7xl"
			
          ><a href={`/movie/${item.id}`}>
            {item.title}

		  </a>
          </Typography>
          <div className="md:flex  justify-start items-center hidden gap-1">
            {starItem}
            <span>
              <p className="text-white font-body ms-1 lg:ms-3 text-xs ">
                {Math.round(rating * 10) / 10}
              </p>
            </span>
            <span className="text-white hidden md:block lg:py-1 lg:px-2 ms-2 rounded-md bg-yellow-800 ">
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
            <div className="flex items-center lg:gap-2 flex-wrap lg:mt-5 mt-2">
              {genreName.slice(0, 3).map((name, index) => (
                <span
                  className="border font-body text-xs lg:py-1 lg:px-2 me-1 mb-1 px-1.5 lg:text-base md:text-sm rounded-xl"
                  key={`${item.id}-${index}`}
                >
                  {name}
                </span>
              ))}
            </div>
            <p className="lg:text-xl md:text-base text-white mt-3">
              <span className="text-green-400">Released date</span>{" "}
              {item.release_date}{" "}
            </p>
          </div>

          <div className="lg:mt-5 mt-2">
            <button
              className="lg:py-3 px-2 lg:px-6 md:py-1 md:px-4 rounded-lg bg-red-500 font-[inherit] text-xl text-white hover:scale-110 transition-all duration-500"
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
// const Carousels = (props) => {
//   const movie = props.movies;

//   return (
//     <>
//       <Carousel
//         className="mt-10"
//         navigation={() => {}}
//         prevArrow={({ handlePrev }) => (
//           <button
//             variant="text"
//             color="white"
//             size="lg"
//             onClick={handlePrev}
//             className="!absolute top-2/4 left-1 -translate-y-2/4"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth="3"
//               stroke="currentColor"
//               class="size-8"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M15.75 19.5 8.25 12l7.5-7.5"
//               />
//             </svg>
//           </button>
//         )}
//         nextArrow={({ handleNext }) => (
//           <button
//             variant="text"
//             color="white"
//             size="lg"
//             onClick={handleNext}
//             className="!absolute top-2/4 right-1 -translate-y-2/4"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth="3"
//               stroke="currentColor"
//               class="size-8"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="m8.25 4.5 7.5 7.5-7.5 7.5"
//               />
//             </svg>
//           </button>
//         )}
//         autoplay={true}
//         loop={true}
//         autoplayDelay={8000}
//       >
//         {movie.map((item, i) => (
//           <HeroSlideItem movie={item} key={i} />
//         ))}
//       </Carousel>

//       {movie.map((item, i) => (
//         <TrailerModal item={item} key={i} />
//       ))}
//     </>
//   );
// };


const Carousels = memo(({ movies }) => {
  const [visibleItems, setVisibleItems] = useState(5); // Batasi jumlah item yang dirender

  return (
    <>
      <Carousel
        className="mt-10"
        navigation={() => {}}
        prevArrow={({ handlePrev }) => (
          <button
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
              strokeWidth="3"
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        )}
        nextArrow={({ handleNext }) => (
          <button
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
              strokeWidth="3"
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        )}
        // autoplay={true}
        loop={true}
        autoplayDelay={8000}
      >
        {movies.slice(0, visibleItems).map((item) => (
          <HeroSlideItem movie={item} key={item.id} />
        ))}
      </Carousel>

      {/* Render modal hanya untuk item yang visible */}
      {movies.slice(0, visibleItems).map((item) => (
        <TrailerModal item={item} key={`modal-${item.id}`} />
      ))}
    </>
  );
});
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
			loading="lazy"
			mozallowfullscreen="mozallowfullscreen"
			msallowfullscreen="msallowfullscreen"
			oallowfullscreen="oallowfullscreen"
			webkitallowfullscreen="webkitallowfullscreen"
		  ></iframe>
		</ModalContent>
	  </MyModal>
	);
  };

// const TrailerModal = memo((props) => {
//   const iframe = useRef(null);
//   const [videoKey, setVideoKey] = useState(null);

//   useEffect(() => {
//     // Load video key hanya ketika modal aktif
//     const loadVideoKey = async () => {
//       const videos = await tmdbApi.getVideos(category.movie, props.item.id);
//       const trailer = videos.results.find((v) => v.type === "Trailer");
//       setVideoKey(trailer?.key);
//     };

//     const modal = document.querySelector(`#modal_${props.item.id}`);
//     const observer = new MutationObserver(() => {
//       if (modal.classList.contains("fixed")) {
//         loadVideoKey();
//       } else {
//         loadVideoKey();

//         //setVideoKey(null);
//       }
//     });
	
//     observer.observe(modal, { attributes: true });
//     return () => observer.disconnect();
//   }, [props.item.id]);
//   console.log(videoKey);
  
//   const onClose = () => {
//     iframe.current?.setAttribute("src", "");
//     setVideoKey(null);
//   };

//   return (
//     <MyModal active={false} id={`modal_${props.item.id}`}>
//       <ModalContent onClose={onClose}>
//         {videoKey ? (
//           <iframe
//             ref={iframe}
//             src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
//             className="w-full rounded-lg xl:h-[80vh] h-[300px] md:h-[500px]"
//             allow="fullscreen; encrypted-media; autoplay;"
//             loading="lazy"
//           />
//         ) : (
//           <div className="text-white text-center p-8">Loading trailer...</div>
//         )}
//       </ModalContent>
//     </MyModal>
//   );
// });

export default Carousels;
