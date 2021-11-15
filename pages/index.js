import { memo, useState } from 'react'
import { GoogleMap, LoadScript, MarkerClusterer } from '@react-google-maps/api'
import MapMarker from '../components/MapMarker'

import styles from '../styles/Home.module.css'

const containerStyle = {
  margin: '100px auto',
  width: '800px',
  height: '600px'
}

const center = {
  lat: 50.9,
  lng: 40.9
}

const markers = [
  { id: 1, lat: 51.48333, lng: 40.41667 },
  { id: 2, lat: 51.6207528, lng: 40.4791417 },
  { id: 3, lat: 51.3927028, lng: 40.7979333 },
]


function Home() {
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [selectedMarkerId, setSelectedMarkerId] = useState(null)
  const [noOfClusters, setNoOfClusters] = useState(null)

  const click = (isInfoOpen, selectedMarkerId) => {
    setIsInfoOpen(isInfoOpen)
    setSelectedMarkerId(selectedMarkerId)
  }

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBR4bhA49ee391CkeeNQM4xb9rvH7fOdLg"
      mapIds={['acc1472a2dba089c']}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={8}
        options={{ mapId: 'acc1472a2dba089c' }}
      >

        <MarkerClusterer averageCenter enableRetinaIcons gridSize={60}>
          {clusterer =>
            markers.map(markerData => (
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
        
      </GoogleMap>
    </LoadScript>
  )
}

export default memo(Home)