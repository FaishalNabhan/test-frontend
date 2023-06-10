import React, { useState } from 'react'

interface PlaceInfo {
	places: google.maps.places.PlaceResult[]
	currentLocation: {
		lat: number
		lng: number
	}
}

const Sidebar: React.FC<PlaceInfo> = ({ places, currentLocation }) => {
	const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null)

	const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
		const R = 6371 // Radius of the Earth in kilometers
		const dLat = deg2rad(lat2 - lat1)
		const dLon = deg2rad(lon2 - lon1)

		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
		const distance = R * c

		return distance.toFixed(2) // Return distance rounded to 2 decimal places
	}

	const deg2rad = (deg: number) => {
		return deg * (Math.PI / 180)
	}

	const handleClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, place: google.maps.places.PlaceResult) => {
		setSelectedPlace(place)
	}

	const exitSidebar = () => {
		setSelectedPlace(null)
	}

	console.log(selectedPlace)

	return (
		<div
			className={`
			absolute left-0 top-0 z-50 flex h-screen overflow-hidden p-4
			${selectedPlace ? 'w-1/2' : 'w-1/4'}
		`}
		>
			<div
				className={`
				overflow-scroll bg-white p-5
				${selectedPlace ? 'w-2/4' : 'w-full'}
			`}
			>
				<h2 className="mb-3 font-semibold">Lokasi Terdekat Dari Titik Anda</h2>
				<ul>
					{places?.map((place: google.maps.places.PlaceResult, index: number) => (
						<li
							key={index}
							className="mb-4 cursor-pointer rounded border p-4 transition-all hover:shadow-none"
							onClick={(event) => handleClick(event, place)}
						>
							<h3 className="text-lg font-semibold tracking-wide">{place.name}</h3>
							<p className="mb-2 text-sm">{place.vicinity}</p>
							<p>
								{calculateDistance(
									place?.geometry?.location?.lat(),
									place?.geometry?.location?.lng(),
									/* Pass the latitude and longitude of your current location here */
									currentLocation.lat,
									currentLocation.lng,
								)}{' '}
								km
							</p>
						</li>
					))}
				</ul>
			</div>
			{selectedPlace && (
				<div className="w-full bg-zinc-50 p-5">
					<div className="mb-3 flex justify-between">
						<h3 className="text-lg font-semibold">{selectedPlace.name}</h3>
						<button onClick={exitSidebar} className="text-lg font-bold text-red-600">
							x
						</button>
					</div>
					<div>
						<p className="mb-2 text-sm">{selectedPlace.vicinity}</p>
						<p>
							{calculateDistance(
								selectedPlace?.geometry?.location?.lat(),
								selectedPlace?.geometry?.location?.lng(),
								/* Pass the latitude and longitude of your current location here */
								currentLocation.lat,
								currentLocation.lng,
							)}{' '}
							km
						</p>
						{selectedPlace.website && <p>Website: {selectedPlace.website}</p>}
						{selectedPlace.formatted_phone_number && <p>Phone: {selectedPlace.formatted_phone_number}</p>}
						{selectedPlace.rating && <p>Rating: {selectedPlace.rating}</p>}
						{selectedPlace.opening_hours && (
							<p>Opening Hours: {selectedPlace?.opening_hours?.weekday_text?.join(', ')}</p>
						)}
						{selectedPlace?.plus_code?.compound_code && (
							<p>
								Plus Code:{' '}
								{selectedPlace?.plus_code?.compound_code
									?.replace(/_/g, ' ')
									.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))}
							</p>
						)}
						<p>
							Category:{' '}
							{selectedPlace?.types?.[0]
								.replace(/_/g, ' ')
								.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))}
						</p>
						{selectedPlace?.photos && (
							<div className="mt-3 flex flex-col">
								{selectedPlace?.photos?.map((photo: any, index: number) => (
									<img
										key={index}
										src={photo.getUrl()}
										alt={selectedPlace.name}
										className="aspect-video w-full object-cover"
									/>
								))}
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default Sidebar
