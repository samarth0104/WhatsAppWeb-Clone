import { useContext, useState } from "react";
import { AccountContext } from "../../context/AccountProvider";
import { Box, styled } from '@mui/material';
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
    margin-left: 75%;
    font-size: 25%;
        cursor: pointer;
`;

const Options = styled(Box)`
    margin-left: auto;
    font-size: 18px;
        cursor: pointer;
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
