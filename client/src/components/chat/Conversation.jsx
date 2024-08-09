import { Box, styled, Typography } from "@mui/material";
import { useContext } from "react";
import { AccountContext } from "../context/AccountProvider";
import { setConversation } from "../../service/api.js"

const Image = styled('img')`
  border-radius: 50%;
  height: 50px; // Fixed height
  width: 50px;  // Fixed width
  // margin-left: 2%;
`;

const Component = styled(Box)`
//   margin-top: 2%;
  height: auto;
//   background: #ededed;
//   border-bottom: 1px solid rgba(0, 0, 0, 0.14);
  padding: 2% 0;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

const UserBox = styled(Box)`
  display: flex;
  align-items: center;
  margin-left: 2%;
`;

const Text = styled(Typography)`
  margin-left: 2%;
  white-space: nowrap;  // Prevent line breaks
`;

const Conversation = ({ user }) => {
  const { setPerson, account } = useContext(AccountContext); // Destructure the setPerson function correctly
  const getUser = async () => {
    setPerson(user);
    await setConversation({ senderId: account.sub, receiverId: user.sub })
  }
  return (
    <Component onClick={() => getUser()}>
      <UserBox>
        <Image src={user.picture} />
        <Text>{user.name}</Text>
      </UserBox>
    </Component>
  );
};

export default Conversation;
