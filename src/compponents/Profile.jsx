import { Image,Avatar, Button, Container, HStack, Heading, Text,Input
,VStack, Stack, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody } from '@chakra-ui/react'
import React, { useState,useEffect } from 'react'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { useDisclosure } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { clearError } from '../redux/reducers/profileReducer'
import { clearMessage } from '../redux/reducers/profileReducer'
import { changeProfilePicture, removePlaylist } from '../redux/actions/profile'
import { cancleSubscription, getMyProfile } from '../redux/actions/user'

const Profile = ({user}) => {
    const title=useSelector(state=>state.users.title)
    console.log("user in profile "+user.avatar)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [prev,setPrev]=useState("");
    const changeHandle=(e)=>{
        e.preventDefault();
        onOpen();
    }
    
    const dispatch=useDispatch();
    const {loading,message,error}=useSelector(state=>state.profile)
    async function removeCourse(id){
        console.log("id is "+id);
        await dispatch(removePlaylist(id));
       
    }
    const cancleHandler=async()=>{
        await dispatch(cancleSubscription())
        dispatch(getMyProfile())

    }
    useEffect(() => {
        if (error) {
          toast.error(error);
          dispatch(clearError());
        } else {
          toast.success(message);
          dispatch(clearMessage())
        }
      }, [dispatch, error, message]);
  return (
    <Container py='8' h={"90vh"}>
        <Heading children="Profile"/>
        <HStack direction={["center","flex-start"]} py={"4"}>
        <VStack spacing={"3"} direction={["center","flex-start"]}>
            <Avatar src={user.avatar.url} boxSize={"48"}/>
            <Button onClick={changeHandle}color="yellow.400" variant={"ghost"}>
                Change Photo
            </Button>
        </VStack>
        <VStack spacing={"2"}direction={["center","flex-start"]} alignItems={"flex-start"} pl="4">
            <HStack >
                <Text fontWeight={"bold"} ml="0" >
                    Name:
                </Text>
                <Text>
                    {user && user.name}
                </Text>

            </HStack>
            <HStack>
                <Text fontWeight={"bold"}>
                    Email:
                </Text>
                <Text>
                    {user && user.email}
                </Text>

            </HStack>
            <HStack>
                <Text fontWeight={"bold"}>
                    CreatedAt:
                </Text>
                <Text>
                    {user && user.createdAt.split("T")[0]}
                </Text>
            </HStack>
            <HStack>
                <Text fontWeight={"bold"}>Subscription:</Text>
                { user && user.subscription && user.subscription.status==="active"?
                    <Button onClick={cancleHandler} color="yellow.400" variant={"ghost"}>Cancle Subscription</Button>
                    
                :<Link to="/subscribe">
                <Button color={"yellow.400"} variant={"ghost"}>Buy Subscription</Button>
                </Link>
                }
            </HStack>
            <HStack>
                <Link to="/updateProfile">
                    <Button variant={"ghost"}>Update Profile</Button>
                </Link>
                <Link to="/changePassword">
                    <Button variant={"ghost"}>Change Password</Button>

                </Link>
                
            </HStack>
        </VStack>
        </HStack>
        <Heading children="Playlist"/><br></br>
        
        {
            user && user.playlist && user.playlist.length>0?<Stack flexWrap={"wrap"} direction={["center","flex-start"]}>
                
                {
                    
                    user.playlist?.map((item,index)=>(
                        <>
                        
                        <VStack py={"4"} spacing={["8","16"]} direction={["flex-start","center"]} w="30%">
                        <Image src={item.poster} w={"full"}/>
                        <Text>{title ? title:""}</Text>
                        <HStack>
                            <Link to={`/course/${index+1}`}>
                            <Button color={"yellow.400"} variant={"link"}>Watch Now</Button>
                            </Link>
                            <RiDeleteBin7Fill onClick={()=>removeCourse(item.course)}/>
                        </HStack>
                        </VStack>
                        </>
                    ))
                }
            </Stack>:null
        }
        <PhotoChange isOpen={isOpen}  onClose={onClose} setPrev={setPrev} prev={user ? user.avatar.url:null} />
    </Container>
  )
}

export default Profile

const PhotoChange=({isOpen,onClose,setPrev,prev})=>{
    
    const [image,setImage]=useState();
    const handleSubmit=(e)=>{
        const file=e.target.files[0];
        console.log(file);
        const reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=()=>{
            //console.log("reader result is "+reader.result)
            setImage(file);
            setPrev(reader.result);
            
        }
    }
    const dispatch=useDispatch();
    const closeHandler=async(e)=>{
        onClose();
        const myform=new FormData();
        myform.append("file",image)
        await dispatch(changeProfilePicture(myform))

        setImage("");
    }   
    return (
        <Modal onClose={onClose} isOpen={isOpen} >
            
            <ModalOverlay backdropBlur={"blur(10px)"}/>
            <ModalContent>
                <ModalCloseButton/>
                <ModalBody>
                    
                       <Avatar src={prev} boxSize={"48"}/>
                    
                    <Heading fontSize={"medium"} py="4" children="Change Photo"/>
                    <form  py="3">
                        <Input  onChange={handleSubmit}type="file"  focusBorderColor='yellow.400'/>
                        <Button onClick={closeHandler} colorScheme='yellow' w="full">
                            <Text textAlign={"center"}>Change</Text>
                        </Button>
                        <Button  py={"5"} onClick={closeHandler} variant={"ghost"} mr="3">Cancle</Button>
                    </form>
                </ModalBody>

            </ModalContent>

        </Modal>
    )
}