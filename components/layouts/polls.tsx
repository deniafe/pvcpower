import React from 'react'
import { Flex, Box, Icon, useDisclosure } from '@chakra-ui/react'
import SideNav from '../Navigation/sidenav'
import { useMediaQuery } from '@chakra-ui/react'
import { Show, Hide } from '@chakra-ui/react'
import { IoMenu } from 'react-icons/io5'
import SideDrawer from '../Navigation/mobileSideNav'

type ChildrenProps = {
  children: any
}

const PollsLayout = ({children}: ChildrenProps) => {
  const [md] = useMediaQuery(['(min-width: 30em)', '(min-width: 48em)'])

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
   
      <Show above='lg'>
        <Flex>
          <SideNav />
          <Box flex='1'>
          <main >{children}</main>
        </Box>
        </Flex>
      </Show>

      <Show below='lg'>
        {/* <Box position={'absolute'}></Box> */}
        <SideDrawer onClose={onClose} isOpen={isOpen} />
          <Box 
            color={'white'} 
            py={2}
            px={4}
            top={4}
            left={4}
            zIndex={1}
            borderRadius={5} 
            position={'absolute'}
            bg={'white'}
            boxShadow= 'rgba(0, 201, 147, 0.47) 1px 1px 8px 0'
            onClick={onOpen}
            >
            <Icon as={IoMenu} color={'black'} w={'28px'} h={'28px'} />
          </Box>
          <main >{children}</main>
      </Show>
    {/* <Hide below='md'>
      <Box>This text hides at the "md" value screen width and smaller.</Box>
    </Hide> */}
     
      
    
    </>
  )
}

export default PollsLayout