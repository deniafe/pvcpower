import { useState, useRef, Dispatch, SetStateAction,} from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Button, Text, ToastId, } from '@chakra-ui/react'
import { MdArrowDropDown } from 'react-icons/md'
import { doc } from '@firebase/firestore' // for creating a pointer to our Document
import { addDoc, collection } from 'firebase/firestore' // for adding the Document to Collection
import { firestore } from '../firebase/' // firestore instance

type ChildrenProps = {
  onClose: () => void
  onOpen: () => void 
  isOpen: boolean
  comment: string
  setComment: Dispatch<SetStateAction<string>>
  pollingCenter: google.maps.LatLng | google.maps.LatLngLiteral | undefined
  showMessage: ({ status, message, title }: {
    title: string;
    message: string;
    status: "info" | "warning" | "success" | "error" | "loading" | undefined;
}) => ToastId
}

const CommentPopup = ({isOpen, onOpen, onClose, comment, setComment, showMessage, pollingCenter}: ChildrenProps) => {

  const [username, setUsername] = useState<string>(""); // title
  const [email, setEmail] = useState<string>(""); // title
  const [content, setContent] = useState<string>("A default content to be sent to the database");// description
  const [loading, setLoading] = useState(false)
  

  // const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const addComment = async () => {
    // get the current timestamp
    const timestamp: string = Date.now().toString();
    // create a pointer to our Document
    const _comment = collection(firestore, `comments`);
    // structure the todo data
    const commentData = {
      username,
      content: comment,
      upvotes: 0,
      downvotes: 0,
      netvotes: 0,
      email,
      postDate: timestamp,
      pollingCenter
    };
    setLoading(true)
    try {
      //add the Document
      await addDoc(_comment, commentData);
      //show a success message
      showMessage({
        title: 'Success',
        message: 'Your comment has been posted successfully.',
        status: 'success'
      })
      //reset fields
      setUsername("")
      setContent("")
      setLoading(false)
      setComment('')
      onClose()
      
    } catch (error) {
      //show an error message
      console.log('An error occurred while adding document', error)
      showMessage({
        title: 'Error',
        message: 'An error occurred while posting your comment, please try again',
        status: 'error'
      })
      //reset fields
      setUsername("")
      setContent("")
      setLoading(false)
      setComment('')
      onClose()
    }
  };

  const handleUsernameChange = (event: {target: {value: string}}) =>  {
    setUsername(event.target.value)
  }

  const handleEmailChange = (event: {target: {value: string}}) =>  {
    setEmail(event.target.value)
  }

   const handleSubmit = (e: { preventDefault: () => void; }) => {
     e.preventDefault(); // avoid default behaviour
     
     if(!username || !email){ // check for any null value
       return  showMessage({
        title: 'Error',
        message: 'All fields are required',
        status: 'error'
      })
     }
     addComment()
   }

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={24} fontWeight={'normal'}>A Little More About You</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel fontSize={14} color='#706C6C'>Username</FormLabel>
            <Input onChange={handleUsernameChange} type="text" ref={initialRef} placeholder='Username ...' />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel fontSize={14} color='#706C6C'>Email</FormLabel>
            <Input onChange={handleEmailChange} type='email' placeholder='Email ...' />
            <Text fontSize={12} color='#706C6C'>We will never show your email publicly</Text>
          </FormControl>
        </ModalBody>

        <ModalFooter>
        <Button 
          isLoading={loading}
          loadingText='Submitting'
          borderRadius={20} 
          background='#00CA90' 
          color={'white'} 
          cursor={'pointer'}
          fontWeight={500}
          px={10}
          fontSize={14} 
          _hover={{ bg: '#009EB0' }}
          onClick={handleSubmit} 
          >
          Post
        </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CommentPopup