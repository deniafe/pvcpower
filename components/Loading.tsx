import React from 'react'
import { Box, Spinner } from '@chakra-ui/react'

const Loading = () => {
  return (
    <Box
         display="flex"
         justifyContent={'center'}
         alignItems="center"
         p={20}
         pt={10}
         height={'100vh'}
        >
          <Spinner
            color='#00CA90'
            size='xl'
          />
        </Box>
  )
}

export default Loading