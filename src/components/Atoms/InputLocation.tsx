import { Autocomplete, useLoadScript } from '@react-google-maps/api'
import React from 'react'

export const InputLocation = () => {
	const [autocomplete, setAutocomplete] = React.useState<null | google.maps.places.Autocomplete>(null)

	const { isLoaded } = useLoadScript({
		libraries: ['places'],
	})

	const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
		setAutocomplete(autocomplete)
	}

	const onPlaceChanged = () => {
		if (autocomplete !== null) {
			const place = autocomplete?.getPlace()
			console.log(place)
		} else {
			console.log('Autocomplete is not loaded yet!')
		}
	}

	return (
		<Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
			<input type="text" placeholder="Enter your address" className="" />
		</Autocomplete>
	)
}
