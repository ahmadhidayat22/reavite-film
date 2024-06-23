// import { Fragment } from 'react'
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	// Menu,
	// MenuButton,
	// MenuItem,
	// MenuItems,
	// Transition,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";

const navigation = [
	{ name: "Home", href: "/", current: null },
	{ name: "Movies", href: "/catalog/movie/popular", current: null },
	{ name: "Tv Series", href: "/catalog/tv/popular", current: null },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function MyNav() {
	const [activeIndex, setActiveIndex] = useState(null);

	useEffect(() => {
		const currentPath = window.location.pathname;
		const index = navigation.findIndex((item) => item.href === currentPath);
		setActiveIndex(index);
	}, []);

	const handleNavClick = (item, index) => {
		setActiveIndex(index);
	};
	const [prevScrollpos, setPrevScrollpos] = useState(window.scrollY);
	const [navbarVisible, setNavbarVisible] = useState(true);

	const handleScroll = () => {
		const scrollPosition = window.scrollY;
		if (prevScrollpos > scrollPosition) {
			setNavbarVisible(true);
		} else {
			setNavbarVisible(false);
		}

		setPrevScrollpos(scrollPosition);
	};

	window.addEventListener("scroll", handleScroll);

	return (
		<>
			<div
				className={`${
					navbarVisible ? "translate-y-[0vh] " : "-translate-y-20"
				} w-full fixed z-30 bg-black top-0 transition duration-500`}
			>
				<div className="flex py-2 mx-10 items-center justify-center md:justify-between">
					<div className="uppercase text-red-500  font-bold xl:text-5xl  text-3xl">
						<a href="/" className="">
							kuymovie
						</a>
					</div>
					<div className="md:flex  space-x-4 hidden  max-h-8  ">
						{navigation.map((item, index) => (
							<a
								key={index}
								href={item.href}
								className={classNames(
									index === activeIndex
										? " text-red-500 border-b-4 border-red-500"
										: "text-white hover:border-b-4 hover:text-white",
									" px-3  xl:text-2xl  font-semibold "
								)}
								aria-current={index === activeIndex ? "page" : undefined}
								onClick={() => handleNavClick(item, index)}
							>
								{item.name}
							</a>
						))}
					</div>
				</div>
			</div>

			<div
				className={`${
					navbarVisible ? "" : "translate-y-14"
				}  left-0 bottom-0 fixed w-full z-[99999] md:hidden transition-all duration-500  `}
			>
				<div className=" flex justify-end pe-4 pb-4">
					<button 
          onClick={() => {
            window.scrollTo({
              top:0,
              behavior: 'smooth'
            })
          }}
          className="bg-red-500 p-2 rounded-full">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={3}
							stroke="currentColor"
							className="size-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m4.5 15.75 7.5-7.5 7.5 7.5"
							/>
						</svg>
					</button>
				</div>
				<div className="flex bg-black pb-3 pt-2 justify-around  h-14">
					{navigation.map((item, index) => (
						<a
							key={index}
							href={item.href}
							className={classNames(
								index === activeIndex
									? " text-red-500 border-b-4 border-red-500"
									: "text-white hover:border-b-4 hover:text-white",
								" px-3  xl:text-xl text-lg font-semibold   box-border "
							)}
							aria-current={index === activeIndex ? "page" : undefined}
							onClick={() => handleNavClick(item, index)}
						>
							{item.name}
						</a>
					))}
				</div>
			</div>
		</>
	);
}
// <Disclosure as="nav"  className={`${navbarVisible ? 'translate-y-[1vh] ' : '-translate-y-14'} transition-all duration-150  bg-transparent fixed w-full z-10`}>
//   {({ open }) => (
//     <>
//       <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-8 ">
//         <div className="relative flex xl:h-16 lg:h-10 items-center justify-between">
//           <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//             {/* Mobile menu button*/}
//             <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
//               <span className="absolute -inset-0.5" />
//               <span className="sr-only">Open main menu</span>
//               {open ? (
//                 <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
//               ) : (
//                 <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
//               )}
//             </DisclosureButton>
//           </div>
//           <div className="flex flex-1 items-center  sm:items-stretch justify-between ">
//             <div className="flex items-center">
//               <a href="/">

//                 <h1 className='uppercase text-red-500  font-bold xl:text-6xl lg:text-3xl text-2xl '>kuymovie</h1>
//               </a>

//             </div>
//             <div className="hidden sm:ml-6 sm:block ">
//               <div className="flex space-x-4 ">
//                 {navigation.map((item, index) => (
//                   <a
//                     key={index}
//                     href={item.href}
//                     className={classNames(
//                       index === activeIndex ? ' text-red-500 border-b-4 border-red-500' : 'text-white hover:border-b-4 hover:text-white',
//                       ' px-3 py-1 xl:text-xl lg:text-base font-semibold  '
//                     )}
//                     aria-current={index === activeIndex ? 'page' : undefined}
//                     onClick={() => handleNavClick(item, index)}
//                   >
//                     {item.name}
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>

//       <DisclosurePanel className="sm:hidden">
//         <div className="space-y-1 px-2 pb-3 pt-2">
//           {navigation.map((item, index) => (
//             <DisclosureButton
//               key={index}
//               as="a"
//               href={item.href}
//               className={classNames(
//                 index === activeIndex ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                 'block rounded-md px-3 py-2 text-base font-medium'
//               )}
//               aria-current={index === activeIndex ? 'page' : undefined}
//               onClick={() => handleNavClick(item, index)}
//             >
//               {item.name}
//             </DisclosureButton>
//           ))}
//         </div>
//       </DisclosurePanel>
//     </>
//   )}
// </Disclosure>
