import { Box, styled, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../context/AccountProvider";
import { setConversation, getConversation } from "../../service/api.js"
import { formatDate } from "../../utils/common-utils.js";

const Image = styled('img')`
  border-radius: 50%;
  height: 50px;
  width: 50px;
`;

const Component = styled(Box)`
  padding: 10px 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  &:hover {
    background-color: #f9f9f9;
  }
`;

const UserBox = styled(Box)`
  display: flex;
  align-items: center;
  width: 100%;
`;

const TextBox = styled(Box)`
  flex-grow: 1;
  margin-left: 12px;
`;

const Name = styled(Typography)`
  font-weight: bold;
  font-size: 16px;
`;

const MessageText = styled(Typography)`
  font-size: 14px;
  color: #606060;
`;

const Timestamp = styled(Typography)`
  font-size: 12px;
  color: #909090;
  text-align: right;
`;

const Conversation = ({ user }) => {
  const { setPerson, account, newmessageflag } = useContext(AccountContext);
  const [message, setMessage] = useState({});

  useEffect(() => {
    const getConversationDetails = async () => {
      const data = await getConversation({ senderId: account.sub, receiverId: user.sub });
      setMessage({
        text: data?.message || '',
        timestamp: data?.updatedAt || '',
      });
    };
    getConversationDetails();
  }, [newmessageflag]);

  const getUser = async () => {
    setPerson(user);
    await setConversation({ senderId: account.sub, receiverId: user.sub });
  };

  return (
    <Component onClick={() => getUser()}>
      <Image src={user.picture} />
      <UserBox>
        <TextBox>
          <Name>{user.name}</Name>
          <MessageText>
            {message?.text?.includes('localhost') ? message.text : message.text || 'No message available'}
          </MessageText>
        </TextBox>
        {message?.timestamp && (
          <Timestamp>{formatDate(message.timestamp)}</Timestamp>
        )}
      </UserBox>
    </Component>
  );
};

export default Conversation;
