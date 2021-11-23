import Head from 'next/head'
import { memo, useState } from 'react'
import { GoogleMap, LoadScript, HeatmapLayer } from '@react-google-maps/api'

import { csv } from 'd3-fetch'

import styles from '../../styles/Home.module.css'

const containerStyle = {
  width: '100%',
  height: '90vh'
}

const center = {
  lat: 50.9,
  lng: 40.9
}

const libraries = ['visualization']

function Home() {
  const [data, setData] = useState([])

  const onLoad = async () => {
    const d = await csv('data.csv')
    setData(
      d.map(i => {
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

          <HeatmapLayer data={data} options={{ radius: 30 }} />
          
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default memo(Home)