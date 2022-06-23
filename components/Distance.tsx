import { Box, Icon, Text, Flex, Textarea, Spacer } from '@chakra-ui/react'
import { IoWalkSharp } from 'react-icons/io5'

type DistanceProps = {
  leg: google.maps.DirectionsLeg;
}

const secondsPerDay = 60 * 60 * 24;

const Distance = ({ leg }: DistanceProps) => {

  return (
    <>
        <Box bg="rgba(0, 202, 144, 0.15)" borderRadius="5px" py={2} px={4} my="8px" >
          <Flex>
            <Icon mt={1} color='#00C993' as={IoWalkSharp} />
            <Spacer />
            <Text color='#00C993' fontSize='14'>How long to get there</Text>
            <Spacer />
            <Text color='#00C993' fontSize='14' fontWeight='500'>{leg?.duration?.text || '0 Mins'}</Text>
          </Flex>
        </Box>
       
    </>
  )
}

export default Distance