import { Box, styled, Typography } from "@mui/material";
import { Search, MoreVert } from "@mui/icons-material";
import { AccountContext } from "../context/AccountProvider";
import { useContext, useEffect } from "react";

const Component = styled(Box)`
    height: 4vh;
    background: #ededed;
    display: flex;
    align-items: center;
    padding: 2% 4%;
`;

const Image = styled('img')`
    border-radius: 50%;
    height: 40px;
    width: 40px;
    margin-right: 10px;
`;

const Namez = styled(Typography)`
    font-size: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Status = styled(Typography)`
    font-size: 10px;
    color: rgb(0,0,0,0.6);
`;

const TextContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    margin-right: auto;
`;

const RComponent = styled(Box)`
    margin-left: auto;
    cursor: pointer;
    display: flex;
    align-items: center;
    
    & > svg {
        font-size: 30px;
        padding: 2px;
    }
`;

const ChatHeader = ({ person }) => {
    const { activeUsers } = useContext(AccountContext);
    return (
        <Component>
            <Image src={person.picture} />
            <TextContainer>
                <Namez>{person.name}</Namez>
                <Status>{activeUsers?.find(user => user.sub === person.sub) ? 'Online' : 'Offline'}</Status>
            </TextContainer>
            <RComponent>
                <Search />
                <MoreVert />
            </RComponent>
        </Component>
    )
}

export default ChatHeader;
