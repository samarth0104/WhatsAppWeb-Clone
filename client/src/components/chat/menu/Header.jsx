import { useContext, useState } from "react";
import { AccountContext } from "../../context/AccountProvider";
import { Box, styled, Typography } from '@mui/material';
import { Chat as MessageIcon } from '@mui/icons-material';

import HeaderMenu from "./HeaderMenu";
import InfoDrawer from "../../drawer/InfoDrawer";

const Component = styled(Box)`
    height: 5%;
    background: #ededed;
    display: flex;
    align-items: center;
    padding: 2% 4%;
`;

const Image = styled('img')`
    height: 10%;
    width: 10%;
    border-radius: 50%;
    cursor: pointer;
`;

const Options1 = styled(Box)`
    margin-left: 60%;
    font-size: 25%;
    cursor: pointer;
`;


const Options = styled(Box)`
    margin-left: auto;
    font-size: 18px;
        cursor: pointer;
`;

const StyledTypography = styled(Typography)`
    font-family: 'Roboto', sans-serif;
    font-size: 26px;
    font-weight: 600;
    color: #4A4A4A;
    margin-left: 3%;
`;


const Header = () => {
    const { account } = useContext(AccountContext);
    const [openDrawer, setOpenDrawer] = useState(false);

    const toggleDrawer = () => {
        setOpenDrawer(true);
    };

    return (
        <>
            <Component>
                <Image src={account.picture} alt="dp" onClick={toggleDrawer} />
                <StyledTypography> Chats</StyledTypography>
                <Options1>
                    <MessageIcon />
                </Options1>
                <Options>
                    <HeaderMenu setOpenDrawer={setOpenDrawer} />
                </Options>
            </Component>
            <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} />
        </>
    );
};

export default Header;
