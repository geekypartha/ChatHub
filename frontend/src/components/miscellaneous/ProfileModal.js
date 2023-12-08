import { Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import {  Button } from '@chakra-ui/button';

import React from 'react';
 
 const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
   return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
          <Button onClick={onOpen} colorScheme='' display={'flex'} justifyContent={'flex-end'}>
            <i class=" fas fa-ellipsis-v" style={{color: "#323739",}}></i>
          </Button>
      )}
      <Modal size={{base:'sm', md:'lg'}} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={{base:'30px', md:'40px'}}
            fontFamily={'Work sans'}
            display={'flex'}
            justifyContent={'center'}
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={'flex'}
            flexDir={'column'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Image
              borderRadius={'full'}
              boxSize={'150px'}
              src={user.pic}
              alt={user.name}
            />
            <Text
              fontSize={{base: '15px', md:'20px'}}
              fontFamily={'Work sans'}
            >
              Email: {user.email}
            </Text>
            
          </ModalBody>

          <ModalFooter>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
   );
     
   
 }
 
 export default ProfileModal;