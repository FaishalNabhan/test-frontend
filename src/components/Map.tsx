import React, { useMemo, useState } from 'react'
import { GoogleMap, useLoadScript, Marker, Autocomplete } from '@react-google-maps/api'
import Sidebar from './Sidebar'

const Map: React.FC = () => {
	const libRef = React.useRef(['places'])
	const center = useMemo(
		() => ({
			lat: -7.265757,
			lng: 112.734146,
		}),
		[],
	)

	const surabayaBounds = {
		north: -6.987214,
		south: -7.406542,
		east: 112.817279,
		west: 112.556723,
	}
	const [selected, setSelected] = useState<null | {
		lat: number
		lng: number
	}>(null)
	const [autocomplete, setAutocomplete] = useState<null | google.maps.places.Autocomplete>(null)
	const zoomLevel = selected ? 18 : 14
	const { isLoaded } = useLoadScript({
		libraries: libRef.current as any,
		region: 'ID',
		language: 'id',
	})

	const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
		setAutocomplete(autocomplete)
	}

	const onPlaceChanged = () => {
		if (autocomplete !== null) {
			const place = autocomplete?.getPlace()
			setSelected({
				lat: place.geometry?.location?.lat() || 0,
				lng: place.geometry?.location?.lng() || 0,
			})
		} else {
			console.log('Autocomplete is not loaded yet!')
		}
	}

	if (!isLoaded) return <div>Loading...</div>
	return (
		<GoogleMap
			zoom={zoomLevel}
			onClick={(e) => {
				setSelected({
					lat: e.latLng?.lat() as number,
					lng: e.latLng?.lng() as number,
				})
			}}
			center={selected ? { lat: selected.lat, lng: selected.lng } : center}
			mapContainerClassName="w-full h-full"
			options={{
				restriction: {
					latLngBounds: surabayaBounds,
					strictBounds: true,
				},
			}}
		>
			<Autocomplete
				onLoad={onLoad}
				onPlaceChanged={onPlaceChanged}
				options={{
					componentRestrictions: { country: 'id' },
				}}
			>
				<input
					type="text"
					placeholder="Enter your address"
					style={{
						boxSizing: `border-box`,
						border: `1px solid transparent`,
						width: `240px`,
						height: `32px`,
						padding: `0 12px`,
						borderRadius: `3px`,
						boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
						fontSize: `14px`,
						outline: `none`,
						textOverflow: `ellipses`,
						position: 'absolute',
						left: '50%',
						marginLeft: '-120px',
						top: '10px',
					}}
				/>
			</Autocomplete>
			{selected ? (
				<Marker
					position={{ lat: selected.lat, lng: selected.lng }}
					onClick={() => {
						setSelected(null)
					}}
				/>
			) : null}
		</GoogleMap>
	)
}

export default Map
