import React from 'react'

const Header: React.FC = () => {
	return (
		<nav className="blur-backdrop-filter absolute top-0 w-full bg-opacity-80 bg-clip-padding pb-4 pt-1">
			<div className="mx-10 mt-5 flex justify-between">
				<div className="textlogo pt-1 text-xl text-white">
					<a href="#">
						TATA KOTA <span className="font-bold">Surabaya</span>
					</a>
				</div>
				<div className="">
					<ul className="flex space-x-5 text-white md:space-x-10 md:px-8">
						<li className="px-3 py-1">
							<a href="#" className="hover:text-gray-300">
								Home
							</a>
						</li>
						<li className="px-3 py-1">
							<a href="#about" className="hover:text-gray-300">
								About
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>

		// <div className="relative z-10 w-full bg-gray-900 shadow-sm bg-opacity-80 bg-clip-padding blur-backdrop-filter">
		// 	<nav className="relative flex items-center justify-between w-full max-w-screen-xl px-5 py-5 mx-auto text-white lg:px-2 lg:shadow-none">
		// 		<div className="absolute inset-0 z-0 block w-full h-full shadow-md opacity-50 lg:hidden"></div>
		// 		<button className="z-10 w-10 sm:w-12 md:w-16 lg:hidden opacity-90 focus:outline-none">
		// 			<a href="#home" className="z-10 flex items-center justify-center lg:justify-start lg:space-x-2 focus:outline-none">
		// 				<h2 className="hidden text-xl font-semibold tracking-tight text-white transition duration-200 hover:text-gray-300 lg:block">
		// 					Aplikasi Tata Kota Surabaya
		// 				</h2>
		// 			</a>
		// 		</button>
		// 	</nav>
		// </div>

		// <header className="bg-blue-500 px-6 py-4 text-white">
		// 	<h1 className="text-2xl font-bold">Aplikasi Perencanaan Kota</h1>
		// </header>
	)
}

export default Header
