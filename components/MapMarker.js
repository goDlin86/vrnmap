import { useState } from 'react'
import { InfoWindow, Marker } from '@react-google-maps/api'

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
          <p>Население - {markerData.population}</p>
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
    >
      {renderInfoWindow()}
    </Marker>
  )
}