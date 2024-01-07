import React from 'react'
import { Box, HStack, Heading, Stack, VStack } from '@chakra-ui/react'
import {TiSocialYoutubeCircular,TiSocialInstagramCircular} from "react-icons/ti"
import { DiGithub } from 'react-icons/di'
const Footer = () => {
  return( 
    <Box padding={"4"} bg="blackAlpha.900"  width={"full"} marginY={"0"} position={"absolute"} bottom={"-500"}>
        <Stack direction={["column","row"]}>

        
        <VStack alignItems={["center","flex-start"]} width="full">
            <Heading fontFamily={"sans-serif"} size={"md"} children="All Rights Reserved By" color={"whitesmoke"}/>
            <Heading fontFamily={"body"} size={"sm"} children="@ Power Programmer 🧑‍💻" color={"yellow.400"}/>
        </VStack>
        <HStack spacing={['2','10']} justifyContent={"center"} color={"white"} fontSize={"50"}>
            <a href="" target="_blank">
                <TiSocialYoutubeCircular/>
            </a>
            <a href=""target="_blank">
                <TiSocialInstagramCircular/>
            </a>
            <a href="https://github.com/Fenilpanseriya"target="_blank">
                <DiGithub/>
            </a>

        </HStack>
        </Stack>
    </Box>
    
  )
}

export default Footer
