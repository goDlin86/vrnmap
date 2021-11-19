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

function Home() {
  const [data, setData] = useState([])

  const onLoad = async () => {
    const d = await csv('data.csv')
    setData(d.map(i => new google.maps.LatLng(i.lat, i.lng)))
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
        libraries={["visualization"]}
        onLoad={onLoad}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={8}
          options={{ mapId: 'acc1472a2dba089c' }}
        >

          <HeatmapLayer data={data} />
          
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default memo(Home)