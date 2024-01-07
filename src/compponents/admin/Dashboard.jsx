import { Box, Grid, HStack, Heading,Stack, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { useLocation } from 'react-router-dom'
import Dashbox from './Dashbox'
import Bar from './Bar'
import { DoughnutChart, LineChart } from './Chart'
import { useSelector } from 'react-redux'
import Loader from '../Loader'
import { useDispatch } from 'react-redux'
import { getAdminDashboardStats } from '../../redux/actions/admin'
const Dashboard = () => {
    const location=useLocation();
    const { loading } = useSelector(
        state => state.users
      );
      const {
        stats,
        usercnt,
        subscriptioncnt,
        viewscnt,
        subscriptionPer,
        userPer,
        viewPer,
        userProfit,
        viewsProfit,
        subscriptionProfit}=useSelector(state=>state.admin);
      const dispatch=useDispatch();
      const color="purple.500"
      useEffect(()=>{
        dispatch(getAdminDashboardStats());
      },[dispatch])
  return (
   <>
   {
     loading ? (<>
        <Loader color={color}/>
     </>):(<>
        <Grid templateColumns={['1fr','4fr 1fr']} minH={"100vh"} w={"full"} m="0">
        <Stack>
            <Heading py="12" pl="12" children="Dashboard" fontSize={"larger"} fontWeight={"bold"}/>
            <HStack justifyContent={"space-evenly"}>
            <Dashbox title="Views" qty={viewscnt} qtyPer={viewPer} status={viewsProfit?"active":"inactive"}/>
            <Dashbox title="Users" qty={usercnt} qtyPer={userPer} status={userProfit?"active":"inactive"}/>
            <Dashbox title="Subscriptions" qty={subscriptioncnt} qtyPer={subscriptionPer} status={subscriptionProfit?"active":"inactive"}/>

            </HStack>
            <Box boxShadow={'2px 0 10px rgba(107,70,193,0.5)'} w={"90%"} alignSelf={"center"}>
                <Heading   children="Data Analysis" p={"3"} textColor={"purple.100"}/>
                <LineChart viewArray={stats && stats.map((stat)=>(stat.views))}/>
            </Box>
            <Heading py={['4','16']} children="Progress Bar" fontSize={"medium"} pl="5%"/>
            <Grid templateColumns={['1fr','2fr 1fr']}>
                <Box w="full">
                    <Bar title="Views" status={viewsProfit?"active":"inactive"} qtyPer={viewPer}/>
                    <Bar title="Users" status={userProfit?"active":"inactive"} qtyPer={userPer} />
                    <Bar title="Subscription" status={subscriptionProfit?"active":"inactive"} qtyPer={subscriptionPer}/>

                </Box>
                <Box p={['4','8']}>
                    <DoughnutChart/>
                </Box>

            </Grid>
            
        </Stack>
        
        <Sidebar/>
    </Grid>
     </>)
   }
   </>
    
  )
}

export default Dashboard
