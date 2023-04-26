import { useState } from 'react'
import { InfoWindow, Marker } from '@react-google-maps/api'
import millify from 'millify'

import styles from '../styles/Home.module.css'

export default function MapMarker({ clusterer, markerData, isInfoOpen, isSelected, onClick }) {
  const [mapMarker, setMapMarker] = useState(null)

  const onLoad = mapMarker => {
    setMapMarker(mapMarker)
  }

  const click = () => {
    const isOpen = isSelected ? !isInfoOpen : true
    onClick(isOpen, markerData.id)
  }

  const renderInfoWindow = () => {
    if (!isInfoOpen || !isSelected || !mapMarker) {
      return null
    }

    return (
      <InfoWindow anchor={mapMarker} onCloseClick={click}>
        <div>
          <h2>{markerData.name}</h2>
          <p>{markerData.status}</p>
          {markerData.population && <p>Население - {markerData.population}</p>}
          {markerData.year && <h3>Год основания - {markerData.year}</h3>}
        </div>
      </InfoWindow>
    )
  }

  return (
    <Marker
      clusterer={clusterer}
      onLoad={onLoad}
      onClick={click}
      position={{
        lat: parseFloat(markerData.lat),
        lng: parseFloat(markerData.lng)
      }}
      label={{ text: markerData.population ? millify(markerData.population) : 0, fontSize: '10px' }}
    >
      {renderInfoWindow()}
    </Marker>
  )
}