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
} from '@headlessui/react'
import { Bars3Icon,  XMarkIcon } from '@heroicons/react/24/outline'
import { useState, useRef, useEffect } from 'react'

const navigation = [
  { name: 'Home', href: '/', current: null },
  { name: 'Movies', href: '/movie', current: null },
  { name: 'Tv Series', href: '/tv-series', current: null },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function MyNav() {
  
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const index = navigation.findIndex(item => item.href === currentPath);
    setActiveIndex(index);
  }, []);

  const handleNavClick = (item, index) => {
    setActiveIndex(index);
  };

	const [navbarVisible, setNavbarVisible] = useState(true);
  
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setNavbarVisible(false);
      } else {
        setNavbarVisible(true);
      }
    };
  
  window.addEventListener('scroll', handleScroll);

  return (
    <Disclosure as="nav"  className={`${navbarVisible ? 'translate-y-0 ' : '-translate-y-14'} transition-all duration-150  bg-transparent fixed w-full z-10`}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center  sm:items-stretch xl:justify-between sm:justify-start">
                <div className="flex items-center">
                  <a href="/">

                    <h1 className='uppercase font-mono font-bold text-4xl'>kuymovie</h1>
                  </a>

                </div>
                <div className="hidden sm:ml-6 sm:block ">
                  <div className="flex space-x-4 ">
                    {navigation.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className={classNames(
                          index === activeIndex ? ' text-red-500 border-b-4 border-red-500' : 'text-white hover:border-b-4 hover:text-white',
                          ' px-3 py-1 text-md font-semibold '
                        )}
                        aria-current={index === activeIndex ? 'page' : undefined}
                        onClick={() => handleNavClick(item, index)}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item, index) => (
                <DisclosureButton
                  key={index}
                  as="a"
                  href={item.href}
                  className={classNames(
                    index === activeIndex ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={index === activeIndex ? 'page' : undefined}
                  onClick={() => handleNavClick(item, index)}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}
