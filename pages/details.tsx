import type { ReactElement } from 'react'
import { useState, useEffect, useContext, useRef, useCallback } from 'react';
import Link from 'next/link'
import Layout from '../components/layouts/layout'
import PollsLayout from '../components/layouts/polls'
import { Image, Text, Box, useToast, Flex, Avatar, useDisclosure, Button, Textarea, ButtonGroup, Spacer,Divider } from '@chakra-ui/react'
import { IoChatboxEllipsesSharp, IoArrowForwardSharp, IoArrowBackSharp } from 'react-icons/io5'
import type { NextPageWithLayout } from './_app'
import { firestore } from '../firebase'
import {collection, QueryDocumentSnapshot, DocumentData, query, where, limit, getDocs} from "@firebase/firestore";
import Loading from '../components/Loading'
import NotFound from '../components/NotFound'
import Distance from '../components/Distance'
import CommentPopup from '../components/CommentPopup'
import { AppStateContext } from '../contexts/AppStateContext'

const Details: NextPageWithLayout = () => {

  const [comments, setComments] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pollingCenter, setPollingCenter] = useState<google.maps.LatLng | undefined>()
  const [pollingAddress, setPollingAddress] = useState<string>()
  const [ward, setWard] = useState<string | undefined>('')
  const [comment, setComment] = useState('');// description
  const [stepsIndex, setStepsIndex] = useState(0);
  const [steps, setSteps] = useState<google.maps.DirectionsStep[]>()
  const [directions, setDirections] = useState<google.maps.DirectionsResult >()
  const { state, dispatch } = useContext(AppStateContext);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const directionIndex = useRef(0);

  const showMessage = ({status, message, title}: {title: string, message: string, status: "info" | "warning" | "success" | "error" | "loading" | undefined}) =>
  toast({
    title: title,
    position: 'top-right',
    description: message,
    status: status,
    duration: 9000,
    isClosable: true,
  })


  const commentsCollection = collection(firestore, 'comments');

  const getComments = async () => {
    console.log('Get todos is being ran')
      // construct a query to get up to 10 undone todos 
      const commentsQuery = query(commentsCollection, limit(2))
      // get the todos
      const querySnapshot = await getDocs(commentsQuery)
      // map through todos adding them to an array
      const result: DocumentData[] = [];
      querySnapshot.forEach((snapshot) => {
      result.push(snapshot.data())
      })
      // set it to state
      setComments(result)
  }
 

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

  useEffect(() => {
    directionIndex.current = 0;
  },[pollingCenter]);

    useEffect( () => {
      console.log('Use effect is being ran')
      // get the todos
    
      // reset loading
    setTimeout( () => {
      setLoading(false);
    },8000)
  },[])

  useEffect(() => {
    setDirections(state.directions)
  }, [state])

  useEffect(() => {
    setWard(state.currentWard)
  }, [state.currentWard])

  useEffect(() => {
    directions && setPollingAddress(directions.routes[0].legs[0].end_address)
  }, [directions])

  useEffect(() => { 
    setSteps(state.directions?.routes[0].legs[0].steps)
  }, [state.directions])

  useEffect(() => { 
    const location = directions && directions.routes[0].legs[0].end_location
    directions && setPollingCenter(location)
  }, [state, directions])

  useEffect(() => {
    directionIndex.current = 0;
  },[pollingCenter]);

  useEffect(() => {
    const len = state.comments && state.comments.length
    state.comments && len ? setComments([state.comments[2], state.comments[3]]) : getComments()
  },[state]);


  const reviewBox = comments.map((comment, i) => {
    return (
      <Box 
        key={i}
        width={'80%'}
        bg={'rgba(0, 158, 176, 0.04)'}
        p={6}
        my={5}
        >
          <Flex gap='2'>

          <Avatar size='sm' name='authur' src='./blankProfilePic.jpg' />
            <Text color='#00CA90' fontWeight={500}>{comment?.username}</Text>
          </Flex>

          <Box pl={10} color='#706C6C' fontWeight={400}>
            <Text fontSize={'15px'}>{comment?.content}</Text>
            <Text marginTop={'5px'} fontSize={'12px'}>{timeSince(comment?.postDate)} ago</Text>
          </Box>
      </Box>

    
  
    )
  })

  function timeSince(date: number) {

    var seconds = Math.floor((new Date().getTime() - date) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1 && interval < 2) {
      return Math.floor(interval) + " year";
    } else if (interval > 2) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1 && interval < 2) {
      return Math.floor(interval) + " month";
    } else if (interval > 2) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1 && interval < 2) {
      return Math.floor(interval) + " day";
    } else if (interval > 2) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1 && interval < 2) {
      return Math.floor(interval) + " hour";
    } else if(interval > 2 ) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1 && interval < 2) {
      return Math.floor(interval) + " minute";
    } else if(interval > 2 ) {
      return Math.floor(interval) + " minutes";
    }

    return Math.floor(seconds) + " seconds";
  }

  return (
    <main>
      
        
        <Box          
          p={10}
        >
          <Text fontSize={24} pb={2}>
            General Details
          </Text>
          <Flex gap='20'>
            <Box width='55%'  mr={4}>

              <Text fontSize={'14px'} color='gray.500' mb={8}>
                Get the complete details about this polling station
              </Text>
              <Text fontSize={'14px'} color='gray.500' mb={2}>
                <b>Polling Center Ward: </b> {ward}
              </Text>
              <Text fontSize={'14px'} color='gray.500' mb={4}>
                <b>Polling Center: </b> {pollingAddress}
              </Text>
              <Divider orientation='horizontal' />
              <Text fontWeight='500' color='gray.500' my={8}>
                Full walking directions to your polling center
              </Text>

              <Text color='gray.500' mb={8}>
              {steps ? <div dangerouslySetInnerHTML={{__html: steps[stepsIndex]?.instructions}} /> : ''}
              </Text>

              <Flex>
                <Button 
                  leftIcon={<IoArrowBackSharp />}
                  color={'#00CA90'} 
                  cursor={'pointer'}
                  fontWeight={500}
                  variant='link'
                  fontSize={15} 
                  _hover={{ color: '#009EB0' }} 
                  onClick={() => {
                    if( directionIndex.current === 0) return
                    directionIndex.current = directionIndex.current - 1 
                    setStepsIndex(directionIndex.current)
                  }}
                  >
                  Back
                </Button>
                <Spacer />
                <Box fontSize='sm'>Step {stepsIndex + 1} of {steps?.length}</Box>
                <Spacer />
                <Button 
                  rightIcon={<IoArrowForwardSharp />}
                  color={'#00CA90'} 
                  cursor={'pointer'}
                  fontWeight={500}
                  variant='link'
                  fontSize={15} 
                  _hover={{ color: '#009EB0' }} 
                  onClick={() => { 
                    if( directionIndex.current === (steps ? steps.length : 0) - 1) return
                    directionIndex.current = directionIndex.current + 1 
                    setStepsIndex(directionIndex.current)
                  }}
                  >
                  Next
                </Button>
              </Flex>

              

              <ButtonGroup size='sm'>
               
                
              </ButtonGroup>

              <Distance leg={directions?.routes[0].legs[0]} />

              <Box pt={4}>
                <Text fontSize={14} color='gray.500' mb={1} >Comment about this center</Text>
                <Textarea fontSize='14px' placeholder='Drop your comment' value={comment} size='md' onChange={handleCommentChange} />
              </Box>
              
              <Box
                display="flex" 
                alignItems="center" 
                justifyContent="center"
                py={4}
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

            </Box>
              
              
            <Box width={'45%'} ml={10}>
              
            <Box  
                borderRadius='base'
                height="100px"
                borderWidth={1}
                width={'80%'}
                bg='white'>
                <Flex p='2' pt='3' pr='4'>
                <Image src='./pollingCenter.jpg' alt='Map Visuals' borderRadius='md' width='80px' h='74px' borderWidth='2px' borderStyle='solid' borderColor='#3B879C' />

                <Divider ml={4} orientation='vertical' />

                  <Box 
                    overflow='scroll'
                    height='55px'
                  >
                      <Box
                        color='gray.500'
                        fontWeight='500'
                        letterSpacing='wide'
                        fontSize='12'
                        ml='2'
                      >
                        Polling Center Address
                      </Box>
                      <Text
                        color='gray.500'
                        letterSpacing='wide'
                        fontSize='12'
                        ml='2'
                        width='90%'
                      >
                        {pollingAddress}
                      </Text>

                  </Box>
                </Flex>
            </Box>
            {
              loading ? (
                 <Loading />
              ): 
              comments.length === 0 ? (
                <Text>No Reviews</Text>
              ) : (
                <Box>
                  {/* <Link href={`/reviews`}>
                      <Text fontWeight='500' color='#00CA90' >All Reviews</Text>
                  </Link> */}
                  {reviewBox}
                </Box>
               )
            }
            
            </Box>
           
          </Flex>
          
        </Box>
        <CommentPopup setComment={setComment} showMessage={showMessage} pollingCenter={pollingCenter} isOpen={isOpen} onOpen={onOpen} onClose={onClose} comment={comment}  />
       
    </main>
  )

}

Details.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <PollsLayout>{page}</PollsLayout>
    </Layout>
  )
}

export default Details
