import React from 'react'
import { useRouter } from 'next/router'
import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Link, HStack, Box, Icon, Text, Image } from '@chakra-ui/react'
import { IoChatboxEllipsesSharp, IoCheckmarkOutline, IoLocationSharp, IoMapSharp, IoMoonSharp, IoPieChartSharp } from 'react-icons/io5'
import volunteer from '../../public/volunteer.svg'
import ModeButton from '../ModeButton'


type childrenProps = {
  onClose: () => void
  isOpen: boolean
}

const SideDrawer = ({onClose, isOpen}: childrenProps) => {
  const router = useRouter()
  const currentPage = router.pathname

  const navMenu = [
    {
      title: 'Address',
      icon: IoLocationSharp,
      href: 'address',
    },
    {
      title: 'Details',
      icon: IoMapSharp,
      href: 'details',
    },
    {
      title: 'Reviews',
      icon: IoChatboxEllipsesSharp,
      href: 'reviews',
    },
    {
      title: 'Past Results',
      icon: IoPieChartSharp,
      href: 'past-results',
    }
  ]

  const menuItems = navMenu.map(menu => {
    const isPage = currentPage === `/${menu.href}`
    console.log(menu.href, currentPage, isPage)
    return (
      <>
        <Link href={`/${menu.href}`}>
          <HStack cursor={'pointer'} bg={isPage ? 'rgba(0, 202, 144, 0.15)' : ''} borderRadius='5px' pl={2} py={1} spacing='2px' my={1}>
            <Box cursor={'pointer'}>
            <Icon as={menu.icon} color={isPage ? '#00CA90' : '#706C6C'} w={25} h={25} pr={2} pt='3px' />
            </Box>
            <Box  >
              <Text color={isPage ? '#00CA90' : '#706C6C'} fontSize={14} fontWeight={500} pl='3px' >{menu.title}</Text>
            </Box>
          </HStack>
        </Link>
      </>
    )
  })
  
  return (
    <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>
          <Box cursor={'pointer'}>
            <Link href='/'>
              <Image
                  src="./pvcpowerlogo.png"
                  alt="Pvc Power Logo"
                  height={{base: '40px', md: '46px'}}
                  width={{base: '130px', md: '165px'}}
                />
              </Link>
          </Box>
          </DrawerHeader>
          <DrawerBody>
            <Box pt={8}>
              {menuItems}
            </Box>
            <Box pt='34px'>
              <Box
                pt='8px'
                display="flex" 
                alignItems="center" 
                justifyContent="center"
              >
                <Image
                  src='./volunteer.svg'
                  alt="Volunteer"
                  height={140}
                  width={125}
                />
              </Box>
              <Box
                pt='8px'
                display="flex" 
                alignItems="center" 
                justifyContent="center"
              >
                  <Text color='#706C6C' fontSize='13' textAlign='center' >
                      Want to be a part of this awesome project?
                  </Text>
              </Box>
              <Box
                pt='12px'
                display="flex" 
                alignItems="center" 
                justifyContent="center"
              >
                 <a href="https://api.whatsapp.com/send?phone=7034165677&text=I%20would%20like%20to%20volunteer%20for%20this%20project" target="_blank" rel="noreferrer">

                  <ModeButton icon={<IoCheckmarkOutline />} text='Volunteer'/>

                  </a>

              </Box>
        </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
  )
}

export default SideDrawer