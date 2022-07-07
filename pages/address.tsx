import type { ReactElement } from 'react'
import { useState, useRef, useMemo, useEffect } from 'react'
import { useRouter } from 'next/router'
import Map from '../components/Map'
import Layout from '../components/layouts/layout'
import PollsLayout from '../components/layouts/polls'
import type { NextPageWithLayout } from './_app'
import { GoogleMap} from '@react-google-maps/api'
import Home from '../styles/Home.module.css'
import AddressInfoBox from '../components/AddressInfoBox'
import SmallMap from '../components/SmallMap'
import AddressBoxPointer from '../components/AddressBoxPointer'
import { PollsData } from '../data/Data'
import { distance, distance2 } from '../hooks'

type LatLngLiteral = google.maps.LatLngLiteral
type DirectionsResult = google.maps.DirectionsResult 
type PollLatLng = { lat: number; lng: number; lga: string; }

const Polls: NextPageWithLayout = () => {
  const router = useRouter()
  const query = router.query
  const lat = query.lat && typeof query.lat !== 'object' ? query.lat : ''
  const lng = query.lng && typeof query.lng !== 'object' ? query.lng : ''
  const initialLocation = {lat: parseFloat(lat), lng: parseFloat(lng)}
  const [office, setOffice] = useState<LatLngLiteral>(initialLocation);
  const [pollingCenter, setPollingCenter] = useState<LatLngLiteral>();
  const [pollingAddress, setPollingAddress] = useState<PollLatLng>();
  const [ward, setWard] = useState('')
  const mapRef = useRef<GoogleMap>();
  const [directions, setDirections] = useState<DirectionsResult>();

  const pollingCenters = useMemo(() => PollsData, [])

  const polls = pollingCenters?.map((centers, i) => {
    const lga: string = pollingCenters[i].lga
    return pollingCenters[i].pollingUnits.map((center) => {
        const poll =  {lat: parseFloat(center.lat) , lng: parseFloat(center.long), lga}
        return poll
    })
  })

  const flattenedPolls = polls.reduce((acc, curVal) => {
      return acc.concat(curVal)
  }, [])

  const center = useMemo<LatLngLiteral>(() => ({lat: 6.404736138, lng: 3.393873833}), [])

  useEffect(() => {
    const startIndex =  pollingAddress && pollingAddress.lga.indexOf(':') + 2
    const endIndex = pollingAddress && pollingAddress.lga.lastIndexOf('RA') - 1
    const ward = pollingAddress && pollingAddress.lga.slice(startIndex, endIndex)
    ward && setWard(ward)
  }, [pollingAddress])

  console.log(directions)

  return (
    <>
      <main className={Home.mainAd}>
        <SmallMap leg={directions?.routes[0].legs[0]} />
        {directions && <AddressBoxPointer leg={directions?.routes[0].legs[0]} />}
        <Map 
            mapRef={mapRef} 
            flattenedPolls={flattenedPolls} 
            mapStyle={Home.mapAdContainer} 
            office={office} 
            pollingCenter={pollingCenter} 
            setPollingCenter={setPollingCenter} 
            setPollingAddress={setPollingAddress}
            setDirections={setDirections}  
            directions={directions} 
            pointer={"./MapCircleSmall.png"} 
            center={center}
        />
        <AddressInfoBox setOffice={setOffice}  pollingCenter={pollingCenter}  mapRef={mapRef} directions={directions} ward={ward} steps={directions?.routes[0].legs[0].steps} />
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
