import { Grid,Box,Heading,Text, VStack, Button, useDisclosure } from '@chakra-ui/react';
import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';

import AddLecture from './AddLecture';
import toast from 'react-hot-toast';
import { clearError } from '../../redux/reducers/courseReducer';
import { useDispatch } from 'react-redux';
import { clearMessage } from '../../redux/reducers/courseReducer';

import AddAssignment from './AddAssignment';
const WatchCourse = () => {
    const {index}=useParams();
    const [lectureNo,setlectureNo]=useState(0); 
    const [isLecture,setIsLecture]=useState("");
    const {user}=useSelector(state=>state.users)
    const {message,error,lectures,loading}=useSelector(state=>state.courses)
    const { isOpen, onOpen, onClose }=useDisclosure();
    console.log(index);
    
    // const lecture=[
    //     {
    //         _id:"vgsvvfvsbfaknewit43754",
    //         title:"sample",
    //         description:"sample description",
    //         video:{
    //             url:'dszdfvhdv'
    //         },

    //     },
    //     {
    //         _id:"vgsvvfvsbnewit43754",
    //         title:"sample",
    //         description:"sample description",
    //         video:{
    //             url:'dszdfvhdv'
    //         },

    //     }
        
    // ]
    const dispatch=useDispatch();
    
    
    const handleClick=(e)=>{
        e.preventDefault();
        if(e.target.id==="addlecture"){
            setIsLecture("addlecture")
        }
        else{
            setIsLecture("addassignment");
        }
        onOpen();
    }
    useEffect(()=>{
        //dispatch(getCourses(index))
        dispatch(clearError());
        
        if(message){
            toast.success(message);
            dispatch(clearMessage())
        }

    },[lectures,error,message,loading])
  return (<Grid minH={'90vh'} templateColumns={['1fr','3fr 1fr']} pt={"12"} ml={"6"}>
            <Box>
            
                <video width={"100%"} controls   controlsList=' autoPlay muted  noremoteplayback' disableRemotePlayback src={lectures && lectures[lectureNo]?.video.url}>
                </video>
                <Heading children={lectures.length>0 && `#${lectureNo+1} ${lectures[lectureNo]?.title}`} m="4"/>
                <Heading m="4" children="Description"/>
                <Text  m="4" children={ lectures.length>0 && lectures[lectureNo]?.description} fontSize={"medium"}>

                </Text>
                <Text m="4"  fontSize={"medium"} variant={"link"}>
                    {/* {lectures.length>0 && lectures[lectureNo]?.assignment?.url?"Assignment Link":null} */}
                     {/* <a href={lectures.length>0 && lectures[lectureNo]?.assignment?.url} target='_blank'>Assignment Link</a> */}
                     <a href="https://forms.gle/7hki6Wh3CAPvwWnR9" target='_blank'>Assignment Link</a>
                </Text>
            
            </Box>
            <VStack ml={"220"}  boxShadow={'2px 0 10px rgba(107,70,193,0.5)'} h={"100vh"} padding={"0"}>
                {
                    lectures.length>0 ?lectures.map((item,index)=>(
                        <button  onClick={e=>{setlectureNo(index)}}key={item._id} style={{width:"100%" , margin:0, padding:"1rem" ,textAlign:"center" ,borderBottom:"1px solid rgba(0,0,0,0.2)"}}>
                            <Text noOfLines={"1"}>
                                #{index+1}{" "}{item.title}
                            </Text>

                        </button>
                    )):null
                }
                { 
                    user.role==="admin" && 

                            <Button id="addLecture" variant={"ghost"} textColor={"purple.500"} w={"full"} onClick={handleClick}>
                                <Text>
                                    Add Lecture
                                </Text>
                            </Button>
                    
                }
                { 
                    user.role==="admin" && 

                            <Button id="addAssignment" variant={"ghost"} textColor={"purple.500"} w={"full"} onClick={handleClick}>
                                <Text>
                                    Add Assignment
                                </Text>
                            </Button>
                    
                }
                {isLecture==="addlecture" && <AddLecture isOpen={isOpen} onClose={onClose} id={index}/>}
                {isLecture==="addassignment" && <AddAssignment isOpen={isOpen} onClose={onClose} id={index} lectureId={lectureNo}/>}
            </VStack>
  </Grid>
  )
}

export default WatchCourse
