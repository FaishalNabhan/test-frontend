import React from 'react'
import Header from '../components/Atoms/Header'
import Banner from '../components/Atoms/Banner'
import About from '../components/Atoms/About'
import Footer from '../components/Atoms/Footer'
import ReactGoogleMapsLoader from 'react-google-maps-loader'

const Home: React.FC = () => {
	return (
		<>
			<ReactGoogleMapsLoader
				params={{
					libraries: 'places',
				}}
				render={(googleMaps: any) => (
					<div>
						<Header />
						<Banner />
					</div>
				)}
			/>
			<About />
			<Footer />
		</>
	)
}

export default Home
