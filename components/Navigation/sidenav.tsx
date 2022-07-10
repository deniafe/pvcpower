import React from 'react'
import {useRouter} from 'next/router';
import Image from 'next/image'
import Link from 'next/link'
import { Container, Box, HStack, Icon, Text } from '@chakra-ui/react'
import { IoLocationSharp, IoMapSharp, IoChatboxEllipsesSharp, IoArchiveSharp, IoPieChartSharp, IoCheckmarkOutline } from 'react-icons/io5'
import logo from '../../public/pvcpowerlogo.png'
import volunteer from '../../public/volunteer.svg'
import ModeButton from '../ModeButton'

const SideNav = () => {
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
    // {
    //   title: 'Polling Stations',
    //   icon: IoArchiveSharp,
    //   href: 'polling-stations',
    // },
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
    <Box px={3} pl={8} pt={2} w='280px'>
      <Container p='2'>
        <Box cursor={'pointer'}>
          <Link href='/'>
            <Image
              src={logo}
              alt="Pvc Power Logo"
              height={46}
              width={165}
            />
          </Link>
        </Box>
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
                  src={volunteer}
                  alt="Pvc Power Logo"
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
                 <a href="https://api.whatsapp.com/send?phone=70341665677&text=I%20would%20like%20to%20volunteer%20for%20this%20project" target="_blank" rel="noreferrer">

                  <ModeButton icon={<IoCheckmarkOutline />} text='Volunteer'/>

                  </a>

              </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default SideNav