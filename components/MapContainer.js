'use client'

import { useState, useEffect } from 'react'
import Map from './Map'

import styles from '../styles/Home.module.css'

export default function MapContainer() {
  const [markersVisible, setMarkersVisible] = useState(true)
  const [heatmapVisible, setHeatmapVisible] = useState(false)
  const [circlesVisible, setCirclesVisible] = useState(false)

  return (
    <>
      <div className={styles.labels}>
        <label>
          <input type="checkbox"
            checked={markersVisible}
            onChange={() => setMarkersVisible(!markersVisible)}
          />
          Маркеры
        </label>
        <label>
          <input type="checkbox"
            checked={heatmapVisible}
            onChange={() => setHeatmapVisible(!heatmapVisible)}
          />
          Тепловая карта
        </label>
        <label>
          <input type="checkbox"
            checked={circlesVisible}
            onChange={() => setCirclesVisible(!circlesVisible)}
          />
          Население
        </label>
      </div>

      <Map markersVisible={markersVisible} heatmapVisible={heatmapVisible} circlesVisible={circlesVisible} />
    </>
  )
}