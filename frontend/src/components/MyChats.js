import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider';
import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import {Menu, MenuList,MenuButton, MenuItem} from '@chakra-ui/react';
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from './ChatLoading';
import { getSender, getSenderFull } from '../config/ChatLogics';
import GroupChatModal from './miscellaneous/GroupChatModal';
import UserDp from './UserAvatar/UserDp';
import NewChatModal from './miscellaneous/NewChatModal';

const MyChats = ({fetchAgain}) => {
   const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      
      
    >
      <Box
        pb={3}
        px={1}
        fontSize={{base:'18px', md:'22px'}}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
       
      >
        My Chats
        <Menu display={'flex'}>
          <MenuButton  as={Button} colorScheme=''  fontFamily={"twitterchirp"} rightIcon={<AddIcon/>}>
              
            </MenuButton>
          <MenuList fontSize={{base:'10px', md:'15px'}}colorScheme='#2d3748'>
            <NewChatModal fontFamily={"twitterchirp"}>
            <MenuItem fontFamily={"twitterchirp"}>
              New Chat
            </MenuItem>
            </NewChatModal>
            <GroupChatModal >
            <MenuItem fontFamily={"twitterchirp"}>
            New Group Chat
            </MenuItem>
            </GroupChatModal>
          </MenuList>
        </Menu>
        
      </Box>
      <Box
        display="flex"
        fontFamily={'twitterchirp'}
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY='scroll'>
            {chats.map((chat)=>(
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                fontFamily={'twitterchirp'}
                bg={selectedChat === chat ? "#61a5c2" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={{base:"4", md:'6'}}
                borderRadius="lg"
                key={chat._id} 
                display={'flex'}
              >
                <Text
                  fontFamily={"twitterchirp"}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  {!chat.isGroupChat
                    ?(
                    <>
                      <UserDp user={getSenderFull(user, chat.users)} />
                      {getSender(loggedUser, chat.users)}
                    </>
                    ):( 
                    <>
                      {/* <UserDp user={getSenderFull(user, chat.users)} /> */}
                      {chat.chatName}
                    </>
                  )}
                </Text>

                 
                 
              </Box>
            ))}

          </Stack>
        ):(
          <ChatLoading/>
        )}

      </Box>
    </Box>
    
  )
}

export default MyChats