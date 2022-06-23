import React from 'react'
import { Button } from '@chakra-ui/react'
import { IoLocationSharp } from "react-icons/io5";

const LocateButton = ({text, icon}) => {
  return (
    <>
    <Button 
      leftIcon={icon || <IoLocationSharp />} 
      borderRadius={20} 
      background='#00CA90' 
      color={'white'} 
      cursor={'pointer'}
      fontWeight={500}
      paddingRight={10} 
      paddingLeft={6} 
      fontSize={14} 
      _hover={{ bg: '#009EB0' }} 
      >
       {text}
    </Button>
    </>
  )
}

export default LocateButton