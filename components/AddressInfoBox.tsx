import { Heading, Box, Text, Stack, Textarea, Select } from '@chakra-ui/react'
import { MdArrowDropDown } from "react-icons/md";
import { IoLocationSharp, IoWalkSharp, IoChatboxEllipsesSharp } from 'react-icons/io5'
import Places from "../components/Places";
import Home from '../styles/Home.module.css'
import LocateButton from '../components/LocateButton'
import Distance from './Distance'

const AddressInfoBox = ({setOffice, mapRef, directions}) => {
  return (
    <>
      <Box 
        p={1} 
        ml={10} 
        mt='4' 
        bg='white' 
        w='390px' 
        h='vh'
        overflow={'auto'}
        position={'relative'}
        borderRadius='10px'
        boxShadow= 'rgba(0, 201, 147, 0.47) 1px 1px 16px 0'
          >
          <Box py={6} px={8}>
            <Text fontSize={24}>
              Address
            </Text>
            <Text fontSize={14} color='#706C6C'>
              The closest polling center to your current location
            </Text>

            <Stack spacing={3} pt={6}>
              <Box>
                <Text fontSize={14} mb={1} color='#706C6C'>Wards</Text>
                <Select icon={<MdArrowDropDown />} fontSize='14px' placeholder='Select a location'>
                  <option value='option1'>Option 1</option>
                  <option value='option2'>Option 2</option>
                  <option value='option3'>Option 3</option>
                </Select>
              </Box>
              <Box pb={5}>
                <Text fontSize={14} mb={1} color='#706C6C'>Address</Text>
                <Places
                  setOffice={(position) => {
                    setOffice(position);
                    mapRef.current?.panTo(position);
                  }}
                />
              </Box>

              <Distance leg={directions?.routes[0].legs[0]} />

              <Box pt={4}>
                <Text fontSize={14} color='#706C6C' mb={1}>Comment about this center</Text>
                <Textarea fontSize='14px' placeholder='Drop your comment' size='md' />
              </Box>
              
              <Box
                display="flex" 
                alignItems="center" 
                justifyContent="center"
                py={2}
              >
                  <LocateButton text='Post Comment' icon={<IoChatboxEllipsesSharp />} />
              </Box>
              <Box
                display="flex" 
                alignItems="center" 
                justifyContent="center"
                py={2}
              >
                  <Heading color={'Black'} fontWeight={'medium'} as='h6' size='xs'>
                    My vote my right, My vote my power
                  </Heading>
              </Box>
            </Stack>
          </Box>
        </Box>
    </>
  )
}

export default AddressInfoBox