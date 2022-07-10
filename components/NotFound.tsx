import React from 'react'
import { Box, Image, Text } from '@chakra-ui/react'

const NotFound = ({message}: {message: string}) => {
  return (
    <div>
      <Box
          display="flex" 
          justifyContent="center"
          px={5}
        >
            <Image src='./past-result.svg' zIndex={2} alt="Map Pointer" w='300px' h='300px' mt='50px' ml='120'/>
        </Box>
        <Box
            display="flex" 
            justifyContent="center"
            px={50}
            py={5}
          >
              <Text textAlign={'center'} fontSize={24} color={'#706C6C'}>
                 {message}
              </Text>
          </Box>
    </div>
  )
}

export default NotFound