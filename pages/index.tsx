import type { ReactElement } from 'react'
import { useRef, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { Image, Box, Spacer } from '@chakra-ui/react'

import Map from '../components/Map'
import { GoogleMap } from '@react-google-maps/api'

import Layout from '../components/layouts/layout'
import type { NextPageWithLayout } from './_app' 
import Navbar from '../components/Navigation/navbar'
import Home from '../styles/Home.module.css'
import IntroBox from '../components/IntroBox'
import { AppStateContext } from '../contexts/AppStateContext'
import { useDisclosure } from '@chakra-ui/react'



type LatLngLiteral = google.maps.LatLngLiteral


const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const mapRef = useRef<GoogleMap>();
  const [position, setPosition] = useState<LatLngLiteral>();
  const { dispatch } = useContext(AppStateContext);

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
    const showPosition = (position: any) => {
      let lat: number = position.coords.latitude // You have obtained latitude coordinate!
      let lng: number = position.coords.longitude // You have obtained longitude coordinate!
  
      dispatch({type: 'SET_CURRENT_LOCATION', payload: {lat, lng}})
      setPosition({lat, lng})
      router.push('/address')
    }
  
  return (
    <>
      <Map mapStyle={Home.mapContainer} mapRef={mapRef} center={position} pointer="./Map circle.png"/>
      <Box display={{md: 'flex'}}>
        <Spacer></Spacer>
        <IntroBox getLocation={getPosition}/>
        <Spacer></Spacer>
        <Image 
          display={{base: 'none', md: 'inline'}}
          src='./Map circle.png' 
          zIndex={2} 
          alt="Map Pointer" 
          w={{md: '300px', lg: '380px'}}
          h={{md: '300px', lg: '380px'}}
          mt='120px' 
          // mr={{md: '6%', xl: '15%'}}
        />
        <Spacer></Spacer>
      </Box>

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
