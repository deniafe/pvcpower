import React from 'react'
import { Button } from '@chakra-ui/react'
import { IoMoonSharp } from "react-icons/io5";

const ModeButton = ({text, icon}) => {
  return (
    <>
    <Button 
      leftIcon={icon || <IoMoonSharp />} 
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
       {text}
    </Button>
    </>
  )
}

export default ModeButton