import React from 'react'
import { Stack, VStack,Heading, Text, Button, Image, Box, HStack } from '@chakra-ui/react'
import "../Home/home.css"
import { Link } from 'react-router-dom'
import {CgGoogle,CgYoutube} from "react-icons/cg"
import {SiCoursera,SiUdemy}from "react-icons/si"
import {DiAws} from "react-icons/di"
import introvideo from "../../assets/videos/780120024.mp4"
//import vg from "../../assets/images/bg.png"
const Home = () => {
  return (<section className='home' style={{width:"100%"}}>
            <div className="container">
                <Stack
                w={"90%"}
                    direction={["column","row"]}
                    height="100%"
                    justifyContent={["center","space-between"]}
                    alignContent="center"
                    spacing={["16","55"]}
                >
                    <VStack width={"full"} alignItems={["center","flex-end"]} spacing='6'>
                        <Heading children="Learnyard" size={"2xl"}/>
                        <Text fontSize={'xl'} fontFamily={"cursive"} textAlign={["center","left"]}children="Let's fill up gap between college and industry"/>
                        <Link to="/courses">
                            <Button size={"lg"} colorScheme='yellow'>
                                Explore
                            </Button>
                        </Link>
                    </VStack>

                    <Image className="vg"boxSize={"md"} src="https://cdni.iconscout.com/illustration/premium/thumb/education-online-or-young-people-learning-together-2706750-2268249.png" objectFit={"contain"} height={"400"}/>
                </Stack>

            </div>
            <Box padding={"8"} bg="blackAlpha.800" width={"100%"}>
                <Heading children="Our Brand" textAlign={"center"} fontFamily="body" color={"yellow.500"}/>
                <HStack className='brand' justifyContent={'space-evenly'} marginTop={"4"}>
                    <CgGoogle/>
                    <CgYoutube/>
                    <SiCoursera/>
                    <SiUdemy/>
                    <DiAws/>

                </HStack>
            </Box>
            <div className='c2'>
                <video  controls   controlsList='nodownload nofullscreen noremoteplayback'disablePictureInPicture disableRemotePlayback src={introvideo}>


                </video>

            </div>
  </section>
  )
}

export default Home
