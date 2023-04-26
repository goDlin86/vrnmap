import Map from '../components/MapContainer'

import styles from '../styles/Home.module.css'

export default async function Page() {
  return (
    <div className={styles.container}>
      <h1>Населенные пункты Воронежской области</h1>
      <Map />
    </div>
  )
}