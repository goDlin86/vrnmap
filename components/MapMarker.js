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

  const renderInfoWindow = markerId => {
    if (!isInfoOpen || !isSelected || !mapMarker) {
      return null
    }

    return (
      <InfoWindow anchor={mapMarker} onCloseClick={click}>
        <div>I am Marker {markerId}</div>
      </InfoWindow>
    )
  }

  return (
    <Marker
      clusterer={clusterer}
      onLoad={onLoad}
      onClick={click}
      position={{
        lat: markerData.lat,
        lng: markerData.lng
      }}
    >
      {renderInfoWindow(markerData.id)}
    </Marker>
  )
}