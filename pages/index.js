import { memo, useState, useEffect } from 'react'
import { GoogleMap, LoadScript, MarkerClusterer } from '@react-google-maps/api'
import MapMarker from '../components/MapMarker'

import { csv } from 'd3-fetch'

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


function Home() {
  const [markers, setMarkers] = useState([])
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [selectedMarkerId, setSelectedMarkerId] = useState(null)
  const [noOfClusters, setNoOfClusters] = useState(null)

  useEffect(async () => {
    const data = await csv('data.csv')
    setMarkers(data)
  }, [])

  const click = (isInfoOpen, selectedMarkerId) => {
    setIsInfoOpen(isInfoOpen)
    setSelectedMarkerId(selectedMarkerId)
  }

  return (
    <LoadScript
      googleMapsApiKey='AIzaSyBR4bhA49ee391CkeeNQM4xb9rvH7fOdLg'
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