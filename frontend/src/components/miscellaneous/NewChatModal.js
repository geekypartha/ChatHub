import { FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import UserListItem from '../UserAvatar/UserListItem';

const NewChatModal = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [search, setSearch] = useState("");
    const {selectedChat, setSelectedChat, user, chats, setChats} = ChatState();
    const toast = useToast();

    const handleSearch= async (query)=>{
        setSearch(query);
        if (!query) {
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(`/api/user?search=${search}`, config);
            //console.log(data);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
        toast({
            title: "Error Occured!",
            description: "Failed to Load the Search Results",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
        });
        setLoading(false);
        }
    };

    const accessChat = async (userId)=>{
    try {
      setLoadingChat(true)
      const config = {
        headers:{
          'Content-type': "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const {data} = await axios.post("/api/chat",{userId}, config);

      //if the chat is previously present then append the chats
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();

    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration:5000,
        isClosable: true,
        position: "bottom-left",
      
      });
    }
  };

    
  return (
    <>
    <span onClick={onOpen}>{children}</span>

      <Modal size={{base:'sm', md:'md'}} isOpen={isOpen} onClose={onClose} >
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader fontSize={{base:'25px', md:'30px'}}
                 fontFamily={'work sans'} display={'flex'} justifyContent={'center'}> Search User</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={4}>
            <FormControl>
                <Input
                    fontFamily={'twitterchirp'}
                    placeholder="Search user eg: Partha"
                    marginY={3}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </FormControl>
            
           
            {searchResult?.map(user =>(
            <UserListItem
                key={user._id}
                user={user}
                handleFunction={()=>accessChat(user._id)}
            />
            ))}
            
            {loadingChat && <Spinner ml='auto' display='flex'/>}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NewChatModal