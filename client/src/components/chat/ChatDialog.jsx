import React from 'react';
import Dialog from '@mui/material/Dialog';
import { Box, styled } from '@mui/material';
import { useContext } from 'react';
// scripts
import Menu from './menu/Menu'
import EmptyChat from './EmptyChat';
import ChatBox from './ChatBox';
import { AccountContext } from '../context/AccountProvider';

const dialogStyle = {
    height: '94.5%',
    marginTop: '2%',
    width: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    boxShadow: 'none',
    position: 'relative',  // Add relative positioning for the dialog box
};

const Component = styled(Box)`
display: flex;
`
const LeftComponent = styled(Box)`
min-width : 35%;
`

const RightComponent = styled(Box)`
 width : 65%;
 min-width : 30%;
 height: 80vh;
    border-left: 1px solid rgba(0, 0, 0, 0.14); /* Corrected rgba */
`
const ChatDialog = () => {
    const { person } = useContext(AccountContext);
    return (
        <Dialog
            open={true}
            PaperProps={{ sx: dialogStyle }}
            hideBackdrop={true}
            maxWidth={'md'}>
            <Component>
                <LeftComponent>
                    <Menu />
                </LeftComponent>
                <RightComponent>
                    {Object.keys(person).length ? <ChatBox /> : <EmptyChat />}
                </RightComponent>
            </Component>
        </Dialog >
    )
}
export default ChatDialog;