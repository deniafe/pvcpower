import React from 'react'
import { Flex, Box } from '@chakra-ui/react'
import SideNav from '../Navigation/sidenav'
import { useMediaQuery } from '@chakra-ui/react'
import { Show, Hide } from '@chakra-ui/react'

type ChildrenProps = {
  children: any
}

const PollsLayout = ({children}: ChildrenProps) => {
  const [md] = useMediaQuery(['(min-width: 30em)', '(min-width: 48em)'])

  return (
    <>
   
      <Show above='md'>
        <Flex>
          <SideNav />
          <Box flex='1'>
          <main >{children}</main>
        </Box>
        </Flex>
      </Show>

      <Show below='md'>
          <main >{children}</main>
      </Show>
    {/* <Hide below='md'>
      <Box>This text hides at the "md" value screen width and smaller.</Box>
    </Hide> */}
     
      
    
    </>
  )
}

export default PollsLayout