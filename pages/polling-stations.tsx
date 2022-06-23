import type { ReactElement } from 'react'
import Layout from '../components/layouts/layout'
import PollsLayout from '../components/layouts/polls'
import { Image, Text, Box } from '@chakra-ui/react'
import type { NextPageWithLayout } from './_app'

const PollingStations: NextPageWithLayout = () => {
  return (
    <main>
        <Box
            display="flex" 
            justifyContent="center"
            px={5}
            py={5}
          >
              <Image src='./no-polling-stations.svg' zIndex={2} alt="Map Pointer" w='380px' h='380px' mt='120px' ml='120'/>
          </Box>
          <Box
              display="flex" 
              alignItems="center" 
              justifyContent="center"
              px={5}
              py={5}
            >
                <Text fontSize={24} color={'#706C6C'}>
                  Not Found!.
                </Text>
            </Box>
    </main>
  )

}

PollingStations.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <PollsLayout>{page}</PollsLayout>
    </Layout>
  )
}

export default PollingStations
