import { Box, Image, Text, Flex } from '@chakra-ui/react'

type ChildrenProps = {
  leg: any
}

const SmallMap = ({leg}: ChildrenProps) => {

  console.log(leg)

  return (
    <Box maxWidth='500px' px={4} height="120px" borderRadius='lg' overflow='scroll' position={'absolute'} zIndex={1} right={4} bottom={4} >

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
            borderRadius='base'
            boxShadow= 'rgba(0, 201, 147, 0.53) 1px 1px 8px 0' 
            maxHeight="75px"
            maxWidth="230px"
             width="230px"
            >
            <Flex p='2' pt='3' pr='4'>
              <Image src='./mapfront.png' alt='Map Visuals' borderRadius='base' width='77' h='43' boxShadow= '#aaaaaa 1px 1px 2px 0px' />

              <Box 
                 overflow='scroll'
                 height='55px'
              >
                  <Box
                    color='gray.500'
                    fontWeight='500'
                    letterSpacing='wide'
                    fontSize='12'
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
                    {leg?.start_address}
                  </Box>

              </Box>
            </Flex>
        </Box>

        <Box  
             borderRadius='base'
             maxHeight="75px"
             maxWidth="230px"
             width="230px"
             boxShadow= 'rgba(0, 201, 147, 0.53) 1px 1px 8px 0' bg='white'>
            <Flex p='2' pt='3' pr='4'>
              <Image src='./mapfront.png' alt='Map Visuals' borderRadius='base' boxShadow= '#aaaaaa 1px 1px 2px 0px' w='77' h='43' />

              <Box 
                overflow='scroll'
                height='55px'
              >
                  <Box
                    color='gray.500'
                    fontWeight='500'
                    letterSpacing='wide'
                    fontSize='12'
                    ml='2'
                  >
                    Polling Center Address
                  </Box>
                  <Text
                    color='gray.500'
                    letterSpacing='wide'
                    fontSize='12'
                    ml='2'
                    width='90%'
                  >
                    {leg?.end_address}
                  </Text>

              </Box>
            </Flex>
        </Box>
      </Flex>

      
     
    </Box>
  )
}

export default SmallMap