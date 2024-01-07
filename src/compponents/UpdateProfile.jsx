import { Box, Container, FormLabel,  Input, VStack,Button,Text, Avatar } from '@chakra-ui/react'
import React, { useState } from 'react'
import {TypeAnimation} from "react-type-animation"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { changeProfile } from '../redux/actions/profile'
import { useSelector } from 'react-redux'
const UpdateProfile = () => {
    const [email,setEmail]=useState("")
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const [prev,setPrev]=useState("");
    const [image,setImage]=useState("");
    const fileUpload={
        "&::file-selector-button":{
            cursor:"pointer",
            marginLeft:"-5%",
            Width:"110%",
            Height:"100%",
            color:"#ECC948",
            border:"none",
            backgroundColor:"white"
        }
    }
    const handleImage=(e)=>{
        const file=e.target.files[0];
        const reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=()=>{
            console.log("reader result is "+reader.result)
            setImage(file);
            setPrev(reader.result);
        }
    }
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {loading}=useSelector(state=>state.profile)
    const handleSubmit=async (e)=>{
        e.preventDefault();
       const myform = new FormData();
       myform.append("name",name);
       myform.append("email",email);
       myform.append("password",password);
       myform.append("file",image);
       
    //    myForm.append("name",name);
    //    myForm.append("email",email);
    //    myForm.append("password",password);
    //    myForm.append("file",image);
    //    console.log(JSON.stringify(myForm))
        const isCreate=await dispatch(changeProfile(myform))
        if(isCreate){
            navigate("/profile")
        }
    }
  return (
    <Container h={'95vh'}>
        <VStack h="full" justifyContent={"center"} spacing={'16'}>
            
            <TypeAnimation  sequence ={["Change Your Profile....",1000,"Change Your Profile....",1000]}wrapper="span" repeat={Infinity}speed={50} deletionSpeed={50}  style={{fontSize:'2rem' , display:'inline-block', color:'black', fontWeight:'bold'}} />
                <form style={{width:"100%"}} onSubmit={handleSubmit}>
                    <Box my='2' display={"flex"} justifyContent={"center"}>
                        <Avatar size={'2xl'} src={prev} />   

                    </Box>
                    <Box my='4'>
                        <FormLabel htmlFor='name' children="Name"/>
                        <Input required id="name" value={name} onChange={e=>setName(e.target.value)} placeholder={"abc"} type="text" focusBorderColor='yellow.400'/>

                    </Box>
                    <Box my='4'>
                        <FormLabel htmlFor='email' children="Email Address"/>
                        <Input required id="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder={"abc@gmail.com"} type="email" focusBorderColor='yellow.400'/>

                    </Box>
                    <Box my='4'>
                        <FormLabel htmlFor='password' children="Password"/>
                        <Input required id="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder={"Enter Your Password"} type="text" focusBorderColor='yellow.400'/>

                    </Box>
                    <Box my='4'>
                        <FormLabel htmlFor='chooseAvatar' children="Choose Avatar"/>
                        <Input required id="chooseAvatar"  type="file" focusBorderColor='yellow.400'
                                css={fileUpload} onChange={handleImage}
                        />

                    </Box>
                    
                    <Button  isLoading={loading}my='4' colorScheme='yellow' type='submit'  >
                        Update Profile
                    </Button>
                    
                </form>
        </VStack>
    </Container>
  )
}

export default UpdateProfile;
