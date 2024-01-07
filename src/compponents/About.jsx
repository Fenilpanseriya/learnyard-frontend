import {
  Container,
  HStack,Stack,
  VStack,
  Image,
  Text,Box,
  Grid,
  Heading,
} from '@chakra-ui/react';
import React from 'react';
import '../compponents/Home/home.css';
import Footer from './Layout/footer/Footer';
import courseLogo from "../assets/images/content.png"
import views from "../assets/images/video-views.png"
import review from "../assets/images/top-rated.png"

const About = () => {
  return (
    <Container m={'0'} height={'90vh'} w={'100%'} minW={'full'}  >
      <HStack
        width={'full'}
        flexWrap={'wrap'}
        bgColor={'purple.100'}
        borderRadius={'4'}
      >
        <Container minW={'50%'}>
          <Image
            className="vg"
            h={'500'}
            w={'100%'}
            src="https://myoperator.com/blog/wp-content/uploads/2021/12/11-Best-Online-Sales-Courses-To-Upgrade-Your-Selling-Skills-Free-Paid.png"
          />
        </Container>
        <Container style={{ margin: '8', justifyContent: 'flex-start' }}>
          <HStack
            textColor={'yellow.500'}
            fontWeight={'bold'}
            mt={'8'}
            ml={'8'}
          >
            <Heading children="The LearnYard" />
          </HStack>
          <VStack textColor={'black'} fontWeight={'bold'} m={'0'} ml={12}>
            <Heading marginLeft={'-5'} children="Online Course Platform." />
          </VStack>

          <HStack>
            <Heading fontSize="20" textColor="purple.600" ml="8">
              Courses which can help you to Upskill 🎯😀
            </Heading>
          </HStack>
        </Container>
      </HStack>
    

      <Box>

     
      <HStack m={"5"} overflowY={"scroll"} py="5" height={"35vh"} justifyContent={"space-evenly"} w={"full"} spacing={"8"} direction={["center","flex-start"]} css={{
                '&::-webkit-scrollbar':{display:"none"}
           }}>
        <VStack w={"30%"}  m="8" bgColor={"whitesmoke"} h={"full"} >

           <Image src={views} pt={"3"} height={"13vh"}/>
           <VStack overflowY={"scroll"} m={"4"} css={{
                '&::-webkit-scrollbar':{display:"none"}
           }}>
            
            <Text textColor={"purple.700"} alignContent={["center",'flex-start']} flexWrap={"wrap"} m={"5"} justifyContent={"center"}>
            <span style={{fontWeight:"bolder", color:"black", opacity:"0.75"}}>1M+ views</span> in the overall courses as well as lectures. we provide quality content for learning.10K+ userrs get their dream job after learning from our courses.
            Currently <span>50K+</span> students are enrolled in various courses.
            </Text>

            
          

           </VStack>
           
        </VStack>

        <VStack w={"30%"} bgColor={"whitesmoke"}  h="full" css={{
                '&::-webkit-scrollbar':{display:"none"}
           }} >
            <Image src={courseLogo} height={"13vh"} pt={"3"}/>
            <VStack overflowY={"scroll"} m={"4"} css={{
                '&::-webkit-scrollbar':{display:"none"}
           }}>
            <Text textColor={"purple.700"} alignContent={["center",'flex-start']} flexWrap={"wrap"} m={"5"}>
                The instructor and industry experts 
                who uploads courses in Learnyard are worked or currently working on <span style={{fontWeight:"bolder", color:"black", opacity:"0.75"}}>Top 1% start-ups & product based compnies like MAANG , Uber , Atllasian , Paytm</span> etc... 
            </Text>

            </VStack>
            
        </VStack>

        <VStack w={"30%"}  bgColor={"whitesmoke"} h="full" >
            <Image src={review} height={"13vh"} pt={"3"}/>
            <VStack overflowY={"scroll"} m={"4"} css={{
                '&::-webkit-scrollbar':{display:"none"}
           }}>
            <Text textColor={"purple.700"} alignContent={["center",'flex-start']} flexWrap={"wrap"} m="5">
                Our aim 🎯 is to <span  style={{fontWeight:"bold",color:"black", opacity:"0.75"}}>fill up gap between college and industry </span>by providing  you the best industry based content.
                <span style={{fontWeight:"bold", opacity:"0.88"}}>  90% ⬆️ </span>users gives ⭐⭐⭐⭐⭐to instructors and experts for teaching and providing Quality industry based learning.

            </Text>
            </VStack>
        </VStack>
      </HStack>
      
      </Box>
    </Container>

  );
};

export default About;
