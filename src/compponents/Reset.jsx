import { Container, Heading, VStack ,Input,Button,FormLabel} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../redux/actions/profile';

const Reset = () => {
    const params=useParams();
    console.log("token is "+params.token)
    const {loading }=useSelector(state=>state.users);
    const [password,setPassword]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const submitHandler=async(e)=>{
        e.preventDefault();
        const isSet=await dispatch(resetPassword(password,params.token));
        
        if(isSet){
            navigate("/login")
        }
    }
  return (
    <Container height={"90vh"}>
        <form onSubmit={submitHandler}>
            <Heading children="Reset Password" my='16' textAlign={["center","left"]}/>
            <VStack spacing={"8"}>
            <FormLabel htmlFor='password' children="Password"/>
                <Input required id="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder='Enter new passwoord' type="text" focusBorderColor='yellow'/>
                <Button isLoading={loading} type="submit" w={"full"} colorScheme='yellow' textColor={"black"} mb={"5"}>
                    
                    Reset Password
                    
                </Button>
            </VStack>
        </form>
    </Container>
  )
}

export default Reset
