import { HStack,  Text, Box } from '@chakra-ui/react'
import {Progress} from "@chakra-ui/react"
import React from 'react'

const Bar = ({title,status,qtyPer}) => {
    console.log(
        "qtyPer is "+qtyPer
    )
  return (
    <Box py={"4"} px={['0','16']}>
        <Text children={title} fontWeight={"bold"} fontSize={"medium"} ></Text>
        <HStack w="full" alignItems={"center"}>
            <Text opacity={"0.5"}>0%</Text>
           <Progress w='full' value={status==="active"?qtyPer:0}  colorScheme='purple'/>
           <Text opacity={"0.5"}>100%</Text>
        </HStack>
    </Box>
  )
}

export default Bar
