import React,{useState} from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Stack,Modal,ModalOverlay,ModalContent,ModalCloseButton,ModalBody,Heading,Input,Textarea,Button,Text } from '@chakra-ui/react'
import { addAssignment } from '../../redux/actions/course';
import axios from 'axios';
const AddAssignment = ({isOpen,onClose,id,lectureId}) => {
    const [title,setTitle]=useState("");
    const [text,setText]=useState("");
    const [assignment,setAssignment]=useState("");
    const {loading}=useSelector(state=>state.courses);
    const handleChange=(e)=>{
        const file=e.target.files[0];
        console.log(file);
        const reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=()=>{
            //console.log("reader result is "+reader.result)
            setAssignment(file)
        }
    }
    const dispatch=useDispatch();
    const closeHandler=async()=>{
        const myform=new FormData();
        myform.append("file",assignment);
        myform.append("upload_preset","l9ces9wp")
        myform.append("cloud_name","dmklqds5q");
        const response=await fetch("https://api.cloudinary.com/v1_1/dmklqds5q/image/upload",{
            method:"post",
            body:myform,
            mode:"cors"
            
            
        }
       ).then((data)=>data.json()).then((jsondata)=>{return jsondata;}).catch((e)=>console.log("error is "+e))
        
        console.log(JSON.stringify(response));
        await dispatch(addAssignment(response?.public_id,response?.url,id,lectureId));

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
                        <Input  onChange={handleChange}type="file"  focusBorderColor='purple.400' placeholder='add assignment' m={"3"}/>
                        <Input placeholder='Assignment Title' type="text" onChange={e=>setTitle(e.target.value)} value={title} m={"3"} />
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

export default AddAssignment
