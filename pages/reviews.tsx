import type { ReactElement } from 'react'
import { useState, useEffect, useContext } from 'react';
import Layout from '../components/layouts/layout'
import PollsLayout from '../components/layouts/polls'
import { Image, Text, Box, SkeletonText, Flex, Avatar } from '@chakra-ui/react'
import type { NextPageWithLayout } from './_app'
import { firestore } from '../firebase'
import {collection, QueryDocumentSnapshot, DocumentData, query, where, limit, getDocs} from "@firebase/firestore";
import Loading from '../components/Loading'
import NotFound from '../components/NotFound'
import { AppStateContext } from '../contexts/AppStateContext'

const Reviews: NextPageWithLayout = () => {
  const [comments, setComments] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { state, dispatch } = useContext(AppStateContext);

  const commentsCollection = collection(firestore, 'comments');
  const getComments = async () => {
    console.log('Get todos is being ran')
      // construct a query to get up to 10 undone todos 
      const commentsQuery = query(commentsCollection, limit(10))
      // get the todos
      const querySnapshot = await getDocs(commentsQuery)
      // map through todos adding them to an array
      const result: DocumentData[] = [];
      querySnapshot.forEach((snapshot) => {
      result.push(snapshot.data())
      })
      // set it to state
      setComments(result)
      dispatch({ type: 'SET_COMMENTS', payload: result })
  }

    useEffect( () => {
      console.log('Use effect is being ran')
      // get the todos
      getComments();
      // reset loading
    setTimeout( () => {
      setLoading(false);
    },8000)
  },[])

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
            <Text color='#00CA90' fontWeight={500}>{comment.username}</Text>

          </Flex>

          <Box pl={10} color='#706C6C' fontWeight={400}>
            <Text fontSize={'15px'}>{comment.content}</Text>
            <Text marginTop={'5px'} fontSize={'12px'}>{timeSince(comment.postDate)} ago</Text>
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
            <Text fontSize={24} pb={12}>
              Comments about this polling center
            </Text>
        {
          loading ? (
          <Loading />
          ): 
          comments.length === 0 ? (
            <NotFound message={'No comments or reviews has been posted for this center yet. You can be the first to post a review'}/>
          ) : (
          
         
            reviewBox

        
          )
        }
        </Box>
        
    </main>
  )

}

Reviews.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <PollsLayout>{page}</PollsLayout>
    </Layout>
  )
}

export default Reviews