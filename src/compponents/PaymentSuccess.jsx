import React from 'react'
import { Container,Box,Heading,Text,VStack, Button, Center } from '@chakra-ui/react'
import {  RiCheckboxCircleFill } from 'react-icons/ri'
import { Link, useSearchParams } from 'react-router-dom'
const PaymentSuccess = () => {
    const [queryParam]=useSearchParams();
    const reference=queryParam.get("reference");
  return (
    <Container py="16" flexDirection={['column', 'row']} h={"90vh"}  >
         <Heading
          children="Congratulations!! Now you can access premium content..."
          fontStyle={'bold'}
          textAlign={"center"}
        />
        <Box pt="10">

        </Box>
        <Box boxShadow={"lg"} borderRadius={"5"}  > 

        
      <VStack direction={['center', 'center']} spacing={"5"} pb="4" w={"full"} >
        
        <Box pt="0" pb="0" justifyContent={"center"} >
          
          <Container p="4" justifyContent={"center"}>
            <Box bgColor={"yellow.400"} w={"full"} h={"10"} borderRadius={"5"}>
            <Text justifyContent={['center', 'center']} p="2">
              Your are part of Premium subscribers😀
            </Text>
            </Box>
            
             <Box py={"3"} justifyContent={"center"} >
                <Button marginLeft={"46%"}>
                 <RiCheckboxCircleFill height={"20"} xHeight={"20"} />

                </Button>
                
                </Box>
            
            <Box py={"5"} justifyContent={"center"}>

            <Link to="/profile">
                <Button variant={"ghost"} justifyContent={"center"} marginLeft={"35%"}>
                    <Text>
                        Go to Profile
                    </Text>
                </Button>
            </Link>
           
            </Box>
          </Container>
          <Box p="4"bgColor={"yellow.400"} borderRadius={"5"}>
                <Text  textColor="white"textTransform={"uppercase"} fontSize={"medium"} justifyContent={["center","flex-start"]}>
                    100% refaund at cancellation 
                </Text>
                <Text  textColor="white" fontSize={"small"} justifyContent={["center","flex-start"]}>
                    *Terms & Condition Apply 
                </Text>
                <Text  textColor="white" fontSize={"small"} justifyContent={["center","flex-start"]}>
                    Reference id {" "+reference} 
                </Text>
          </Box>
        </Box>
      </VStack>
      </Box>
    </Container>
  )
}

export default PaymentSuccess
