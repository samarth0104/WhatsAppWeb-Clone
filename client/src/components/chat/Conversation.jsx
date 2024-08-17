import { Box, styled, Typography } from "@mui/material";
import { useContext, useEffect, useState, useRef } from "react";
import { AccountContext } from "../context/AccountProvider";
import { setConversation, getConversation, getMessages, getMessageStats } from "../../service/api.js";
import { formatDate } from "../../utils/common-utils.js";
import BarChartIcon from '@mui/icons-material/BarChart';
import Stats from './Stats';

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

const TimestampContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: auto;
`;

const Timestamp = styled(Typography)`
  font-size: 12px;
  color: #909090;
  text-align: center;
`;

const IconWrapper = styled(BarChartIcon)`
  font-size: 24px;
  color: #909090;
  margin-bottom: 2px;
`;

const Conversation = ({ user }) => {
  const { setPerson, account, newmessageflag } = useContext(AccountContext);
  const [message, setMessage] = useState({});
  const [showStats, setShowStats] = useState(false);
  const [messages, setMessages] = useState([]);
  const statsRef = useRef(null);

  useEffect(() => {
    const getConversationDetails = async () => {
      const data = await getConversation({ senderId: account.sub, receiverId: user.sub });
      setMessage({
        text: data?.message || '',
        timestamp: data?.updatedAt || '',
      });

      if (data?.conversationId) {
        const messagesData = await getMessages(data.conversationId);
        setMessages(messagesData);
      }
    };
    getConversationDetails();
  }, [newmessageflag]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (statsRef.current && !statsRef.current.contains(event.target)) {
        setShowStats(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [statsRef]);

  const getUser = async () => {
    setPerson(user);
    await setConversation({ senderId: account.sub, receiverId: user.sub });
  };


  const handleIconClick = async () => {
    try {
      // Toggle the stats modal visibility
      setShowStats(!showStats);

      // Only fetch stats if we're opening the modal
      if (!showStats) {
        const stats = await getMessageStats(account.sub, user.sub);
        setMessages(stats.messages); // Pass fetched messages to the Stats component
      }
    } catch (error) {
      console.error("Failed to fetch message stats", error);
    }
  };

  return (
    <>
      <Component onClick={() => getUser()}>
        <Image src={user.picture} />
        <UserBox>
          <TextBox>
            <Name>{user.name}</Name>
            <MessageText>
              {message?.text?.includes('localhost') ? message.text : message.text || 'No message available'}
            </MessageText>
          </TextBox>
          <TimestampContainer>
            <IconWrapper onClick={handleIconClick} />
            {message?.timestamp && (
              <Timestamp>{formatDate(message.timestamp)}</Timestamp>
            )}
          </TimestampContainer>
        </UserBox>
      </Component>
      {showStats && (
        <div ref={statsRef}>
          <Stats messages={messages} onClose={() => setShowStats(false)} />
        </div>
      )}
    </>
  );
};

export default Conversation;
