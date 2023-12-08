import { Box, Button, Container, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react';

import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'

import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const handleClick = () => setShow(!show);

  const submitHandler = async () =>{
    setLoading(true);
        if(!email ||!password){
            toast({
                title:'Please Fill all the fields',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
        
        try{
            const config ={
                headers:{
                    'content-type': 'application/json',
                },
            };
            const {data} = await axios.post(
                '/api/user/login',{email,password},
                config
            );
            toast({
                title:'Login successful',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false);
            history.push('/chats')
        }catch(error){
            toast({
                title:'Error Occured!',
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    }; 

  return <Container maxW = 'xl' centerContent>
    <Box
    d='flex'
    justifyContent={'center'}
    alignItems={'center'}
    bg={"rgba(0,0,0,0.7)"}
    p={'1vw'}
    w={'90%'}
    height={'fitcontent'}
    m={"40px 0 15px 0"}
    borderRadius={'10px'}
    
    >
        <Text fontSize={'2em'} fontFamily={"seoge-UI"} color='white' fontWeight={'300'} textAlign={'left'} margin={'20px 20px 25px'} >Log in to ChatHub</Text>
        <VStack spacing='5px'>
            
            <FormControl id={'email'} fontFamily={"twitterchirp"} w={'90%'} color={'white'} margin={'10px 0 10px 0'} isRequired>
                <FormLabel fontFamily={"twitterchirp"} color={'white'}>Email</FormLabel>
                <Input
                color={'white'}
                    placeholder='Enter Your email'
                    value={email}
                    _placeholder={{color:'grey', fontFamily:"twitterchirp" }}
                    onChange={(e)=>setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id={'password'} fontFamily={"twitterchirp"} w={'90%'} color={'white'} margin={'10px 0 10px 0'} isRequired>
                <FormLabel fontFamily={"twitterchirp"} color={'white'}>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show? 'text':'password'}
                        fontFamily={"twitterchirp"}
                        placeholder='Password'
                        color={'white'}
                        value={password}
                        _placeholder={{color:'grey', fontFamily:"twitterchirp" }}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <InputRightElement width={'4.5rem'}>
                        <Button fontFamily={"twitterchirp"} h={'1.75rem'} size={'sm'} onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                
            </FormControl>
          

            <Button
                colorScheme="blue"
                fontFamily={"twitterchirp"} w={'90%'}  fontWeight={'100'} color={'white'} margin={'30px 0 20px 0'} borderRadius={'100px'} height={'50px'}
                onClick={submitHandler}
                isLoading={loading}
            >
              Log in
            </Button>
            <Button 
                colorScheme="red"
                fontFamily={"twitterchirp"} w={'90%'}  fontWeight={'100'} color={'white'} margin={'0px 0 20px 0'} borderRadius={'100px'} height={'50px'} width={'fit-content'}
                onClick={()=>{
                    setEmail('guest@example.com');
                    setPassword('123456');
                }}
                
            >
                Get Guest User Credentials
            </Button>
            <Text color={'white'} fontFamily={'twitterchirp'}>Dont have an account?  <ChakraLink as={ReactRouterLink} to ='/Signup' color={'#3182ca'} fontFamily={"twitterchirp"}> Sign up</ChakraLink></Text>
        </VStack>
    </Box>
  </Container>
    
  
}

export default Login