import type { ReactElement } from 'react'
import { useRef, useState } from 'react'

import Map from '../components/Map'
import { GoogleMap } from '@react-google-maps/api'

import Layout from '../components/layouts/layout'
import type { NextPageWithLayout } from './_app' 
import Navbar from '../components/Navigation/navbar'
import { Image,Flex } from '@chakra-ui/react'
import Home from '../styles/Home.module.css'
import IntroBox from '../components/IntroBox'

type LatLngLiteral = google.maps.LatLngLiteral


const Page: NextPageWithLayout = () => {
  const mapRef = useRef<GoogleMap>();
  const [position, setPosition] = useState<LatLngLiteral>();
  // const  center = useMemo<LatLngLiteral>(() => ({lat: 6.404736138, lng: 3.393873833}), [])

  // If browser supports navigator.geolocation, generate Lat/Long else let user know there is an error
  const getPosition = () => {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, posError); // Passing in a success callback and an error callback fn
    } else {
    alert("Sorry, Geolocation is not supported by this browser."); // Alert is browser does not support geolocation
    }
  }

    // Geolocation error callback fn. Query permissions to check if the error occured due to user not allowing location to be shared
    const posError = () => {
      if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then(res => {
      if (res.state === 'denied') {
      alert('Enable location permissions for this website in your browser settings.')
      }
      })
      } else {
      alert('Unable to access your location. You can continue by submitting location manually.') // Obtaining Lat/long from address necessary
      }
    }

    // Geolocation success callback fn
    const showPosition = (position) => {
      let lat = position.coords.latitude // You have obtained latitude coordinate!
      let lng = position.coords.longitude // You have obtained longitude coordinate!
      console.log(' Current usr position', {lat, lng})
      setPosition({lat, lng})
    }

  
  return (
    <>
      <Map mapStyle={Home.mapContainer} mapRef={mapRef} center={position} pointer="./Map circle.png"/>
      <Flex>
        <IntroBox getLocation={getPosition}/>
        <Image src='./Map circle.png' zIndex={2} alt="Map Pointer" w='380px' h='380px' mt='120px' ml='120'/>
      </Flex>

    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <main className={Home.main}>
      <Layout>
      <Navbar />
        {page}
      </Layout>
      </main>
  )
}

export default Page
