import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Flex, Box, Spacer, ButtonGroup, Button } from '@chakra-ui/react'
import logo from '../../public/pvcpowerlogo.png'
import LocateButton from '../LocateButton'
import ModeButton from '../ModeButton'

const Navbar = () => {
  const router = useRouter()
  return (
    <>
    <Box 
     mt={2}
     mx={2}
     pt={0}
     px={3}
     zIndex={2}
     position="relative"
     bg={'white'}
     borderRadius={40}
    >
      <Flex minWidth='max-content' alignItems='center' gap='2'>
        <Box p='2'>
            <Image
              src={logo}
              alt="Pvc Power Logo"
              height={46}
              width={165}
            />
        </Box>
        <Spacer />
        <ButtonGroup gap='2'>
          <ModeButton text='Dark Mode'/>
          <Button color="Black" colorScheme='teal' fontSize={16} borderRadius={20} fontWeight={500} variant='ghost'>
            Volunteer
          </Button>
          <Box
              
              onClick={() => {
                router.push('/address')
              }}
            >
                    <LocateButton text='Find Nearest Location'/>
            </Box>
        </ButtonGroup>
      </Flex>
    </Box>
    </>
  )
}

export default Navbar