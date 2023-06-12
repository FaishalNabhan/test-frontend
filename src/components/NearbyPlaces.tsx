import React, { useState, useEffect } from 'react'
import { GoogleMap, useLoadScript, Marker, Autocomplete } from '@react-google-maps/api'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'

interface PlaceInfo {
	name: string
	vicinity: string
	distance: number
	position: {
		lat: number
		lng: number
	}
}

const NearbyPlaces: React.FC = () => {
	const location = useLocation()
	const searchParams = new URLSearchParams(location.search)
	const lat = parseFloat(searchParams.get('lat') || '') || -7.265757
	const lng = parseFloat(searchParams.get('lng') || '') || 112.734146

	const [map, setMap] = useState<google.maps.Map>(
		new google.maps.Map(document.createElement('div'), {
			center: { lat, lng },
			zoom: 15,
		}),
	)
	const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([])
	const [selectedPlace, setSelectedPlace] = useState<PlaceInfo | null>(null)
	const [autocomplete, setAutocomplete] = useState<null | google.maps.places.Autocomplete>(null)
	const surabayaCenter = {
		lat: -7.265757,
		lng: 112.734146,
	}
	const [center, setCenter] = useState({ lat, lng })

	const libraries: ('places' | 'geometry')[] = ['places']
	const mapContainerStyle = {
		width: '100%',
		height: '100vh',
	}
	const options: google.maps.MapOptions = {
		disableDefaultUI: true,
		zoomControl: true,
		restriction: {
			latLngBounds: {
				north: -6.987214,
				south: -7.406542,
				east: 112.817279,
				west: 112.556723,
			},
			strictBounds: true,
		},
	}

	const { isLoaded, loadError } = useLoadScript({
		libraries,
	})

	useEffect(() => {
		setCenter({ lat, lng })
	}, [lat, lng])

	const onLoad = (map: google.maps.Map) => {
		setMap(map)
		searchNearbyPlaces({ lat, lng })
		map.addListener('click', handleClick)
	}

	const onAutocompleteLoad = (autocomplete: google.maps.places.Autocomplete) => {
		setAutocomplete(autocomplete)
	}

	const handleClick = (e: google.maps.KmlMouseEvent) => {
		const clickedLocation = {
			lat: e.latLng?.lat() as number,
			lng: e.latLng?.lng() as number,
		}
		setCenter(clickedLocation)
		searchNearbyPlaces(clickedLocation)
	}

	const searchNearbyPlaces = (center: google.maps.LatLng) => {
		if (!map) return console.log('Map is not loaded')
		const service = new window.google.maps.places.PlacesService(map)
		const request: google.maps.places.PlaceSearchRequest = {
			location: center,
			radius: 3000,
			// show all nearby places with all types
			type: [
				'restaurant',
				'cafe',
				'bakery',
				'meal_delivery',
				'meal_takeaway',
				'food',
				'bar',
				'supermarket',
				'store',
				'shopping_mall',
				'*',
			],
		}
		service.nearbySearch(request, (results, status) => {
			if (status === google.maps.places.PlacesServiceStatus.OK) {
				setPlaces(results)
			}
		})
	}

	const onPlaceChanged = () => {
		if (autocomplete !== null) {
			const place = autocomplete.getPlace()
			setCenter({
				lat: place.geometry?.location?.lat() || 0,
				lng: place.geometry?.location?.lng() || 0,
			})
			searchNearbyPlaces(place.geometry?.location as google.maps.LatLng)
		} else {
			console.log('Autocomplete is not loaded yet!')
		}
	}

	if (loadError) return <div>Error loading maps</div>
	if (!isLoaded) return <div>Loading maps</div>

	return (
		<>
			{<Sidebar places={places} currentLocation={center} />}
			<GoogleMap
				mapContainerStyle={mapContainerStyle}
				center={center}
				zoom={center ? 16 : 12}
				options={options}
				onLoad={onLoad}
				heading={90}
			>
				<Autocomplete
					onLoad={onAutocompleteLoad}
					onPlaceChanged={onPlaceChanged}
					options={{
						componentRestrictions: { country: 'id' },
					}}
				>
					<input
						type="text"
						placeholder="Enter your address"
						className="absolute left-1/2 top-4 -ml-32 h-10 w-96 rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
					/>
				</Autocomplete>
				{center.lat !== surabayaCenter.lat && center.lng !== surabayaCenter.lng && (
					<Marker position={center} label="Titik tengah" animation={google.maps.Animation.BOUNCE} />
				)}
				{places.map((place, index) => (
					<Marker
						key={index}
						position={{
							lat: place.geometry!.location.lat(),
							lng: place.geometry!.location.lng(),
						}}
						onClick={() => handleMarkerClick(place)}
					/>
				))}
			</GoogleMap>
		</>
	)
}

export default NearbyPlaces
