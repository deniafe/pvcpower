import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Flex, Box, Spacer, ButtonGroup, Button } from '@chakra-ui/react'
import logo from '../../public/pvcpowerlogo.png'
import LocateButton from '../LocateButton'
import ModeButton from '../ModeButton'
import { IoCheckmarkOutline } from 'react-icons/io5'

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

        <a href="https://api.whatsapp.com/send?phone=7034165677&text=I%20would%20like%20to%20volunteer%20for%20this%20project" target="_blank" rel="noreferrer">

        <ModeButton icon={<IoCheckmarkOutline />} text='Volunteer'/>

        </a>
          <Box
              
              onClick={() => {
                router.push('/address')
              }}
            >
                    <LocateButton icon={''} text='Find Nearest Location'/>
            </Box>
        </ButtonGroup>
      </Flex>
    </Box>
    </>
  )
}

export default Navbar