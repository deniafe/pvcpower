import { useRef, useState, useEffect } from 'react'
import { Heading, Box, Text, Stack, Textarea, Select, Center, Button, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverFooter, PopoverArrow, PopoverBody, PopoverCloseButton, ButtonGroup } from '@chakra-ui/react'
import { MdArrowDropDown, MdDirections } from "react-icons/md";
import { IoLocationSharp, IoWalkSharp, IoArrowForwardSharp, IoChatboxEllipsesSharp } from 'react-icons/io5'
import Places from "../components/Places";
import Home from '../styles/Home.module.css'
import LocateButton from '../components/LocateButton'
import Distance from './Distance'
import ModeButton from './ModeButton'

const wards = [
  'VICTORIA ISLAND I', 
  'VICTORIA ISLAND II', 
  'ILASAN HOUSING ESTATE', 
  'LEKKI/IKATE AND ENVIRONS', 
  'ILADO/ETIOSA AND ENVIRONS', 
  'AJAH/SANGOTEDO', 
  'ADO/LANGBASA/BADORE',
  'IKOYI I',
  'IKOYI II',
  'OBALENDE'
]

type LatLngLiteral = google.maps.LatLngLiteral
type ChildrenProps = {
  setOffice: any
  mapRef: any
  ward: any
  pollingCenter: LatLngLiteral | undefined
  steps: any
  directions: any
}

const AddressInfoBox = ({setOffice, mapRef, directions, ward, steps, pollingCenter}: ChildrenProps) => {

  const initialFocusRef = useRef<HTMLButtonElement>()
  const [stepsIndex, setStepsIndex] = useState(0);
  const directionIndex = useRef(0);

  // useEffect(() => {
  //   if( directionIndex.current === steps.length - 1) return
  //   console.log('UseEffect in addIndex is beig ran')
  //   console.log(steps)
  //   directionIndex.current = directionIndex.current + 1;
  //   console.log(directionIndex.current)
  // });

  // useEffect(() => {
  //   if( directionIndex.current === 0) return
  //   directionIndex.current = directionIndex.current - 1;
  // }, [minusIndex]);

  useEffect(() => {
    directionIndex.current = 0;
  },[pollingCenter]);


  console.log(steps)

  return (
    <>
      <Box 
        p={1} 
        ml={10} 
        mt='2' 
        bg='white' 
        w='390px' 
        h='vh'
        overflow={'auto'}
        position={'relative'}
        borderRadius='10px'
        boxShadow= 'rgba(0, 201, 147, 0.47) 1px 1px 16px 0'
          >
          <Box py={5} px={8}>
            <Text fontSize={24}>
              Address
            </Text>
            <Text fontSize={14} color='#706C6C'>
              The closest polling center to your current location
            </Text>

            <Stack spacing={3} pt={6}>
              <Box>
                <Text fontSize={14} mb={1} color='#706C6C'>Wards</Text>
                <Select icon={<MdArrowDropDown />} fontSize='14px' placeholder='Select a location' value={ward}>
                 {
                 wards.map((unitWard,i) => {
                   return <option key={i} value={unitWard}>{unitWard}</option>
                  })
                 }
                </Select>
              </Box>
              <Box pb={3}>
                <Text fontSize={14} mb={1} color='#706C6C'>Address</Text>
                <Places
                  setOffice={(position) => {
                    setOffice(position);
                    mapRef.current?.panTo(position);
                  }}
                />
              </Box>

              <Distance leg={directions?.routes[0].legs[0]} />
              {directions && (<Center>
                <Popover
                    placement='bottom'
                    closeOnBlur={false}
                  >
                    <PopoverTrigger>
                    {/* <Button>Trigger</Button> */}
                    <Button 
                      leftIcon={<MdDirections />} 
                      borderRadius={20} 
                      boxShadow= 'rgba(0, 201, 147, 0.47) 1px 1px 8px 0'
                      background='transparent' 
                      cursor={'pointer'}
                      fontWeight={500}
                      h='35px'
                      w='170px'
                      color={'black'} 
                      pr={10} 
                      pl={6} 
                      fontSize={14} 
                      _hover={{ boxShadow: 'lg' }} 
                      >
                      Get Full Directions
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent color='white'  bgGradient='linear(to-t, #0E4D5A, #386C78,)' borderColor='blue.800'>
                      <PopoverHeader pt={4} fontWeight='500' border='0'>
                        Full directions to your polling center
                      </PopoverHeader>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverBody color='white' fontSize='14px' >
                      {steps ? <div dangerouslySetInnerHTML={{__html: steps[stepsIndex]?.instructions}} /> : ''}
                      </PopoverBody>
                      <PopoverFooter
                        border='0'
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'
                        pb={4}
                      >
                        <Box fontSize='sm'>Step {stepsIndex + 1} of {steps?.length}</Box>
                        <ButtonGroup size='sm'>
                          <Button 
                            borderRadius={20} 
                            background='#00CA90' 
                            color={'white'} 
                            cursor={'pointer'}
                            fontWeight={500}
                            paddingRight={4} 
                            paddingLeft={4} 
                            fontSize={14} 
                            _hover={{ bg: '#009EB0' }} 
                            onClick={() => {
                              if( directionIndex.current === 0) return
                              directionIndex.current = directionIndex.current - 1 
                              setStepsIndex(directionIndex.current)
                              console.log(directionIndex.current)
                            }}
                            >
                            Back
                          </Button>
                          <Button 
                            rightIcon={<IoArrowForwardSharp />}
                            borderRadius={20} 
                            background='#00CA90' 
                            color={'white'} 
                            cursor={'pointer'}
                            fontWeight={500}
                            paddingRight={4} 
                            paddingLeft={6} 
                            fontSize={14} 
                            _hover={{ bg: '#009EB0' }} 
                            onClick={() => { 
                              if( directionIndex.current === steps.length - 1) return
                              directionIndex.current = directionIndex.current + 1 
                              setStepsIndex(directionIndex.current)
                              console.log(directionIndex.current)
                            }}
                            >
                            Next
                          </Button>
                        </ButtonGroup>
                      </PopoverFooter>
                    </PopoverContent>
                  </Popover>
              </Center>)}

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
                py={1}
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