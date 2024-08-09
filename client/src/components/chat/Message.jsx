import { Box, styled, Typography } from "@mui/material";
import { formatDate } from "../../utils/common-utils"
import { useContext } from "react";
import { AccountContext } from "../context/AccountProvider";


const Sent = styled(Box)`
background: #dcf8c6;
max-width: 60%;
margin-left: auto;
padding:5px;
width: fit-content;
display:flex;
border-radius: 10px;
margin-top:4px;
word-break: break-word;
`
const Rec = styled(Box)`
background: #FFFFFF;
max-width: 60%;
padding:5px;
width: fit-content;
display:flex;
border-radius: 10px;
margin-top:4px;
word-break: break-word;
`

const Text = styled(Typography)`
font-size: 14px;
padding: 0 25px 0 5px;
`
const Timestamp = styled(Typography)`
font-size:10px;
margin-left:2px;
margin-top: auto;
word-break: keep-all;

`
const Message = ({ message }) => {
    const { account } = useContext(AccountContext);
    return (
        <>
            {
                account.sub === message.senderId ? <Sent>
                    <Text>{message.text}</Text>
                    <Timestamp>{formatDate(message.createdAt)}</Timestamp>
                </Sent> : <Rec>
                    <Text>{message.text}</Text>
                    <Timestamp>{formatDate(message.createdAt)}</Timestamp>
                </Rec>
            }
        </>

    )
}
export default Message;