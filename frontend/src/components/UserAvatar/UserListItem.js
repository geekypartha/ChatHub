import { Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'

const UserListItem = ({user, handleFunction}) => {
     
  return (
    <Box
        onClick={handleFunction}
        cursor={'pointer'}
        bg={'#e8e8e8'}
        _hover={{
            background: "#81c3d7",
            color: "white",
        }}
        width={'100%'}
        display={'flex'}
        alignItems={'center'}
        color={'black'}
        px={3}
        py={2}
        mb={2}
        borderRadius={'lg'}
    >
        <Avatar
            mr={2}
            size={'sm'}
            cursor={'pointer'}
            name={user.name}
            src={user.pic}
        />
        <Box
            
        >
            <Text fontFamily={'twitterchirp'}>{user.name}</Text>
            <Text fontFamily={'twitterchirp'} fontSize='xs'>
                Email : {user.email}
            </Text>
        </Box>
    </Box>
  )
}

export default UserListItem;