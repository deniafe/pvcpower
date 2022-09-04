import type { ReactElement } from 'react'
import { useState, useRef, useMemo, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { Box, Show, useDisclosure, useToast } from '@chakra-ui/react'
import Map from '../components/Map'
import Layout from '../components/layouts/layout'
import PollsLayout from '../components/layouts/polls'
import type { NextPageWithLayout } from './_app'
import { GoogleMap} from '@react-google-maps/api'
import Home from '../styles/Home.module.css'
import AddressInfoBox from '../components/AddressInfoBox'
import SmallMap from '../components/SmallMap'
import AddressBoxPointer from '../components/AddressBoxPointer'
import CommentPopup from '../components/CommentPopup'
import { PollsData } from '../data/Data'
import { distance, distance2 } from '../hooks'
import { AppStateContext } from '../contexts/AppStateContext'
import { useMediaQuery } from '@chakra-ui/react'
import BottomDrawer from '../components/BottomDrawer'


type LatLngLiteral = google.maps.LatLngLiteral
type DirectionsResult = google.maps.DirectionsResult 
type PollLatLng = { lat: number; lng: number; lga: string; }

const Polls: NextPageWithLayout = () => {
  const [currentLocation, setCurrentLocation] = useState<LatLngLiteral>();
  const [pollingCenter, setPollingCenter] = useState<LatLngLiteral>();
  const [pollingAddress, setPollingAddress] = useState<PollLatLng>();
  const [ward, setWard] = useState('')
  const mapRef = useRef<GoogleMap>();
  const [comment, setComment] = useState('');// description
  const [directions, setDirections] = useState<DirectionsResult>();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { state, dispatch } = useContext(AppStateContext);
  const [sm, md] = useMediaQuery(['(min-width: 30em)', '(min-width: 48em)'])
  const toast = useToast()


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

  const showMessage = ({status, message, title}: {title: string, message: string, status: "info" | "warning" | "success" | "error" | "loading" | undefined}) =>
  toast({
    title: title,
    position: 'top-right',
    description: message,
    status: status,
    duration: 9000,
    isClosable: true,
  })

  const center = useMemo<LatLngLiteral>(() => ({lat: 6.404736138, lng: 3.393873833}), [])

  useEffect(() => {
    const startIndex =  pollingAddress && pollingAddress.lga.indexOf(':') + 2
    const endIndex = pollingAddress && pollingAddress.lga.lastIndexOf('RA') - 1
    const ward = pollingAddress && pollingAddress.lga.slice(startIndex, endIndex)
    ward && setWard(ward)
    dispatch({type: 'SET_CURRENT_WARD', payload: ward || ''})
  }, [pollingAddress])

  useEffect(() => {
    const initialLocation = state.currentLocation || {lat: 6.404736138, lng: 3.393873833}
    setCurrentLocation(initialLocation)
    setDirections(state.directions)

  }, [state])


  return (
    <>
      <main className={Home.mainAd}>
        <Box  display={{base: 'none', lg: 'inline'}}>
           <SmallMap leg={directions?.routes[0].legs[0]} />
        </Box>
        {/* <Box display={{base: 'none', lg: 'inline'}}> */}
          {directions && <AddressBoxPointer leg={directions?.routes[0].legs[0]} />}
        {/* </Box>  */}
        
        <Map 
            mapRef={mapRef} 
            flattenedPolls={flattenedPolls} 
            mapStyle={ sm ? Home.mapContainer : Home.mapAdContainer} 
            currentLocation={currentLocation} 
            pollingCenter={pollingCenter} 
            setPollingCenter={setPollingCenter} 
            setPollingAddress={setPollingAddress}
            pointer={"./MapCircleSmall.png"} 
            center={center}
            directions={directions} 
            setDirections={setDirections} 
        />
        <Box  display={{base: 'none', md: 'inline'}}>
          <AddressInfoBox onOpen={onOpen} setComment={setComment} comment={comment} showMessage={showMessage}  pollingCenter={pollingCenter}  mapRef={mapRef} ward={ward} setCurrentLocation={setCurrentLocation} currentLocation={currentLocation} directions={directions} setDirections={setDirections} />
        </Box>

        <Show below='md'>
          <BottomDrawer  onOpen={onOpen} setComment={setComment} comment={comment} showMessage={showMessage}  pollingCenter={pollingCenter}  mapRef={mapRef} ward={ward} setCurrentLocation={setCurrentLocation} currentLocation={currentLocation} directions={directions} setDirections={setDirections} />
        </Show>

        <CommentPopup setComment={setComment} showMessage={showMessage} pollingCenter={pollingCenter} isOpen={isOpen} onOpen={onOpen} onClose={onClose} comment={comment}  />
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
