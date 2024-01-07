import React, { useState } from 'react'
import {Modal,ModalBody,ModalContent,ModalOverlay,Button,Text,Heading,ModalCloseButton,Input, Textarea, Stack}from "@chakra-ui/react"
import { useDispatch } from 'react-redux';
import { addLecture } from '../../redux/actions/course';
import { useSelector } from 'react-redux';
import axios from 'axios';
const AddLecture = ({isOpen,onClose,id}) => {
    console.log("id "+id)
    const [title,setTitle]=useState("");
    const [text,setText]=useState("");
    const [video,setVideo]=useState("");
    const {loading}=useSelector(state=>state.courses);
    const handleChange=(e)=>{
        const file=e.target.files[0];
        console.log(file);
        const reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=()=>{
            //console.log("reader result is "+reader.result)
            setVideo(file)
        }
    }
    const dispatch=useDispatch();
    const closeHandler=async()=>{
        const myform=new FormData();
        myform.append("file",video);
        //myform.append("discription",text);
        //myform.append("title",title);
        myform.append("upload_preset","l9ces9wp")
        myform.append("cloud_name","dmklqds5q");
        const {public_id,secure_url}=await fetch("https://api.cloudinary.com/v1_1/dmklqds5q/video/upload",{
        method:"post",
        body:myform
        }
       ).then((data)=>data.json()).then((jsondata)=>{return jsondata;}).catch((e)=>console.log("error is "+e))
        
        //console.log(JSON.stringify(response.data))
        await dispatch(addLecture(id,public_id,secure_url,text,title));

        onClose();
    }
  return (
    <Stack py={"16"} direction={["center","center"]} spacing={"4"}>
    <Modal onClose={onClose} isOpen={isOpen} >
            
            <ModalOverlay backdropBlur={"blur(10px)"}/>
            <ModalContent>
                <ModalCloseButton/>
                <ModalBody>
                    
                       
                    
                    <Heading  py="4" children="Add Lecture" textColor={"purple.500"} fontSize={"large"}/>
                    <form  py="3">
                        <Input  onChange={handleChange}type="file"  focusBorderColor='yellow.400' placeholder='add lecture video' m={"3"}/>
                        <Input placeholder='Lecture title' type="text" onChange={e=>setTitle(e.target.value)} value={title} m={"3"} />
                        <Textarea onChange={e=>setText(e.target.value)} value={text} type="text" placeholder='add Description' m="3"/>
                        <Button onClick={closeHandler} colorScheme='purple' w="full" m="3" isLoading={loading}>
                            <Text textAlign={"center"}>Add</Text>
                        </Button>
                        <Button  p={"5"} onClick={closeHandler} variant={"ghost"} mr="3">Cancle</Button>
                    </form>
                </ModalBody>

            </ModalContent>

        </Modal>
        </Stack>
  )
}

export default AddLecture
