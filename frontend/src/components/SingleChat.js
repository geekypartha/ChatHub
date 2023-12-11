import React, { useEffect, useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import { Box,Button,FormControl,IconButton,Input,Spinner,Text, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import UserDp from './UserAvatar/UserDp';
import { getSender, getSenderFull } from '../config/ChatLogics';
import ProfileModal from './miscellaneous/ProfileModal';
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';
import axios from 'axios';
import './styles.css';
import ScrollableChat from './ScrollableChat';
import io from 'socket.io-client';

import { IoSendSharp } from "react-icons/io5";

const ENDPOINT = "http://localhost:5000"; //"https://chat-hub-uct8.onrender.com";     
var socket, selectedChatCompare;

//import { sendMessage } from '../../../backend/controllers/messageControllers';

const SingleChat = ({fetchAgain, setFetchAgain}) => {

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    
    const [socketConnected, setSocketConnected] = useState(false);
    const {selectedChat, setSelectedChat, user, notification, setNotification}= ChatState();

    const toast = useToast();
    

    const fetchMessages = async ()=>{
        if(!selectedChat) return;
        try {
            const config ={
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };

            setLoading(true);

            const {data} = await axios.get(`/api/message/${selectedChat._id}`,config);

            //console.log(messages);
            setMessages(data);
            setLoading(false);

            socket.emit("join chat", selectedChat._id);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to load the Message",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };
    
    const sendMessage = async (event) =>{
        if((event.key === "Enter" || event.type === "click" ) && newMessage){
            socket.emit("stop typing", selectedChat._id);
            try {
                const config ={
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                setNewMessage("");
                const {data} = await axios.post('/api/message',{
                    content: newMessage,
                    chatId: selectedChat._id,
            
                },config);
                //console.log(data)
                socket.emit("new message", data);

                setMessages([...messages,data]);
            } catch (error) {
                toast({
                    title: "Error Occured!",
                    description: "Failed to send the Message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            }
        }
        
    };


    useEffect(()=>{
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connected", () => setSocketConnected(true));
        socket.on("typing", ()=>setIsTyping(true))
        socket.on("stop typing", ()=>setIsTyping(false))
    },[]);

    useEffect(()=>{
        fetchMessages();
        selectedChatCompare = selectedChat;
    },[selectedChat]);

    //console.log(notification, "-------");

    useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {

      
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

    
    
    
    

    const typingHandler = (e) =>{
        setNewMessage(e.target.value);

        // Typing Indicator Logic
        if(!socketConnected) return;
        if(!typing){
            setTyping(true);
            socket.emit("typing", selectedChat._id);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(()=>{
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if(timeDiff >= timerLength && typing){
                socket.emit("stop typing", selectedChat._id);
                setTyping(false);
            }
        }, timerLength);
    };
   
    return (
    <>
        {selectedChat ?(
            <>
                <Text
                    fontSize={{ base: "20px", md: "23px" }}
                    pb={3}
                    px={0}
                    w="100%"
                    fontFamily="Work sans"
                    display="flex"
                    justifyContent={{ base: "space-between" }}
                    alignItems="center"
                >
                <Box
                    display={'flex'}
                    gap={'0'}
                    justifyContent={{base:'flex-start'}}
                    alignItems={'center'}
                    fontFamily={'twitterchirp'}
                >

                
                <IconButton
                    display={{ base: "flex", md: "none" }}
                    justifyContent={'flex-start'}
                    colorScheme=''
                    icon={<ArrowBackIcon />}
                    onClick={() => setSelectedChat("")}
                />
            
                {!selectedChat.isGroupChat?(
                    <>
                        <UserDp user={getSenderFull(user, selectedChat.users)} />
                        {getSender(user, selectedChat.users)}
                
                        
                    </>
                )
                
                :(
                    <>
                        {selectedChat.chatName}
                        
                    </>
                )}
                </Box>
                <Box>
                {!selectedChat.isGroupChat?(
                    <>
                    <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                    />
                    </>
                ):(
                    <>
                        <UpdateGroupChatModal
                            fetchAgain={fetchAgain}
                            setFetchAgain={setFetchAgain}
                            fetchMessages={fetchMessages}
                        />
                    </>
                )}
                </Box>
                </Text>

                <Box
                    display="flex"
                    flexDir="column"
                    justifyContent="flex-end"
                    p={3}
                    bg="#E8E8E8"
                    w="100%"
                    h="100%"
                    borderRadius="lg"
                    overflowY="hidden"
                    
                >
                    
                    {loading ? (
                        <Spinner
                            size="xl"
                            w={20}
                            h={20}
                            alignSelf="center"
                            margin="auto"
                        />
                        ) : (
                          
                            <div className="messages">
                                <ScrollableChat messages={messages} />
                            </div>
                        )}
                        {isTyping?<Text fontFamily={'twitterchirp'} fontSize={'15px'}>typing...</Text>:(<></>)}
                        <FormControl display={'flex'} fontFamily={'twitterchirp'} onKeyDown={sendMessage} isRequired mt={3}>
                            
                            <Input
                            fontFamily={'twitterchirp'}
                                variant="filled"
                                bg="#E0E0E0"
                                placeholder="Enter a message.."
                                onChange={typingHandler}
                                value={newMessage}
                            />
                            <Button id='sendButton' colorScheme='transparent'onClick={sendMessage} ><IoSendSharp style={{ fontSize: '1.8em'}} /></Button>

                        </FormControl>
                </Box>
            </>
        ):(
            <Box display="flex" alignItems="center" justifyContent="center" h="100%">
                <Text fontSize="2xl" pb={3} fontFamily="Work sans">
                    Click on a user to start chatting
                </Text>
            </Box>
        )}
        
    </>
  )
}

export default SingleChat