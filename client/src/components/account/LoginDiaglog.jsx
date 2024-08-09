import React from 'react';
import Dialog from '@mui/material/Dialog';
import { Box, Typography, styled } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { useContext } from 'react';
import { AccountContext } from '../context/AccountProvider';
import { addUser } from '../../service/api';


import '@fontsource/roboto';  // Import Roboto font
import { jwtDecode } from 'jwt-decode';

const dialogStyle = {
    height: '70%',
    marginTop: '2%',
    width: '60%',
    maxWidth: '100%',
    maxHeight: '100%',
    boxShadow: 'none',
    position: 'relative',  // Add relative positioning for the dialog box
};

const Component = styled(Box)`
    text-align: center;  // Center text horizontally
    padding: 2% 0 0 0;
    font-family: 'Roboto', sans-serif;  // Apply custom font to this component
`;

const CustomTypography1 = styled(Typography)`
    font-family: 'Roboto', sans-serif;  // Apply custom font to Typography
    font-size: 32px;  // Example of custom styling for the p tag
    color: #333;  // Example color
`;

const CustomTypography2 = styled(Typography)`
    font-family: 'Roboto', sans-serif;  // Apply custom font to Typography
    font-size: 16px;  // Example of custom styling for the p tag
    color: #333;  // Example color
    margin-top: 16px;  // Add margin to move this text below the title
`;

const GoogleLoginWrapper = styled(Box)`
    position: absolute;  // Absolute positioning
    top: 30%;  // Vertically center
    left: 50%;  // Horizontally center
    transform: translate(-50%, -50%);  // Adjust position back to center
`;

const LoginDialog = () => {
    const { setAccount } = useContext(AccountContext)
    const onLoginSuccess = async (res) => {
        // console.log('Login Success:', res);
        if (res && res.credential) {
            const decodedZ = jwtDecode(res.credential);
            console.log(decodedZ);
            setAccount(decodedZ);
            await addUser(decodedZ);
        } else {
            console.error('Invalid token format:', res);
        }
    }

    const onLoginError = (res) => {
        console.error('Login Error:', res);
    }

    return (
        <Dialog
            open={true}
            PaperProps={{ sx: dialogStyle }}
            hideBackdrop={true}>
            <Component>
                <CustomTypography1>Welcome to Whatsapp Web Clone</CustomTypography1>
                <CustomTypography2>Please Sign In using your Google Account</CustomTypography2>
                <GoogleLoginWrapper>
                    <GoogleLogin
                        onSuccess={onLoginSuccess}
                        onError={onLoginError} />
                </GoogleLoginWrapper>
            </Component>
        </Dialog>
    );
};

export default LoginDialog;
