import { Box,Button,Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
    const loc=useLocation();
  return (
    <Box  marginLeft={"120"} boxShadow={"2px 0 10px rgba(107,70,193,0.5)"} justifyContent={"center"} borderRadius={"lg"} py="0">
        <VStack py={["4","10"]} spacing={"4"} padding={"8"} textColor={"purple.500"}>
        <LinkButton name="Dashboard" color={loc==="/admin/dashboard"?"purple":""} to="/admin/dashboard"/>
        <LinkButton name="Create Course" color={loc==="/admin/createcourses"?"purple":""} location="/admin/createcourse" to="/admin/createcourse"/>
        <LinkButton name="Courses" color={loc==="/admin/courses"?"purple":""} location="/admin/courses" to="/admin/courses"/>
        <LinkButton name="Users" color={loc==="/admin/users"?"purple":""} location="/admin/users"to="/admin/users"/>

        </VStack>
        
    </Box>
  )
}

export default Sidebar

const  LinkButton=({name,color,to})=>{
    return(

        <Link to={to}>
            <Button color={color} >
                <Text>
                    {name}
                </Text>

            </Button>
        </Link>
    )
}