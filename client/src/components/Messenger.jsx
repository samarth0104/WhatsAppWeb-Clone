import LoginDialog from './account/LoginDiaglog';
import { AppBar, Box, Toolbar, styled } from '@mui/material';
import { useContext } from 'react';
import { AccountContext } from './context/AccountProvider';
import ChatDialog from './chat/ChatDialog';

const LoginHeader = styled(AppBar)`
    height: 30%;
    background-color: 	#00bfa5;
    box-shadow: none;`

const ChatHeader = styled(AppBar)`
    height: 20%;
    background-color: 	#00bfa5;
    box-shadow: none;`

const Component = styled(Box)`
    height: 100vh;
    background-color: #DCDCDC;`


const Messenger = () => {
    const { account } = useContext(AccountContext);
    return (
        <Component>
            {
                account ?
                    <>
                        <ChatHeader>
                            <Toolbar>

                            </Toolbar>
                        </ChatHeader>
                        <ChatDialog />

                    </>
                    :
                    <>
                        <LoginHeader>
                            <Toolbar>

                            </Toolbar>
                        </LoginHeader>
                        <LoginDialog />
                    </>
            }
        </Component>
    )
}
export default Messenger;