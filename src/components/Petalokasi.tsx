import React from 'react'
import Map from './Map'
import Sidebar from './Sidebar'
import { InputLocation } from './Atoms/InputLocation'

const Petalokasi: React.FC = () => {
	const style = {
		margin: 'auto',
		width: '95%',
		height: '95vh',
	}
	return (
		<div className="peta-lokasi" id="peta-lokasi">
			<div className="title text-center">
				<h1 className="m-10 text-[30px] font-bold text-white md:text-[40px] lg:text-[50px]">
					Peta Lokasi Surabaya
				</h1>
			</div>

			<div className="map" style={style}>
				<Map />
			</div>
		</div>
	)
}

export default Petalokasi
