import React from 'react'
import { Flex, Box } from '@chakra-ui/react'
import SideNav from '../Navigation/sidenav'

const PollsLayout = ({children}) => {
  return (
    <>
    <Flex>
      <SideNav />
      <Box flex='1'>
        <main >{children}</main>
      </Box>
    </Flex>
    </>
  )
}

export default PollsLayout