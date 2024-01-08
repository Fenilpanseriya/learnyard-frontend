import { Button, Container, HStack, Input,VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Heading,Text,Stack } from '@chakra-ui/react'
import { useState } from 'react'
import Course from './Course'
import "../Home/home.css"
import { useDispatch } from 'react-redux'
import { getAllCourses } from '../../redux/actions/course'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { clearError } from '../../redux/reducers/courseReducer'
const Cources = () => {
    const [course,setCourse]=useState("");
    const categories=["Web Devlopment","Android Devlopment","Machine Learning","Artificial Intelligence","Devops"];
    const [category,setCategory]=useState("");
    const imgsrc="https://odemur.com.br/wp-content/uploads/2018/07/desenvolvedor-full-stack.jpg"
    const dispatch=useDispatch();
    const {loading,courses,message,error}=useSelector(state=>state.courses);
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
          return;
        }
        dispatch(getAllCourses(category,course))
        
      };
    useEffect(()=>{
        dispatch(getAllCourses(category,course))
        
        if(error){
            toast.error(error);
            dispatch(clearError())
        }
        // window.addEventListener('scroll', handleScroll);
        // return () => window.removeEventListener('scroll', handleScroll);
        

    },[course,category])
  return (
    <Container minH={"90vh"} maxW={"container.lg"} paddingY={"7"} flexDir={["center","flex-start"]}>
        

        
        <Heading marginBottom={"3"} children="All Courses.."/>
        <Input marginBottom={"3"}value={course} onChange={e=>setCourse(e.target.value)} placeholder='Search Course..' type="text" focusBorderColor='yellow.400'/>
        <HStack overflowX={"scroll"} flexWrap={"wrap"}>
            {
                categories.map((item,index)=>(
                    <Button key={index} variant="ghost" margin={"4"} onClick={()=>{setCategory(item.toLowerCase())}}>
                        <Text>
                            {item}
                        </Text>
                    </Button>
                ))

            }
            </HStack>        
            
             <Stack  m={"8"} minW={"60%"} direction={["column","row"]} flexWrap={"wrap"}  justifyContent={"space-evenly"}  objectFit={"contain"} spacing={"8"}>

        {
            courses.length>0?courses?.map((item)=>(
                <Course index={item?._id} image={item?.poster?.url} title={item?.title} creator={item?.createdBy} lectures={item?.numOfVideos} views={item?.views} description={item?.description}/>
            )):<Heading children=' Oops! Courses Not Found'opacity={"0.5"} mt={"5"}/>
        }
        
           
        </Stack>
        
    </Container>

  )
}

export default Cources
