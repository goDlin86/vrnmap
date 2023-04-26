import { useCallback, useState } from 'react'
import { GoogleMap, LoadScriptNext, HeatmapLayer, Circle } from '@react-google-maps/api'
import Markers from './Markers'

import { csv } from 'd3-fetch'

const containerStyle = {
  width: '100%',
  height: '80vh'
}

const center = {
  lat: 50.9,
  lng: 40.9
}

const libraries = ['visualization']

const circleOptions = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  center: {
    lat: 50.9,
    lng: 40.9
  },
  radius: 3000,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  zIndex: 1,
}

export default function Map({ markersVisible, heatmapVisible, circlesVisible }) {
  const [markers, setMarkers] = useState([])
  const [heatmap, setHeatmap] = useState([])

  const onLoad = useCallback(async () => {
    const data = await csv('data.csv')
    setMarkers(data)
    setHeatmap(
      data.map(i => {
        const weight = Math.min(i.population / 100, 50)
        return { location: new google.maps.LatLng(i.lat, i.lng), weight }
      })
    )
  }, [])

  return (
    <LoadScriptNext
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLEMAPAPIKEY}
      libraries={libraries}
      onLoad={onLoad}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={8}
        center={center}
        options={{ mapId: process.env.NEXT_PUBLIC_GOOGLEMAPID }}
      >

        {markersVisible && <Markers data={markers} />}
        {heatmapVisible && <HeatmapLayer data={heatmap} options={{ radius: 30 }} />}
        {circlesVisible && <Circle options={circleOptions} />}
        
      </GoogleMap>
    </LoadScriptNext>
  )
}