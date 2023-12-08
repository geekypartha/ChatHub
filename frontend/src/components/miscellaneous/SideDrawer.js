import { Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay,  Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, effect, useToast } from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from '@chakra-ui/avatar';
import React, { useState } from 'react';
import { ChatState } from '../../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useHistory } from "react-router-dom";
import { useDisclosure } from '@chakra-ui/hooks';
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';
import {Input} from '@chakra-ui/input';
import { getSender } from '../../config/ChatLogics';
import { Effect } from 'react-notification-badge';
import NotificationBadge from "react-notification-badge";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  
  const {user, setSelectedChat, chats, setChats, notification, setNotification}= ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const history = useHistory();

  const toast = useToast();
  
  const handleSearch =async()=>{
    if(!search){
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration:5000,
        isClosable: true,
        position: "top-left",
      
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers:{
          Authorization: `Bearer ${user.token}`,
        },
      };
      const {data} = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Failed to Load the Search Results",
        status: "error",
        duration:5000,
        isClosable: true,
        position: "bottom-left",
      
      });
    }

  };
  const logoutHandler = () =>{
    localStorage.removeItem('userInfo');
    history.push("/");
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([...chats, data]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        bg={'#61a5c2'}
        color={'black'}
        w={'100%'}
        p={'7px 10px 7px 10px'}
        position={'relative'}
      >
        <Tooltip label='Search input textbox'
         colorScheme={'black.300'}
         hasArrow
         placement='bottom-end'
         fontFamily={"twitterchirp"}
         >
          <Button variant={'outline'}  borderRadius={'100px'} onClick={onOpen}>
            <i class="fas fa-search" style={{color: "#323739",}}></i>
            <Text display={{ base: "none", md: "flex"}} px='4' fontFamily={"twitterchirp"} color={'#323739'} fontWeight={'300'}>Search or start a new chat</Text>

          </Button>

        </Tooltip>
        <Text fontSize={'2xl'}  color={'white'} fontFamily={'seoge-UI'}  fontsize={'1.5rem'} position={'absolute'} left={'50%'} top={'50%'} transform={'translate(-50%, -50%)'}>
          ChatHub
        </Text>
        <div>
          <Menu>
            <MenuButton p={1} fontFamily={'twitterchirp'}>
              <NotificationBadge
                
                count = {notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize='2xl' m={1}/>
            </MenuButton>
            <MenuList fontFamily={'twitterchirp'} textAlign={'center'}>
              {!notification.length && "No new Messages"}
              {notification.map(notif=>(
                <MenuItem key={notif._id} onClick={()=>{
                  setSelectedChat(notif.chat);
                  setNotification(notification.filter((n) => n!== notif));
                }}>
                  {notif.chat.isGroupChat?`New Message in ${notif.chat.chatName}`
                  :`New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} colorScheme=''  fontFamily={"twitterchirp"} rightIcon={<ChevronDownIcon/>}>
              <Avatar size='sm' fontFamily={"twitterchirp"} color={'white'} cursor='pointer' name={user.name} src={user.pic} />
            </MenuButton>
            <MenuList fontFamily={'twitterchirp'} colorScheme='#2d3748'>
              <ProfileModal user={user}>
                <MenuItem fontFamily={'twitterchirp'}>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider/>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>

      </Box>
      <Drawer  placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay/>
        <DrawerContent fontFamily={'twitterchirp'}>
          <DrawerHeader fontFamily={'twitterchirp'} >Search Users</DrawerHeader>
          <DrawerBody>
          <Box
            display={'flex'} pb={2} >
            <Input
              placeholder='Search by name or email'
              fontFamily={'twitterchirp'}
              mr={2}
              value={search}
              onChange={(e) =>setSearch(e.target.value)}
            />
            <Button fontFamily={'twitterchirp'}
             onClick={handleSearch}
            >
              Go
            </Button>

          </Box>

          {loading ? (
            <ChatLoading/>
          ) : (
            searchResult?.map((user) =>(
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={()=>accessChat(user._id)}
              />
            ))
          )}
          {loadingChat && <Spinner ml='auto' display='flex'/>}
        </DrawerBody>
        </DrawerContent>
        
      </Drawer>
    </>
  );
}

export default SideDrawer;