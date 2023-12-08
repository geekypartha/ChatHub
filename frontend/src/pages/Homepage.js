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

  return <Container maxW = 'xl' centerContent>
    <Box
      d='flex'
      justifyContent={'center'}
      alignItems={'center'}
      bg={"rgba(0,0,0,0.3)"}
      p={'1vw'}
      w={'90%'}
      height={'50vh'}
      m={"40px 0 15px 0"}
      borderRadius={'lg'}
    
    >
      <Text fontSize={'2em'} fontFamily={"seoge-UI"} color='white' fontWeight={'600'} textAlign={'center'} >ChatHub</Text>
      <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
        <Heading size={{ base: 'xs', md: 'sm' }}><Text fontSize={'25px'} color={'white'} fontFamily={"twitterchirp"} fontWeight={"600"} margin={"25px 60px 55px "} textAlign={'left'}>Join today.</Text></Heading>
      </Stack>
  
        
      <VStack spacing={'20px'}>
        <ChakraLink as={ReactRouterLink} to='/Signup'  ><Button h={'70px'} w={'350px'} fontWeight={'300'} colorScheme='blue' color={'#fff'} fontFamily={'twitterchirp'} borderRadius={'100px'}>Create account</Button></ChakraLink>
        <Text fontSize={'20px'} color={'white'} fontFamily={"twitterchirp"} fontWeight={"200"} margin={"15px 10px 15px "}  textAlign={'left'}>Already have an account?</Text>
        <ChakraLink as={ReactRouterLink} to ='/Login'><Button h={'70px'} w={'350px'} fontWeight={'300'} colorScheme='rgba(0,0,0,0.2)' border={'1px solid white'} color={'white'} fontFamily={'twitterchirp'} borderRadius={'100px'}> Log in</Button></ChakraLink>
      </VStack>
    </Box>
    

  </Container>;
  
}

export default Homepage;