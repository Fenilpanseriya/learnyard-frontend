import {Image, Text,Box, Grid, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Button, VStack,Input, ModalFooter } from '@chakra-ui/react'
import React from 'react'

const CourseModal = ({desc,isOpen,onClose,prev,id,deleteBtnHandler,titles,addLecture,lectures=[],setTitle,setDesc,setVideo,setPrev,title}) => {
    
    const handleImage=(e)=>{
        const file=e.target.files[0];
        const reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=()=>{
            console.log("reader result is "+reader.result)
            setVideo(file);
            setPrev(reader.result);
        }
    }
    const handleClose=()=>{
        setDesc("");setPrev("");setTitle("");setVideo("");
        onClose();
    }
  return (
    <Modal isOpen={isOpen} size={"full"} scrollBehavior='outside' onClose={handleClose}>
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>
                {titles}
            </ModalHeader>
            <ModalCloseButton onClick={handleClose}/>
            <ModalBody p={'16'} >
                <Grid templateColumns={['1fr','3fr 1fr']}>
                    <Box px={['0','16']}>
                        <Box my="5">
                            <Heading children={titles}/>
                            <Heading children={`#${id}`} size={"sm"} opacity={"0.5"}/>

                        </Box> 
                        <Heading children="Lectures" size={"lg"}/>
                        {
                            lectures.length>0 && lectures.map((lecture,index)=>(
                                <VideoCard num={index+1} title={lecture.title} discription={lecture.description} lectureId={lecture._id} deleteBtnHandler={deleteBtnHandler} CourseId={id}/>
                            ))
                        }
                        {/* <VideoCard num="1"
                                    title="React Intro"
                                    discription="ndbhaGWRYULRG7U3RQO3578Q3578Q35YUG3UG5TUW4GTHJGE4YUTGYUO4GYU4HJERFBHJEB"
                                    lectureId="ehbwgegr"
                                    CourseId={id}
                                    deleteBtnHandler={deleteBtnHandler}/> */}
                    </Box>
                    <Box>
                        <VStack>
                            <Heading children="Lectures"/>
                            <Input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" focusBorderColor='purple.400' type="text" />
                            <Input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" focusBorderColor='purple.400' type="text" />
                            <Input required id="chooseAvatar"  type="file" focusBorderColor='purple.400'
                            onChange={handleImage}/>
                            {
                                prev && <Image src={prev} boxSize="64" objectFit="contain" /> &&
                                <video width={"100%"} controls   controlsList='  muted  noremoteplayback nodownload' src={prev}>
                                </video>
                            }
                            <Button variant={
                                'ghost'
                            }  colorScheme='purple' width={"full"}>
                                    Upload
                            </Button>
                        </VStack>
                        

                    </Box>

                </Grid>

            </ModalBody>
            <ModalFooter>
                <Button mr={"3"}onClick={handleClose}>
                    Close
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
  )
}

export default CourseModal

const VideoCard=({num,title,discription,lectureId,CourseId,deleteBtnHandler})=>{
    return (
        <Stack direction={["column","row"]} my={"8"} borderRadius={"lg"} boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
        justifyContent={["flex-start","space-between"]} p={["4","8"]}>
            <Box>
                <Heading children={`#${num} ${title}`} size="sm"/>
                <Text>
                    {discription}
                </Text>
            </Box>
            <Button color={"purple.600"} onClick={()=>deleteBtnHandler(CourseId,lectureId)}>
                ✖️
            </Button>

        </Stack>
    )
}