import { Container, VStack ,Box, Spinner,Button} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {TypeAnimation} from 'react-type-animation'
import {Input,FormLabel}from "@chakra-ui/react"
import { courseRequest } from '../../redux/actions/course'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { clearError, clearMessage } from '../../redux/reducers/courseReducer'
import { useNavigate } from 'react-router-dom'
const Request = () => {
    const [email,setEmail]=useState("");
    const [name,setName]=useState("");
    const [course,setCourse]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const submitHandler=async(e)=>{
        e.preventDefault();
        dispatch(courseRequest(email,name,course))
        navigate("/");
    }
    const {loading,message,error}=useSelector(state=>state.courses);
    useEffect(()=>{
        if(error){
            toast.error(error)
            dispatch(clearError());
        }
        else if(message){
            toast.success(message);
            dispatch(clearMessage());
        }
    },[message,error,dispatch])
    // if(loading){
    //     return (
    //         <Spinner/>
    //     )
    // }
  return (
    <Container h={'95vh'}>
        <VStack h="full" justifyContent={"center"} spacing={'16'}>
         <TypeAnimation  sequence ={["Fill Course Request Form",1000," Fill Course Request Form",1000]}wrapper="span" repeat={Infinity}speed={50} deletionSpeed={50}  style={{fontSize:'2rem' , display:'inline-block', color:'orange', fontWeight:'bold'}} />
                <form style={{width:"100%"}} onSubmit={submitHandler}>
                    <Box my='4'>
                        <FormLabel htmlFor='email' children="Email Address"/>
                        <Input required id="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder={"abc@gmail.com"} type="email" focusBorderColor='yellow.400'/>

                    </Box>
                    <Box my='4'>
                        <FormLabel htmlFor='name' children="Name"/>
                        <Input required id="Name" value={name} onChange={e=>setName(e.target.value)} placeholder={"Enter Your Name"} type="text" focusBorderColor='yellow.400'/>

                    </Box>
                    <Box my='4'>
                        <FormLabel htmlFor='course' children="Course"/>
                        <Input required id="Course" value={course} onChange={e=>setCourse(e.target.value)} placeholder={"Enter Course Name You Want"} type="text" focusBorderColor='yellow.400'/>

                    </Box>
                    <Button my='4' colorScheme='yellow' type='submit' width={"full"} >
                        Send Request
                    </Button>
                </form>
        </VStack>
    </Container>
                    
  )
}

export default Request
