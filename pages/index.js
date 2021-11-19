import Head from 'next/head'
import { memo, useState, useEffect } from 'react'
import { GoogleMap, LoadScript, MarkerClusterer } from '@react-google-maps/api'
import MapMarker from '../components/MapMarker'

import { csv } from 'd3-fetch'

import styles from '../styles/Home.module.css'

const containerStyle = {
  width: '100%',
  height: '90vh'
}

const center = {
  lat: 50.9,
  lng: 40.9
}

function Home() {
  const [markers, setMarkers] = useState([])
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [selectedMarkerId, setSelectedMarkerId] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const data = await csv('data.csv')
      setMarkers(data)
    }
    fetchData()
  }, [])

  const click = (isInfoOpen, selectedMarkerId) => {
    setIsInfoOpen(isInfoOpen)
    setSelectedMarkerId(selectedMarkerId)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>VrnMap</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Населенные пункты Воронежской области</h1>

      <LoadScript
        googleMapsApiKey={process.env.GOOGLEMAPAPIKEY}
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
    </div>
  )
}

export default memo(Home)