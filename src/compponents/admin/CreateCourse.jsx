import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { Grid,Input,Image, Container, Heading, VStack, Select, WrapItem, Button} from '@chakra-ui/react'
import { courseCreate } from '../../redux/actions/admin';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const CreateCourse = () => {
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [category,setCategory]=useState("");
    const [createdBy,setCreatedBy]=useState("");
    const [image,setImage]=useState("");
    const [prev,setPrev]=useState("");
    const handleImage=(e)=>{
        const file=e.target.files[0];
        const reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=()=>{
            console.log("reader result is "+reader.result)
            setImage(file);
            setPrev(reader.result);
        }
    }
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const myForm=new FormData();
        myForm.append("title",title);
        myForm.append("description",description);
        myForm.append("category",category);
        myForm.append("createdBy",createdBy)
        myForm.append("file",image);
        const isCreate=await dispatch(courseCreate(myForm))
        if(isCreate){
            navigate("/admin/dashboard")
        }
    }
    const categories=["Web Development","Android Devlopment","Machine Learning","Artificial Intelligence","Devops"];
  return (
    <Grid templateColumns={['1fr','5fr 1fr']} minH={"100vh"} >
        <Container py={"16"}>
            
            <form onSubmit={handleSubmit}>
                <Heading textTransform={"uppercase"} children="create course" my='16'textAlign={['center','left']} />
                <VStack my="auto" spacing={'8'}>
                    <Input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" focusBorderColor='purple.400' type="text" />
                    <Input value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" focusBorderColor='purple.400' type="text" />
                    <Input value={createdBy} onChange={e=>setCreatedBy(e.target.value)} placeholder="Creator Name" focusBorderColor='purple.400' type="text" />
                    <Select focusBorderColor='purple.400' value={category} onChange={e=>setCategory(e.target.value)}>
                        <option value="">
                            Category
                        </option>
                        {
                            categories.map((item,index)=>{
                                return <option value={item} key={item}>
                                {item}
                            </option>
                            })
                        }

                    </Select>
                    <Input required id="chooseAvatar"  type="file" focusBorderColor='purple.400'
                         onChange={handleImage}
                    />
                    {
                        prev && <Image src={prev} boxSize="64" objectFit="contain" />
                    }
                    <Button  w="full" colorScheme='purple' type="submit">
                        Submit
                    </Button>
                </VStack>
            </form>
        </Container>
        <Sidebar/>
    </Grid>
  )
}

export default CreateCourse
