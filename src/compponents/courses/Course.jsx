import { VStack,Image,Text, HStack, Button,Box, color, Spinner } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import "../Home/home.css"
import { useDispatch } from 'react-redux'
import { addToPlaylist } from '../../redux/actions/profile'
import { getMyProfile } from '../../redux/actions/user'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { clearError, clearMessage } from '../../redux/reducers/userReducer'
import { getCourses } from '../../redux/actions/course'
const Course = ({index,image,title,creator,lectures,views,noOfLines=2,description,course}) => {
    const {loading,error,message}=useSelector(state=>state.users);
    const dispatch=useDispatch();
    const handleSubmit=async(e)=>{
        e.preventDefault()
        await dispatch(addToPlaylist(index));
        dispatch(getMyProfile());
    }
    const handleClick=async()=>{
        await dispatch(getCourses(index));
    }
    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(clearError());
        }
        else if(message){
            toast.success(message);
            dispatch(clearMessage());
        }
        
    },[dispatch,error,message])
    
    
  return (
    
    <VStack  position={"relative"} className="c1 s1"width="25%"direction={["flex-start","center"]}  >
        {
            loading?<Spinner/>:
            <Box boxShadow={"lg"} p="2" >
                
            <Image src={image} alt="poster page" height={"200"} objectFit={"contain"}/>
            <Text fontWeight={"bold"} fontSize={"medium"}  noOfLines={noOfLines} position={"relative"}>
                {title}
            </Text>
            <Text fontFamily={"body"} fontSize={"medium"}  noOfLines={noOfLines}>
                {description}
            </Text>
            <Text fontFamily={"body"} fontSize={"medium"}  noOfLines={noOfLines}>
                <p style={{fontWeight:"bold"}}>Creator : {creator}</p>
            </Text>
            <Text fontFamily={"body"} fontSize={"medium"}  noOfLines={noOfLines}>
                <p style={{fontWeight:"bold"}}>Lectures : {lectures}</p>
            </Text>
            <Text fontFamily={"body"} fontSize={"medium"}  noOfLines={noOfLines}>
                <p style={{fontWeight:"bold"}}>Views : {views}</p>
            </Text>
            <HStack pt="3">
                <Link to={`/course/${index}`}>
                    <Button colorScheme='yellow' onClick={handleClick}>
                        <Text>Watch Now</Text>
                    </Button>
                </Link>
                
                    <Button isLoading={loading} onClick={handleSubmit} variant="ghost">
                        Add To PlayList
                    </Button>
                
            </HStack>
            </Box>
        }
       
    </VStack>
   
  )
}

export default Course
