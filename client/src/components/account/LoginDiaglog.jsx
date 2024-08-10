import React, { useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import { Box, Typography, styled } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { AccountContext } from '../context/AccountProvider';
import { addUser } from '../../service/api';
import '@fontsource/roboto';  // Import Roboto font
import { jwtDecode } from 'jwt-decode';

const dialogStyle = {
    height: '75%',
    width: '40%',
    maxWidth: '100%',
    maxHeight: '100%',
    boxShadow: 'none',
    position: 'relative',
    borderRadius: '10px', // Rounded corners for a modern look
};

const Component = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    background: #f1f1f1;  // Light background color
    padding: 40px 20px;
    box-sizing: border-box;  // Ensure padding doesn't affect overall size
`;

const TitleTypography = styled(Typography)`
    font-family: 'Roboto', sans-serif;
    font-size: 32px;
    font-weight: 700;  // Bolder weight for title
    color: #222;  // Darker color for better contrast
    margin-bottom: 20px;  // Space between title and subtitle
    // text-transform: uppercase;  // Transform text to uppercase for impact
`;

const SubtitleTypography = styled(Typography)`
    font-family: 'Roboto', sans-serif;
    font-size: 18px;  // Slightly larger for better readability
    font-weight: 300;  // Lighter weight for subtitle
    color: #555;  // Softer color for subtitle to create hierarchy
    margin-bottom: 40px;  // More space before the login button
    text-align: center;  // Center the text
`;

const GoogleLoginWrapper = styled(Box)`
    width: 100%;  // Full width for the Google button
    display: flex;
    justify-content: center;  // Center the Google button
`;

const LoginDialog = () => {
    const { setAccount } = useContext(AccountContext);

    const onLoginSuccess = async (res) => {
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
                <TitleTypography>Welcome to WhatsApp Web Clone</TitleTypography>
                <SubtitleTypography>Please sign in using your Google Account</SubtitleTypography>
                <GoogleLoginWrapper>
                    <GoogleLogin
                        onSuccess={onLoginSuccess}
                        onError={onLoginError}
                        shape="pill"  // Use a rounded button for a modern look
                        theme="filled_blue"  // Use the blue theme for the button
                    />
                </GoogleLoginWrapper>
            </Component>
        </Dialog>
    );
};

export default LoginDialog;
