import { Box, Image, Text, Flex } from '@chakra-ui/react'

const SmallMap = ({leg}) => {

  console.log(leg)

  return (
    <Box maxWidth='500px' borderRadius='lg' overflow='scroll' position={'absolute'} zIndex={1} right={4} bottom={4} >

      <Text
       color='Black'
       fontWeight='500'
       letterSpacing='wide'
       fontSize='18'
      >Your Locations</Text>

      <Flex>
        <Box 
            mr={4} 
            bg='white' 
            borderRadius='lg'
            boxShadow= 'rgba(0, 201, 147, 0.53) 1px 1px 8px 0' 
            >
            <Flex p='4' pr='8'>
              <Image src='./mapFront.png' alt='Map Visuals' borderRadius='lg' width='77' h='43' boxShadow= '#aaaaaa 1px 1px 8px 0' />

              <Box >
                  <Box
                    color='gray.500'
                    fontWeight='500'
                    letterSpacing='wide'
                    fontSize='14'
                    ml='2'
                  >
                    Your Current Address
                  </Box>
                  <Box
                    color='gray.500'
                    letterSpacing='wide'
                    fontSize='12'
                    ml='2'
                    overflow='auto'
                    width='90%'
                    overflowWrap='break-word'
                  >
                    {leg?.end_address}
                  </Box>

              </Box>
            </Flex>
        </Box>

        <Box  
             borderRadius='lg'
             boxShadow= 'rgba(0, 201, 147, 0.53) 1px 1px 8px 0' bg='white'>
            <Flex p='4' pr='8'>
              <Image src='./mapFront.png' alt='Map Visuals' borderRadius='lg' boxShadow= '#aaaaaa 1px 1px 8px 0' w='77' h='43' />

              <Box >
                  <Box
                    color='gray.500'
                    fontWeight='500'
                    letterSpacing='wide'
                    fontSize='14'
                    ml='2'
                    overflow='auto'
                  >
                    Polling Center Address
                  </Box>
                  <Box
                    color='gray.500'
                    letterSpacing='wide'
                    fontSize='12'
                    ml='2'
                    overflow='auto'
                    width='90%'
                    overflowWrap='break-word'
                  >
                    {leg?.start_address}
                  </Box>

              </Box>
            </Flex>
        </Box>
      </Flex>

      
     
    </Box>
  )
}

export default SmallMap