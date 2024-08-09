import { Box, styled } from "@mui/material";
import { AccountContext } from "../context/AccountProvider"
//scripts
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import { useContext, useEffect, useState } from "react";
import { getConversation } from "../../service/api";


const Component = styled(Box)`
    height: 100%;
    width: 100%;
`;
const ChatBox = () => {
    const { person, account } = useContext(AccountContext);
    const [conversation, setConversation] = useState({});
    useEffect(() => {
        const getConversationDetails = async () => {
            let data = await getConversation({ senderId: account.sub, receiverId: person.sub });
            setConversation(data);
        }
        getConversationDetails();
    }, [person.sub])
    return (
        <Component>
            <ChatHeader person={person} />
            <Messages person={person} conversation={conversation} />
        </Component>
    )
}
export default ChatBox;