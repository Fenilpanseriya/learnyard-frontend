import { Container, Heading, VStack ,Input,Button,FormLabel} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { forgetPassword } from '../redux/actions/profile';

const Forget = () => {
    const [email,setEmail]=useState("");
    const dispatch=useDispatch();
    const {loading}=useSelector(state=>state.users)
    const submitHandler=async(e)=>{
      e.preventDefault();
      await dispatch(forgetPassword(email))

    }
  return (
    <Container height={"78vh"}>
        <form onSubmit={submitHandler}>
            <Heading children="Forget Password" my='16' textAlign={["center","left"]}/>
            <VStack spacing={"8"}>
            <FormLabel htmlFor='email' children="Email Address"/>
                <Input required id="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder='abc@gmail.com' type="email" focusBorderColor='yellow'/>
                <Button isLoading={loading} type="submit" w={"full"} colorScheme='yellow' textColor={"black"} mb={"5"}>
                    
                        Get Reset Link
                    
                </Button>
            </VStack>
        </form>
    </Container>
  )
}

export default Forget
