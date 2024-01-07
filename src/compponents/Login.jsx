import { Box, Container, FormLabel,  Input, VStack,Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import {TypeAnimation} from "react-type-animation"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../redux/actions/user'
const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const submitHandler=(e)=>{
        e.preventDefault();;
        dispatch(login(email,password));
        
        navigate("/profile")

    }
  return (
    <Container h={'95vh'}>
        <VStack h="full" justifyContent={"center"} spacing={'16'}>
         <TypeAnimation  sequence ={["Welocme To LearnYard",1000," Welocme To LearnYard",1000]}wrapper="span" repeat={Infinity}speed={50} deletionSpeed={50}  style={{fontSize:'2rem' , display:'inline-block', color:'orange', fontWeight:'bold'}} />
                <form style={{width:"100%"}} onSubmit={submitHandler}>
                    <Box my='4'>
                        <FormLabel htmlFor='email' children="Email Address"/>
                        <Input required id="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder={"abc@gmail.com"} type="email" focusBorderColor='yellow.400'/>

                    </Box>
                    <Box my='4'>
                        <FormLabel htmlFor='password' children="Password"/>
                        <Input required id="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder={"Enter Your Password"} type="text" focusBorderColor='yellow.400'/>

                    </Box>
                    <Box>
                    <Link to="/forgetPassword">
                        <Button variant="link" fontSize={"sm"} colorScheme='blackAlpha.800'>
                            Forget Password
                        </Button>

                    </Link>
                    </Box>
                    <Button my='4' colorScheme='yellow' type='submit' >
                        Login
                    </Button>
                    <Box my='4'>
                        New User ? <Link to="/Signup">
                            <Button colorScheme='yellow' variant={"link"}>
                                Sign Up
                            </Button>
                            {" "}Here
                        </Link>
                    </Box>
                </form>
        </VStack>
    </Container>
  )
}

export default Login
