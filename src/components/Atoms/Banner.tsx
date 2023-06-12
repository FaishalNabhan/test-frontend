import React, { useRef, useState, useEffect } from 'react'
import Vector from '../../assets/surabaya_shpedited.png'
import { useNavigate } from 'react-router-dom'
import { useLoadScript } from '@react-google-maps/api'

const libraries: ('places' | 'geometry')[] = ['places']

const Banner: React.FC = () => {
	const navigate = useNavigate()
	const autocompleteInputRef = useRef<HTMLInputElement>(null)
	const [inputValue, setInputValue] = useState('')

	const { isLoaded } = useLoadScript({
		libraries,
	})

	useEffect(() => {
		if (isLoaded && autocompleteInputRef.current) {
			const autocomplete = new google.maps.places.Autocomplete(autocompleteInputRef.current)
			autocomplete.addListener('place_changed', handlePlaceChanged)

			return () => {
				google.maps.event.clearInstanceListeners(autocomplete)
			}
		}
	}, [isLoaded])

	const handlePlaceChanged = () => {
		if (autocompleteInputRef.current) {
			const inputValue = autocompleteInputRef.current.value
			const service = new google.maps.places.PlacesService(document.createElement('div'))
			service.findPlaceFromQuery(
				{
					query: inputValue,
					fields: ['name', 'geometry'],
				},
				(results, status) => {
					if (status === google.maps.places.PlacesServiceStatus.OK) {
						if (results) {
							const { lat, lng } = results[0].geometry.location
							navigate(`/map?lat=${lat()}&lng=${lng()}&name=${results[0].name}`)
						}
					} else {
						alert('Please select a place')
					}
				},
			)
		} else {
			alert('Please select a place')
		}
	}

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value)
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault()
			handlePlaceChanged()
		}
	}

	return (
		<div className="mx-auto grid h-screen max-w-7xl grid-cols-2">
			<div className="flex h-screen flex-col justify-center gap-9">
				<div>
					<h1 className="mb-4 text-7xl font-bold tracking-wider text-white">Muhammad Faishal Nabhan</h1>
					<h1 className="mb-4 text-7xl font-bold tracking-wider text-white">APLIKASI TATA KOTA SURABAYA</h1>
					<p className="text-light mb-5 text-xl text-white">
						Sistem informasi ini merupakan aplikasi pemetaan geografis tempat wisata di wilayah Surabaya.
						Aplikasi ini memuat informasi dari tata kota yang ada di Kota Surabaya.
					</p>
				</div>
				<input
					type="text"
					className="focus:shadow-outline mb-2 h-10 w-1/2 rounded-lg border px-3 text-base text-gray-700 placeholder-gray-600"
					ref={autocompleteInputRef}
					value={inputValue}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					placeholder="Cari tempat ...."
				/>
			</div>
			<div className="flex h-screen flex-col place-content-center items-center justify-center">
				<img className="h-96 w-96 object-cover md:w-full" src={Vector} alt="" />
			</div>
		</div>
	)
}

export default Banner
