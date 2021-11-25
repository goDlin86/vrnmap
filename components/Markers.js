import { useState } from 'react'
import { MarkerClusterer } from '@react-google-maps/api'
import MapMarker from './MapMarker'

export default function Markers({ data }) {
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [selectedMarkerId, setSelectedMarkerId] = useState(null)

  const click = (isInfoOpen, selectedMarkerId) => {
    setIsInfoOpen(isInfoOpen)
    setSelectedMarkerId(selectedMarkerId)
  }

  return (
    <MarkerClusterer averageCenter enableRetinaIcons gridSize={40}>
      {clusterer =>
        data.map(markerData => (
          <MapMarker
            key={markerData.id}
            clusterer={clusterer}
            markerData={markerData}
            isSelected={markerData.id === selectedMarkerId}
            isInfoOpen={markerData.id === selectedMarkerId && isInfoOpen}
            onClick={click}
          />
        ))
      }
    </MarkerClusterer>
  )
}