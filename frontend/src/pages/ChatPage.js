import { Box } from "@chakra-ui/layout";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import { useState } from "react";
//import { useState } from 'react';


const ChatPage = () => {
    //const [fetchAgain, setFetchAgain] = useState(false);
    const {user}= ChatState();
    const [fetchAgain, setFetchAgain] = useState(false);
    return (
        <div style={{width: "100%"}}>
            <Box
                h={'100vh'}
                w={'100%'}
                backgroundColor={'#182229'}
                fontFamily={'twitterchirp'}
                
            >
                {user && <SideDrawer/>}

                <Box
                    display={'flex'} 
                    justifyContent={"space-between"}
                    w={'100%'}
                    h={'94vh'}
                    p={'0px'}

                >
                {user && (
                <MyChats fetchAgain={fetchAgain} />
                )}
                {user && (
                    <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                )}
            </Box>
            </Box>
            

        </div>
    ) 
};

export default ChatPage;