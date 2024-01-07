import React from 'react';
import { Stack,HStack,Box,Heading ,Text} from '@chakra-ui/react';
import { RiArrowDownCircleFill,  RiArrowUpCircleFill } from 'react-icons/ri';
import "../Home/home.css"
const Dashbox = ({title,qty,qtyPer,status,duration="Since Last Month"}) => {
  return (
    <Stack direction={["center","flex-start"]} flexWrap={"wrap"} p={['4', '8']} display={"flex"}>
      <HStack>
        <Box boxShadow={'2px 0 10px rgba(107,70,193,0.5)'} p={['4', '8']} borderRadius={"lg"} className='c1'>
          <Heading opacity={'0.5'} fontSize={'small'} children={title} />
          <HStack>
            <Text fontSize="medium" fontWeight={"bold"}>
                {qty}
            </Text>
            <Text fontSize={"small"}>{qtyPer}%</Text>
            {status==="active"?<RiArrowUpCircleFill/>:<RiArrowDownCircleFill/>}
          </HStack>
          <Text opacity={"0.5"} children={duration}/>
        </Box>
        
      </HStack>
    </Stack>
  );
};

export default Dashbox;
