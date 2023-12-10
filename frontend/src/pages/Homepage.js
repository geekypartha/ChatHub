import React, { useEffect } from 'react';
import {Container, Box, Text, Heading, Stack, VStack, Button} from '@chakra-ui/react';

import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const Homepage = () => {

  //if the user logged in push him back to the chat page

  const history = useHistory();

    useEffect(()=>{
        const user =  JSON.parse(localStorage.getItem('userInfo'));
        

        if(user){
            history.push('/chats');
        }
    }, [history]);

  return <Container maxW = {{base:'md', md:'xl'}} centerContent>
    <Box
      display='flex'
      flexDirection={'column'}
      justifyContent={'flex-start'}
      
      bg={"rgba(0,0,0,0.3)"}
      p={'1vw'}
      w={'90%'}
      height={{base:'90vw', md:'50vh'}}
      m={"40px 0 15px 0"}
      borderRadius={'lg'}
    
    >
      <Text fontSize={{base:'1.5em', md:'2em'}} fontFamily={"seoge-UI"} color='white' fontWeight={'600'} textAlign={'center'} margin={{base:'10px', md:'20px'}}>ChatHub</Text>
      <Stack spacing={{ base: '1', md: '3' }} textAlign="center">
        <Heading size={{ base: 'xs', md: 'sm' }}><Text fontSize={{base:'18px', md:'25px'}} color={'white'} fontFamily={"twitterchirp"} fontWeight={"600"} margin={{base:'20px 20px 40px',md:"7px 60px 30px  "}} textAlign={'left'}>Join today.</Text></Heading>
      </Stack>
  
        
      <VStack spacing={{base:'1vw', md:'2vw'}}>
        <ChakraLink as={ReactRouterLink} to='/Signup'  ><Button h={{base:'15vw', md:'4vw'}} w={{base:'60vw', md:'19vw'}} fontWeight={'300'} colorScheme='blue' color={'#fff'} fontFamily={'twitterchirp'} borderRadius={'100px'}>Create account</Button></ChakraLink>
        <Text fontSize={{base:'3.5vw', md:'1.1vw'}} color={'white'} fontFamily={"twitterchirp"} fontWeight={"200"} margin={{base:'15px',md:"15px 10px 0"}}  textAlign={'left'}>Already have an account?</Text>
        <ChakraLink as={ReactRouterLink} to ='/Login'><Button h={{base:'15vw', md:'4vw'}} w={{base:'60vw', md:'19vw'}} fontWeight={'300'} colorScheme='rgba(0,0,0,0.2)' border={'1px solid white'} color={'white'} fontFamily={'twitterchirp'} borderRadius={'100px'}> Log in</Button></ChakraLink>
      </VStack>
    </Box>
    

  </Container>;
  
}

export default Homepage;