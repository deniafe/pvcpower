import React, { Dispatch, MutableRefObject, SetStateAction, useContext, useEffect, useRef, useState } from 'react'
import { Box, Button, ButtonGroup, Center, Heading, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Select, Stack, Text, Textarea, ToastId } from '@chakra-ui/react'
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import { IoArrowBackSharp, IoArrowForwardSharp, IoChatboxEllipsesSharp } from 'react-icons/io5'
import { GoogleMap } from '@react-google-maps/api'
import { AppStateContext } from '../contexts/AppStateContext'
import { MdArrowDropDown, MdDirections } from 'react-icons/md'
import Places from './Places'
import Distance from './Distance'

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
  mapRef: MutableRefObject<GoogleMap | undefined>
  ward: string
  pollingCenter: LatLngLiteral | undefined
  currentLocation?: LatLngLiteral | undefined
  setCurrentLocation: Dispatch<SetStateAction<google.maps.LatLngLiteral | undefined>>
  directions?: google.maps.DirectionsResult | undefined
  setDirections: Dispatch<SetStateAction<google.maps.DirectionsResult | undefined>>
  setComment: Dispatch<SetStateAction<string>>
  comment: string
  onOpen: () => void 
  showMessage: ({ status, message, title }: {
    title: string;
    message: string;
    status: "info" | "warning" | "success" | "error" | "loading" | undefined;
}) => ToastId
}

const BottomDrawer = ({mapRef, ward, pollingCenter, onOpen, currentLocation, setCurrentLocation, directions, setDirections, setComment, comment,  showMessage}: ChildrenProps) => {

  const sheetRef = useRef() as React.MutableRefObject<BottomSheetRef>;

  const initialFocusRef = useRef<HTMLButtonElement>()
  const [stepsIndex, setStepsIndex] = useState(0);
  const [steps, setSteps] = useState<google.maps.DirectionsStep[]>()
  const directionIndex = useRef(0);
  const { state, dispatch } = useContext(AppStateContext);


  useEffect(() => {
    console.log('AppState viewed from useEffect in addressbox >>>>>>>>>>>>>>>>>>>>', state)
  }, [state])

  useEffect(() => { 
    setSteps(state.directions?.routes[0].legs[0].steps)
  }, [state.directions])

  useEffect(() => {
    directionIndex.current = 0;
  },[pollingCenter]);


  const handleCommentChange = (event: {target: {value: string}}) =>  {
    setComment(event.target.value)
  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // avoid default behaviour
    
    if(!comment){ // check for any null value
      return  showMessage({
       title: 'Error',
       message: 'You cannot post an empty comment',
       status: 'error'
     })
    }
    onOpen()
  }
  
  return (
    <BottomSheet
     ref={sheetRef}
     open 
     // the first snap points height depends on the content, while the second one is equivalent to 60vh
    snapPoints={({ minHeight, maxHeight }) => [60, maxHeight / 0.2, maxHeight / 0.4, maxHeight / 0.6]}
    // Opens the largest snap point by default, unless the user selected one previously
    defaultSnap={({ lastSnap, snapPoints }) =>
      lastSnap ?? Math.min(...snapPoints)
    }
    blocking={false}
  >
    <Center>
      <Text> Drag up for more options</Text>
      </Center>
      {/* <Box 
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
          > */}
          <Box pb={5} pt={10} px={8}>
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
                  sheetRef={sheetRef}
                  setCurrentLocation={(position) => {
                    setCurrentLocation && setCurrentLocation(position);
                    dispatch({type: 'SET_CURRENT_LOCATION', payload: position})
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
                           leftIcon={<IoArrowBackSharp />}
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
                              if( directionIndex.current === (steps ? steps.length : 0) - 1) return
                              directionIndex.current = directionIndex.current + 1 
                              setStepsIndex(directionIndex.current)
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
                <Text fontSize={14} color='#706C6C' mb={1} >Comment about this center</Text>
                <Textarea fontSize='14px' placeholder='Drop your comment' value={comment} size='md' onChange={handleCommentChange} />
              </Box>
              
              <Box
                display="flex" 
                alignItems="center" 
                justifyContent="center"
                py={2}
              >
                 <Button 
                    leftIcon={<IoChatboxEllipsesSharp />} 
                    borderRadius={20} 
                    background='#00CA90' 
                    color={'white'} 
                    cursor={'pointer'}
                    fontWeight={500}
                    paddingRight={10} 
                    paddingLeft={6} 
                    fontSize={14} 
                    _hover={{ bg: '#009EB0' }} 
                    onClick={handleSubmit}
                    >
                    Post Comment
                  </Button>
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
      {/* </Box> */}
      
     
  </BottomSheet>
  )
}

export default BottomDrawer