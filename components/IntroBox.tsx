import React from 'react'

import Link from 'next/link'
import { Box, Text, Image, Container, Flex, Icon, Divider, Heading } from '@chakra-ui/react'
import { IoLocateSharp, IoLocationSharp } from 'react-icons/io5'
import LocateButton from '../components/LocateButton'

type ChildrenProps = {
  getLocation: () => void
}

const IntroBox = ({getLocation}: ChildrenProps) => {
 
  return (
    <>
    <Box
      w={{base: '98%', md:'390px' }}
      minH='450px' 
      marginTop={{base: '120px', md: '60px'}}
      mx={{base: '2%'}}
      // ml={{md: '6%', xl: '15%'}}
      position={'relative'}
      >
        <Box
          position={'absolute'}
          bg={'white'}
          width={'60px'}
          height={'60px'}
          borderRadius={'100px'}
          display="flex" 
          alignItems="center" 
          justifyContent="center"
          top={'-10px'}
          left={'-10px'}
        >
          <Image
            src='./pvcpowericon.png'
            alt="Pvc Power Logo"
            height={30}
            width={30}
          />
        </Box>
        <Box
           w={{base: '98%', md:'390px' }}
          minH='450px'
          px={4}
          pb={4}
          borderRadius={20}
          bgGradient='linear(to-t, #386C78, #0E4D5A)'
        >
          <Container>
            <Text size='md' fontSize='24' pt={10} pl={5} color={'white'}>
              Vote Your Concience
            </Text>
            <Box display={{md: 'flex'}} pt="20px" pb={6}>
              <Icon display={{base: 'none', md: 'inline'}} as={IoLocateSharp} color={'white'} w={75} h={70} pr={2} /> 
              <Box>
                <Text color={'white'} fontSize='18' pt={5} pb={2}>
                Polling and Election Dashboard
                </Text>
                <Text color={'#C3DED5'} fontSize='14'>
                  It is advisable to select a Polling Unit close to your area of residence
                  due to the restricted movement on election days.
                </Text>
            </Box>
            </Box>
            <Divider/>
            <Box
              display="flex" 
              alignItems="center" 
              justifyContent="center"
              px={5}
              py={5}
            >
                <Text color={'#C3DED5'} fontSize='14'>
                  You can locate your polling unit by using the Polling Unit y clicking the button below
                </Text>
            </Box>
            <Box
              display="flex" 
              alignItems="center" 
              justifyContent="center"
              onClick={() => {
                getLocation()
              }}
            >
                <LocateButton icon={<IoLocationSharp />} text='Find Nearest Location'/>
            </Box>
            <Box
              display="flex" 
              alignItems="center" 
              justifyContent="center"
              pt={5}
            >
                <Heading color={'white'} fontWeight={'medium'} as='h6' size='xs'>
                  My vote my right, My vote my power
                </Heading>
            </Box>
          </Container>

        </Box>
      </Box>
    </>
  )
}

export default IntroBox