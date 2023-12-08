import { Avatar } from '@chakra-ui/react'
import React from 'react'

const UserDp = ({user}) => {
  return (
    <Avatar
        mr={2}
        size={{base:'sm', md:'md'}}
        cursor={'pointer'}
        //name={user.name}
        src={user.pic}
    />
  )
}

export default UserDp;