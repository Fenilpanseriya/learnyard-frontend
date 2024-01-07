import { Container, Heading, VStack ,Input,Button,FormLabel} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { changePassword } from '../redux/actions/profile';
import { useSelector } from 'react-redux';

const ResetPassword = () => {
    const [newPass,setNewPass]=useState();
    const [oldPass,setOldPass]=useState();
    const params=useParams();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    console.log(params.token);
    const {loading}=useSelector(state=>state.users.loading)
    const submitHandler=async(e)=>{
      e.preventDefault();
      await dispatch(changePassword(newPass,oldPass));
      navigate("/profile")
    }
  return (
    <Container py="16" h="90vh">
        <form onSubmit={submitHandler}>
            <Heading children="Reset Password" my='16' textAlign={["center","left"]}/>
            <VStack spacing={"8"}>
            <FormLabel htmlFor='email' children="Email Address"/>
                <Input required id="password" value={newPass} onChange={e=>setNewPass(e.target.value)} placeholder='New Password' type="password" focusBorderColor='yellow'/>
                <Input required id="password" value={oldPass} onChange={e=>setOldPass(e.target.value)} placeholder='Old Password' type="password" focusBorderColor='yellow'/>
                <Button  isLoading={loading}type="submit" w={"full"} colorScheme='yellow' textColor={"black"} mb={"5"}>
                    
                      Update Password  
                    
                </Button>
            </VStack>
        </form>
    </Container>
  )
}

export default ResetPassword
