import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Sidebar from './Sidebar'
import { Text,Grid,Th, Tr, Td,Thead,Box,Heading, TableContainer, Table, TableCaption, Tbody, HStack, Button, Container } from '@chakra-ui/react'
import { getAllUsers, roleUpdate, userDelete } from '../../redux/actions/admin';
import { useDispatch } from 'react-redux';


const Users = () => {
  const [page,setPage]=useState(0);
  //const [part,setPart]=useState(1);
  const updateHandler=async(id)=>{
    console.log(id);
    const token=await localStorage.getItem("token")
    if(token){
      await dispatch(roleUpdate(id,token));
      getAllUser();
    }
    
    
  }
  const deleteHandler=async(id)=>{
    console.log(id);
    await dispatch(userDelete(id));
    getAllUser();
  }
  let users1;
  const [users,setUsers]=useState([]);
  const dispatch=useDispatch();
  const getAllUser=async()=>{
      users1=await dispatch(getAllUsers());
      setUsers(users1);
  }
  
  const len=users?.length;
  let part=len%3===0?len/3:1+len/3
  const handleChange=(pagenum)=>{
    setPage(pagenum<=0?part:(pagenum===part+1)?1:pagenum);
  }
   console.log("data "+users);
  let userData=users?.slice((page-1)*3,page*3)
  
  console.log("len is "+userData);
  
  
  useEffect(()=>{
    
    getAllUser();
  },[])
  
  return (<>
    <Grid templateColumns={['1fr','5fr 1fr']} minH={"100vh"}>
    <Box p={["0",'16']} overflowX={"auto"}>
    <Heading textTransform={"uppercase"} children="All Users" my='16'textAlign={['center','left']}/>
      <TableContainer width={["100vw",'full']} css={{
                '&::-webkit-scrollbar':{display:"none"}
           }}>
        <Table variant={"simple"} size="lg">
          <TableCaption>
            All Available Users in Database
          </TableCaption>
          
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Subscription</Th>
              <Th isNumeric>Action</Th>
            </Tr>
          </Thead>
          
          <Tbody>
          {
            userData && userData.length>0 &&userData.map((item,index)=>(
              <Row key={item._id} item={item} updateHandler={updateHandler} deleteHandler={deleteHandler}/>
            ))
          }

          </Tbody>
          
          
          
        </Table>
      </TableContainer>
    </Box>
    
    <Sidebar/>
</Grid>
<Container  display={"flex"} flexWrap={"wrap"}>
  <Button variant={"ghost"} onClick={()=>handleChange(page-1)}>
          ⬅️
  </Button>
  <Text >
          {page}
  </Text>
  <Button variant={"ghost"} onClick={()=>handleChange(page+1)}>
          ➡️
  </Button>
</Container>
</>

  )
}

export default Users

const Row=({item,updateHandler,deleteHandler})=>{
  console.log(JSON.stringify(item))
  return(
    <Tr>
      <Td>{item._id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.role}</Td>
      <Td>{item?.subscription?.status==="active"?'Active':"Not Active"}</Td>
      <Td isNumeric>
        <HStack justifyContent={"flex-end"}>
          <Button onClick={()=>updateHandler(item._id)} variant={"outline"} color="purple.500">
            Change Role
          </Button>
          <Button onClick={()=>deleteHandler(item._id)} variant={"outline"} color="purple.600">
          ✖️       
          </Button>
        </HStack>
      </Td>
      </Tr>

  )
    
    
}