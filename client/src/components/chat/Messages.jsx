import { Box, styled } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { AccountContext } from "../context/AccountProvider"
import Footer from "./Footer";
import { getMessages, newMessage } from "../../service/api";
import Message from "./Message";
const ImageContainer = styled(Box)`
  background-image: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png');
  background-size: 50%;
  `;

const Component = styled(Box)`
  height: 76vh;
  overflow-y: scroll;
`;

const Messages = ({ person, conversation }) => {
  const { account } = useContext(AccountContext);
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [newmessageflag, setNewMessageFlag] = useState(false);
  const [file, setFile] = useState();

  useEffect(() => {
    const getMessageDetails = async () => {
      let data = await getMessages(conversation._id);
      setMessages(data);
    }
    conversation._id && getMessageDetails();
  }, [person._id, conversation._id, newmessageflag])
  const sendText = async (e) => {
    const code = e.keyCode || e.which;
    if (code === 13) {
      let message = {
        senderId: account.sub,
        receiverId: person.sub,
        conversationId: conversation._id,
        type: 'text',
        text: value
      }
      await newMessage(message);
      setValue('');
      setNewMessageFlag(prev => !prev);
    }

  }
  return (
    <>
      <ImageContainer>
        <Component style={{ padding: "0 20px 0 20px" }}>
          {
            messages && messages.map(message => (<Message message={message} />))
          }
        </Component>
      </ImageContainer>
      <Footer
        sendText={sendText}
        setText={setValue}
        value={value}
        file={file}
        setFile={setFile} /></>
  )
}

export default Messages;
