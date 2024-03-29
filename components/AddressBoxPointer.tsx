import { Box, Image, Text, Flex, Icon, Center } from '@chakra-ui/react'
import { MdArrowDropDown } from 'react-icons/md'

type ChildrenProps = {
  leg: google.maps.DirectionsLeg | undefined;
}

const AddressBoxPointer = ({leg}: ChildrenProps) => {

  console.log(leg)

  return (
    <Box maxWidth={{base: '90%', lg:'300px' }}borderRadius='lg' overflow='scroll' position={'absolute'} zIndex={1} left={{base: '7%', md:450}} top={{base: 160, md: 100}} >
        <Box 
            mr={4} 
            borderRadius='lg'
            bgGradient='linear(to-t, #0E4D5A, #386C78,)'
            >
            <Flex p='4' pr='8'>
              <Image src='./pollingCenter.jpg' alt='Map Visuals' borderRadius='md' width='68' h='53' borderWidth='2px' borderStyle='solid' borderColor='#3B879C' />

              <Box >
                  <Box
                    fontWeight='600'
                    letterSpacing='wide'
                    fontSize='14'
                    color='white'
                    ml='2'
                  >
                     Polling Center Address
                  </Box>
                  <Box
                    color='white'
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
        <Center  width='300px' mt={{md: '-13px'}} >
          <Icon display={{base: 'none', md: 'inline'}} as={MdArrowDropDown} color='#0E4D5A' w={30} h={30} />
        </Center>
    </Box>
  )
}

export default AddressBoxPointer