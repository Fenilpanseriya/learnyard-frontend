import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { Image,Grid,Th, Tr, Td,Thead,Box,Heading, TableContainer, Table, TableCaption, Tbody, HStack, Button, useDisclosure } from '@chakra-ui/react'
import CourseModal from './CourseModal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllCourses, getCourses } from '../../redux/actions/course';
import { lectureDelete } from '../../redux/actions/admin';

const AdminCourses = () => {
  const{ isOpen,onOpen,onClose}=useDisclosure();
  const [title,setTitle]=useState("");
  const [id,setId]=useState("");
  const [desc,setDesc]=useState("");
  const [video,setVideo]=useState("");
  const [prev,setPrev]=useState("");
  const {lectures,courses}=useSelector(state=>state.courses);
  console.log(JSON.stringify(courses));
  // const courses=[{
  //   _id:"vfvghdvbnehvdwv",
  //   title:"fenil",
  //   category:"Web development",
  //   poster:{
  //     url:"https://odemur.com.br/wp-content/uploads/2018/07/desenvolvedor-full-stack.jpg"
  //   },
  //   createdBy:"Power Programmer",
  //   views:100,
  //   numOfVideos:45

  // }];
  const dispatch=useDispatch();
  const courseDetailHandler=async(id)=>{
    onOpen();
    console.log(id);
    await dispatch(getCourses(id));
    setId(id);
    
    
  }
  const deleteHandler=(id)=>{
    console.log(id);
  }
  const deleteBtnHandler=async(courseId,lectureId)=>{
    console.log(courseId,lectureId);
    await dispatch(lectureDelete(lectureId,courseId));
    

  }
  const addLecture=(e,courseId,title,description,video)=>{
    e.preventDefault();
    console.log(courseId,title,description);
  }
  useEffect(()=>{

  },[courses,lectures])
  return (
    <Grid templateColumns={['1fr','5fr 1fr']} minH={"100vh"}>
    <Box p={["0",'8']} overflowX={"auto"}>
    <Heading textTransform={"uppercase"} children="All Courses" my='16'textAlign={['center','left']}/>
      <TableContainer w={["100vw",'full']} css={{
                '&::-webkit-scrollbar':{display:"none"}
           }}>
        <Table variant={"simple"} size="lg">
          <TableCaption>
            All Available Users in Courses 
          </TableCaption>
          
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Poster</Th>
              <Th>Title</Th>
              <Th>Category</Th>
              <Th>Creator</Th>
              
              <Th isNumeric>Views</Th>
              <Th isNumeric>Lactures</Th>
              <Th isNumeric>Action</Th>
            </Tr>
          </Thead>
          
          <Tbody>
          {
            courses.map((item,index)=>(
              <Row key={item._id} item={item} courseDetailHandler={courseDetailHandler} deleteHandler={deleteHandler}/>
            ))
          }

          </Tbody>
          
          
          
        </Table>
      </TableContainer>
      
          <CourseModal 
          isOpen={isOpen}
          id={id}
          titles="hello"
          onClose={onClose} 
          deleteBtnHandler={deleteBtnHandler}  
          addLecture={addLecture}
          setDesc={setDesc}
          setTitle={setTitle}
          setPrev={setPrev}
          setVideo={setVideo}
          desc={desc}
          prev={prev}
          title={title}
          lectures={lectures}
        />
        
      
    </Box>
    
    <Sidebar/>
</Grid>
  )
}

export default AdminCourses

const Row=({item,courseDetailHandler,deleteHandler})=>{
  return(
    <Tr>
      <Td>{item._id}</Td>
      <Td><Image src={item.poster.url} objectFit={"contain"}/></Td>
      <Td>{item.title}</Td>
      <Td textTransform={"uppercase"}>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numOfVideos}</Td>
      
      <Td isNumeric>
        <HStack justifyContent={"flex-end"}>
          <Button onClick={()=>courseDetailHandler(item._id)} variant={"outline"} color="purple.500">
            View Lectures
          </Button>
          <Button onClick={()=>deleteHandler(item._id)} variant={"outline"} color="purple.600">
          ✖️       
          </Button>
        </HStack>
      </Td>
      </Tr>

  )
    
    
}