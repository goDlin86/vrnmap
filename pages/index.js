import Head from 'next/head'
import { memo, useState } from 'react'
import { GoogleMap, LoadScript, MarkerClusterer, HeatmapLayer } from '@react-google-maps/api'
import Markers from '../components/Markers'

import { csv } from 'd3-fetch'

import styles from '../styles/Home.module.css'

const containerStyle = {
  width: '100%',
  height: '80vh'
}

const center = {
  lat: 50.9,
  lng: 40.9
}

const libraries = ['visualization']

function Home() {
  const [markers, setMarkers] = useState([])
  const [heatmap, setHeatmap] = useState([])

  const [markersVisible, setMarkersVisible] = useState(true)
  const [heatmapVisible, setHeatmapVisible] = useState(false)

  const onLoad = async () => {
    const data = await csv('data.csv')
    setMarkers(data)
    setHeatmap(
      data.map(i => {
        const weight = Math.min(i.population / 100, 50)
        return { location: new google.maps.LatLng(i.lat, i.lng), weight }
      })
    )
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>VrnMap</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Населенные пункты Воронежской области</h1>
      <div className={styles.labels}>
        <label>
          <input type="checkbox"
            checked={markersVisible}
            onChange={() => setMarkersVisible(!markersVisible)}
          />
          Markers
        </label>
        <label>
          <input type="checkbox"
            checked={heatmapVisible}
            onChange={() => setHeatmapVisible(!heatmapVisible)}
          />
          Heatmap
        </label>
      </div>

      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLEMAPAPIKEY}
        libraries={libraries}
        onLoad={onLoad}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={8}
          options={{ mapId: process.env.NEXT_PUBLIC_GOOGLEMAPID }}
        >

          {markersVisible && <Markers data={markers} />}
          {heatmapVisible && <HeatmapLayer data={heatmap} options={{ radius: 30 }} />}
          
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default memo(Home)