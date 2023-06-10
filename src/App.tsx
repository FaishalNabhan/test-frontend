import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NearbyPlaces from './components/NearbyPlaces'

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/map" element={<NearbyPlaces />} />
			</Routes>
		</Router>
	)
}

export default App
