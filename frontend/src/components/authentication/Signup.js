import { Box, Button, Container, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react';

import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';



const Signup = () => {
    const [show, setShow] = useState(false)
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();

    const handleClick = () => setShow(!show);

    const postDetails = (pics) => {
        setLoading(true);
        if(pics === undefined){
            toast({
                title: 'Please Select an Image!',
                status:'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            })
            return;
        }
        if(pics.type==='image/jpeg' || pics.type === 'image/png'){
            const data = new FormData();
            data.append('file',pics);
            data.append('upload_preset', "ChatHub");
            data.append('cloud_name', 'geekypartha');
            fetch('https://api.cloudinary.com/v1_1/geekypartha/image/upload',{
                method:'post',
                body: data,
            }).then((res) => res.json())
            .then(data=>{
                setPic(data.url.toString());
                console.log(data.url.toString());
                setLoading(false);
            })
            .catch((err)=>{
                console.log(err);
                setLoading(false);
            });
        }else{
            toast({
                title: 'Please Select an Image!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
            })
            setLoading(false);
            return;
        }
    };

    const submitHandler = async () =>{
        setLoading(true);
        if(!name || !email ||!password || !confirmpassword){
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
        if(password!==confirmpassword){
            toast({
                title:'Password Do not Match',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false)
            return;
        }
        try{
            const config ={
                headers:{
                    'content-type': 'application/json',
                },
            };
            const {data} = await axios.post(
                '/api/user',{name,email,password,pic},
                config
            );
            toast({
                title:'Registration successful',
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
        w={'100%'}
        height={'fitcontent'}
        m={"40px 0 15px 0"}
        borderRadius={'10px'}
        
        >
            <Text fontSize={'2em'} fontFamily={"seoge-UI"} color='white' fontWeight={'300'} textAlign={'left'} margin={'20px 20px 20px'} >Create your account</Text>
            <VStack spacing='5px'>
                <FormControl id='first-name' fontFamily={"twitterchirp"} w={'90%'} color={'white'} margin={'10px 0 10px 0'} isRequired>
                    <FormLabel fontFamily={"twitterchirp"} color={'white'}>Name</FormLabel>
                    <Input
                        color={'white'}
                        placeholder='Enter Your Name'
                        _placeholder={{color:'grey', fontFamily:"twitterchirp" }}
                        onChange={(e)=>setName(e.target.value)}
                    />
                </FormControl>
                <FormControl id={'email'} fontFamily={"twitterchirp"} w={'90%'} color={'white'} margin={'10px 0 10px 0'} isRequired>
                    <FormLabel fontFamily={"twitterchirp"} color={'white'}>Email</FormLabel>
                    <Input
                    color={'white'}
                        placeholder='Enter Your email'
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
                            color={'white'}
                            placeholder='Password'
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
                <FormControl id={'confirmpassword'} fontFamily={"twitterchirp"} w={'90%'} color={'white'} margin={'10px 0 10px 0'} isRequired>
                    <FormLabel fontFamily={"twitterchirp"} color={'white'}>Confirm Password</FormLabel>
                    <InputGroup>
                        <Input
                            type={show? 'text':'password'}
                            fontFamily={"twitterchirp"}
                            color={'white'}
                            placeholder='Password'
                            _placeholder={{color:'grey', fontFamily:"twitterchirp" }}
                            onChange={(e)=>setConfirmpassword(e.target.value)}
                        />
                        <InputRightElement width={'4.5rem'}>
                            <Button fontFamily={"twitterchirp"} h={'1.75rem'} size={'sm'} onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    
                </FormControl>
                <FormControl id={'pic'} fontFamily={"twitterchirp"} w={'90%'} color={'white'} margin={'10px 0 10px 0'} isRequired>
                    <FormLabel fontFamily={"twitterchirp"} color={'white'}>Upload Your Picture</FormLabel>
                    
                    <Input
                        type={'file'}
                        fontFamily={"twitterchirp"}
                        p={'1'}
                        accept='image/*'
                        onChange={(e)=>postDetails(e.target.files[0])}
                    />
                </FormControl>

                <Button
                    colorScheme="blue"
                    fontFamily={"twitterchirp"} w={'90%'}  fontWeight={'100'} color={'white'} margin={'30px 0 20px 0'} borderRadius={'100px'} height={'50px'}
                    onClick={submitHandler}
                    isLoading={loading}
                >
                    Sign Up
                </Button>
                <Text color={'white'} fontFamily={'twitterchirp'}>Have an account?  <ChakraLink as={ReactRouterLink} to ='/Login' color={'#3182ca'} fontFamily={"twitterchirp"}> Log in</ChakraLink></Text>
            </VStack>
        </Box>
    </Container>
    
  
}

export default Signup