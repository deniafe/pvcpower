import type { ReactElement } from 'react'
import Layout from '../components/layouts/layout'
import PollsLayout from '../components/layouts/polls'
import { Image, Text, Box } from '@chakra-ui/react'
import type { NextPageWithLayout } from './_app'

const PastResults: NextPageWithLayout = () => {
  return (
    <main>
        {/* <Box
          display="flex" 
          justifyContent="center"
          px={5}
          py={5}
        >
            <Image src='./past-result.svg' zIndex={2} alt="Map Pointer" w='380px' h='380px' mt='120px' ml='120'/>
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
          </Box> */}
          <iframe title="Election Dashboard" width="1000" height="600" src="https://app.powerbi.com/view?r=eyJrIjoiNzU3MTA2ZDctOGQ0Mi00YTgzLWEzZTctMTUyNDgxNGUzN2JlIiwidCI6ImEwNTAxYzkzLWJhOWItNDM1NC05NmM3LTMyYTBmYzA5YzU2ZSJ9&pageName=ReportSection46872dbe93d64a1c7206" frameBorder="0" allowFullScreen={true}></iframe>
    </main>
  )

}

PastResults.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <PollsLayout>{page}</PollsLayout>
    </Layout>
  )
}

export default PastResults
