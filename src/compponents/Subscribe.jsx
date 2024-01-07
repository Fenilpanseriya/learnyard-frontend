import React, { useEffect, useState } from 'react';
import {
  Container,
  VStack,
  Heading,
  Box,
  Button,
  Text,
} from '@chakra-ui/react';
import { Link, json } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Axios } from '../Axios';
import localStorage from 'redux-persist/es/storage';
import { buyScubscription, getMyProfile } from '../redux/actions/user';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import logo from "../assets/images/logo.png"
import {  addKey, clearError } from '../redux/reducers/userReducer';
const Subscribe = ({user}) => {
 
  const dispatch=useDispatch();
  const [keys,setKeys]=useState()
  const {error,subscriptionId,loading,keykey,order_id}=useSelector(state=>state.users)
  const subscribeHndler=async ()=>{
    const token=await localStorage.getItem("token");
    console.log("token-> "+JSON.stringify(token))
    const res=await Axios.get("/getKey",{
      headers:{
        "Content-Type":"application/json",
        "token":token
      }
    })
    let k=await res.data.key;
    console.log("k is "+k)
    const addKeys=async(k)=>{
      await setKeys(k);
      dispatch(addKey(k));
      
    }
    await addKeys(k);
    console.log("data is "+JSON.stringify(keys))
    console.log(keys)
    dispatch(buyScubscription());
    dispatch(getMyProfile());
    
    
  }

    

  useEffect(()=>{
    
    if(error){
      toast.error(error);
      dispatch(clearError);
    }
    if(subscriptionId){
      console.log("order id "+order_id)
      
      const openCheckout=async()=>{
        const token=await localStorage.getItem("token");
        const options={
          key:"rzp_test_f05GJyy0PJuGWx",
          amount:"3000",
          corrency:"INRS",
          name:"LearnYard",
          description:"Access to all Prime material",
          image:logo,
          order_id:order_id,
          
          callback_url:`http://localhost:6060/api/v1/paymentvarification?token=${token}&order_id=${order_id}`,
          prefill:{
            name:user.name,
            email:user.email,
            contact:""
          },
          notes:{
            address:"Power Programmer at LearnYard"
          },
          theme:{
            color:"#FFC800"
          }

        }
        const razor=new window.Razorpay(options);
        razor.open();
      }
      openCheckout();
    }
  },[dispatch,error,user.name,user.email,subscriptionId,order_id])
  return (
    <Container py="16" flexDirection={['column', 'row']} h={"90vh"}  >
         <Heading
          children="Welcome"
          fontStyle={'bold'}
          textAlign={"center"}
        />
        <Box pt="10">

        </Box>
        <Box boxShadow={"lg"} borderRadius={"5"} > 

        
      <VStack direction={['center', 'center']} spacing={"5"} pb="4" >
        <Box width={"full"} bgColor={"yellow.400"} p="2" borderRadius={"3"}>
            <Text>Premium Pack ₹2999.00</Text>
        </Box>
        <Box pt="0" pb="0" >
          
          <Container p="4">
            <Text justifyContent={['center', 'center']}>
              Join Premium Pack to get all High Quality Content  for Learning
            </Text>
            <Text
              pt="3"
            //   textAlign={"center"}
              fontWeight={'bold'}
              fontSize={'medium'}
              justifyContent={'center'}
            >
              ₹2999.00 Only
            </Text>
            <Box pt="8" justifyContent={"center"} alignItems={"center"}>
            
              <Button isLoading={loading} colorScheme="yellow" alignItems={"center"} onClick={subscribeHndler}>
                <Text  textColor="black">Buy Now</Text>
              </Button>
            

            </Box>
            
          </Container>
          <Box p="4"bgColor={"grey"} borderRadius={"5"}>
                <Text  textColor="white"textTransform={"uppercase"} fontSize={"medium"} justifyContent={["center","flex-start"]}>
                    100% refaund at cancellation 
                </Text>
                <Text  textColor="white" fontSize={"small"} justifyContent={["center","flex-start"]}>
                    *Terms & Condition Apply 
                </Text>
          </Box>
        </Box>
      </VStack>
      </Box>
    </Container>
  );
};

export default Subscribe;
