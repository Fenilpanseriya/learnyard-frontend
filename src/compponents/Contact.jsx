import { Container, VStack,Box,FormLabel,Input, Button,Textarea, HStack,Heading } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Contact = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [course,setCourse]=useState("");
    console.log(name, email, course)
  return (
    <Container h={"90vh"} w='full'>
        <VStack justifyContent={["center","flex-start"]} spacing={'8'} w={'full'} >
            <Heading children='Contact Us' my={'20'} />
            <form >
                    <Box my='4'>
                        <FormLabel htmlFor='name' children="Name"/>
                        <Input required id="name" name="name" value={name} onChange={(e)=>{setName(e.target.value)}}placeholder={"abc"} type="text" focusBorderColor='yellow.400'/>

                    </Box>
                    <Box my='4'>
                        <FormLabel htmlFor='email' children="Email Address"/>
                        <Input required id="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder={"abc@gmail.com"} type="email" focusBorderColor='yellow.400'/>

                    </Box>
                    <Box my='4'>
                        <FormLabel htmlFor='textarea' children="Request For Courses"/>
                        <Textarea htmlFor="textarea" name="course" onChange={(e)=>{setCourse(e.target.value)}} placeholder='add Courses You Want!!' value={course}>

                        </Textarea>
                    </Box>  
                    <HStack>
                        <Link to="/request">
                            <Button colorScheme='yellow' >
                                Submit
                            </Button>

                        </Link>
                        <Link to="/courses">
                            <Button variant={"link"} colorScheme='yellow'>
                                Click Here
                            </Button>{" "}For All Courses
                        </Link>
                    </HStack>
            </form>
            
        </VStack>
    </Container>
  )
}

export default Contact
