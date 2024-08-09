import { useContext, useEffect, useState } from "react";
import { Box, styled, Divider } from "@mui/material";

// scripts
import Conversation from "./Conversation";
import { getUsers } from "../../service/api";
import { AccountContext } from "../context/AccountProvider";

const Component = styled(Box)`
  height: auto;
  overflow-y: auto;  // Use auto to ensure scrolling only when necessary
`;

const Conversations = ({ text = '' }) => {
    const { account, socket, setActiveUsers } = useContext(AccountContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let response = await getUsers();
            const filteredData = response.filter(user =>
                typeof text === 'string' && user.name.toLowerCase().includes(text.toLowerCase())
            );
            setUsers(filteredData);
        };
        fetchData();
    }, [text]);

    useEffect(() => {
        socket.current.emit('addUsers', account);
        socket.current.on('getUsers', users => {
            setActiveUsers(users);
        })
    }, [account]);

    return (
        <Component>
            {users.map((user) => (
                user.sub !== account.sub && (
                    <div key={user.sub}>
                        <Conversation user={user} />
                        <Divider />
                    </div>
                )
            ))}
        </Component>
    );
};

export default Conversations;
