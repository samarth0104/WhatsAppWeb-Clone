import { useContext, useState } from "react";
import { AccountContext } from "../../context/AccountProvider";
import { Box, styled, Typography } from '@mui/material';
import { Chat as MessageIcon } from '@mui/icons-material';
import AIChat from '../AIChat';
import HeaderMenu from "./HeaderMenu";
import InfoDrawer from "../../drawer/InfoDrawer";

// OpenAI SVG Icon as a React component
const OpenAIIcon = styled('svg')`
    width: 24px;
    height: 24px;
    cursor: pointer;
    margin-right: 6px;
`;

const Component = styled(Box)`
    height: 60px;
    background: #ededed;
    display: flex;
    align-items: center;
    padding: 0 16px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const Image = styled('img')`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    cursor: pointer;
`;

const Options1 = styled(Box)`
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 20px;
`;

const Options = styled(Box)`
    display: flex;
    align-items: center;
    gap: 15px;
    cursor: pointer;
`;

const StyledTypography = styled(Typography)`
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    font-weight: 600;
    color: #4A4A4A;
    margin-left: 20px;
    flex-grow: 1;
`;

const Header = () => {
    const { account } = useContext(AccountContext);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openAIChat, setOpenAIChat] = useState(false);

    const toggleDrawer = () => {
        setOpenDrawer(true);
    };

    const toggleAIChat = () => {
        setOpenAIChat(true);
    };

    return (
        <>
            <Component>
                <Image src={account.picture} alt="dp" onClick={toggleDrawer} />
                <StyledTypography>Chats</StyledTypography>
                <Options1>
                    <OpenAIIcon onClick={toggleAIChat} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 260">
                        <path d="M239.184 106.203a64.72 64.72 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.72 64.72 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.67 64.67 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.77 64.77 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483m-97.56 136.338a48.4 48.4 0 0 1-31.105-11.255l1.535-.87l51.67-29.825a8.6 8.6 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601M37.158 197.93a48.35 48.35 0 0 1-5.781-32.589l1.534.921l51.722 29.826a8.34 8.34 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803M23.549 85.38a48.5 48.5 0 0 1 25.58-21.333v61.39a8.29 8.29 0 0 0 4.195 7.316l62.874 36.272l-21.845 12.636a.82.82 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405zm179.466 41.695l-63.08-36.63L161.73 77.86a.82.82 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.54 8.54 0 0 0-4.4-7.213m21.742-32.69l-1.535-.922l-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.72.72 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391zM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87l-51.67 29.825a8.6 8.6 0 0 0-4.246 7.367zm11.868-25.58L128.067 97.3l28.188 16.218v32.434l-28.086 16.218l-28.188-16.218z" />
                    </OpenAIIcon>
                </Options1>
                <Options>
                    <HeaderMenu setOpenDrawer={setOpenDrawer} />
                </Options>
            </Component>
            <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} />
            {openAIChat && <AIChat onClose={() => setOpenAIChat(false)} />}
        </>
    );
};

export default Header;
