import React from 'react'

const About: React.FC = () => {
	return (
		<div className="h-screen py-44" id="about">
			<div className="title text-center">
				<h1 className="m-10 text-[30px] font-bold text-white md:text-[40px] lg:text-[50px]">About</h1>
			</div>

			<div className="text-center text-white">
				<p className="px-40">
					Aplikasi ini dibuat mengingat bahwa pengembangan perancangan kota di Surabaya merupakan langkah
					penting untuk mendorong perancangan kota yang lebih baik. Aplikasi ini menyediakan pejabat kota,
					perencana, arsitek, dan pemangku kepentingan lainnya dengan alat yang mereka butuhkan untuk
					merencanakan, mengelola, dan mengendalikan pembangunan perkotaan secara efektif.
				</p>
			</div>
		</div>
	)
}

export default About
