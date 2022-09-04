import React from 'react'
import { useRouter } from 'next/router'
import { Flex, Box, Spacer, ButtonGroup, Image, Icon, useDisclosure } from '@chakra-ui/react'
import LocateButton from '../LocateButton'
import ModeButton from '../ModeButton'
import TopDrawer from './topdrawer'
import { IoCheckmarkOutline, IoMenu } from 'react-icons/io5'

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  return (
    <>
    <TopDrawer onClose={onClose} isOpen={isOpen} />
    <Box 
     mt={2}
     mx={2}
     pt={0}
     pb={1.5}
     px={3}
     zIndex={2}
     position="relative"
     bg={{md: 'white'}}
     borderRadius={40}
    >
      <Flex minWidth='max-content' alignItems='center' gap='2'>
        <Box p='2'>
            <Image
              src="./pvcpowerlogo.png"
              alt="Pvc Power Logo"
              height={{base: '40px', md: '46px'}}
              width={{base: '130px', md: '165px'}}
            />
        </Box>
        <Spacer />
        <ButtonGroup display={{base: 'none', md: 'inline'}} gap='2'>

        <a href="https://api.whatsapp.com/send?phone=7034165677&text=I%20would%20like%20to%20volunteer%20for%20this%20project" target="_blank" rel="noreferrer">

        <ModeButton icon={<IoCheckmarkOutline />} text='Volunteer'/>

        </a>
          <Box
              display={{base: 'none', md: 'inline'}}
              onClick={() => {
                router.push('/address')
              }}
            >
              <LocateButton icon={''} text='Find Nearest Location'/>
            </Box>
        </ButtonGroup>
        <Box 
          color={'white'} 
          py={2}
          px={4}
          borderRadius={5} 
          boxShadow= 'rgba(0, 201, 147, 0.47) 1px 1px 8px 0'
          display={{base: 'inline', md: 'none'}}
          onClick={onOpen}
          >
          <Icon as={IoMenu} color={'black'} w={'28px'} h={'28px'} />
        </Box>
      
      </Flex>
    </Box>
    </>
  )
}

export default Navbar