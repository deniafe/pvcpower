import type { ReactElement } from 'react'
import Map from '../components/Map'
import Layout from '../components/layouts/layout'
import PollsLayout from '../components/layouts/polls'
import type { NextPageWithLayout } from './_app'
import { useState, useRef, useMemo } from 'react'
import { GoogleMap} from '@react-google-maps/api'
import Home from '../styles/Home.module.css'
import AddressInfoBox from '../components/AddressInfoBox'
import SmallMap from '../components/SmallMap'

type LatLngLiteral = google.maps.LatLngLiteral
type DirectionsResult = google.maps.DirectionsResult 

const Polls: NextPageWithLayout = () => {
  const [office, setOffice] = useState<LatLngLiteral>();
  const mapRef = useRef<GoogleMap>();
  const [directions, setDirections] = useState<DirectionsResult>();

  const  center = useMemo<LatLngLiteral>(() => ({lat: 6.404736138, lng: 3.393873833}), [])

  return (
    <>
      <main className={Home.mainAd}>
        <SmallMap leg={directions?.routes[0].legs[0]} />
        <Map mapRef={mapRef} mapStyle={Home.mapAdContainer} office={office} setDirections={setDirections} directions={directions} pointer={"./MapCircleSmall.png"} />
        <AddressInfoBox setOffice={setOffice} mapRef={mapRef} directions={directions} />
      </main>
    </>
  )

}

Polls.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <PollsLayout>{page}</PollsLayout>
    </Layout>
   
  )
}

export default Polls
