import { useContext, useEffect } from 'react'
import Footer from '../Navigation/footer'
import { ChakraProvider } from '@chakra-ui/react'
import { useLoadScript } from "@react-google-maps/api"
import '@fontsource/barlow'
import '@fontsource/barlow/500.css'
import { getPosition } from '../../hooks'

type ChildrenProps = {
  children: any;
}

import theme from '../../theme'

const Layout = ({ children }: ChildrenProps ) => {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '' ,
    libraries:  ["places"]
  })

  if(!isLoaded) return <div>Loading...</div>


  return (
    <>
      {/* <AppStateProvider> */}
        <ChakraProvider theme={theme}>
          <main>{children}</main>
          {/* <Footer /> */}
        </ChakraProvider>
      {/* </AppStateProvider> */}
    </>
  )
}

export default Layout