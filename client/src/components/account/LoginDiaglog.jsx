import React, { useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import { Box, Typography, styled, keyframes } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { AccountContext } from '../context/AccountProvider';
import { addUser } from '../../service/api';
import '@fontsource/roboto';  // Import Roboto font
import { jwtDecode } from 'jwt-decode';
import WhatsAppIcon from '@mui/icons-material/WhatsApp'; // Import WhatsApp icon

const dialogStyle = {
    height: '75%',
    width: '40%',
    maxWidth: '100%',
    maxHeight: '100%',
    boxShadow: 'none',
    position: 'relative',
    borderRadius: '10px', // Rounded corners for a modern look
};

// Animation for the title and subtitle to fade in and slide up
const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

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

const IconWrapper = styled(Box)`
    margin-bottom: 20px;  // Space between icon and title
    animation: ${fadeInUp} 1s ease-out; // Apply animation to the icon
`;

const TitleTypography = styled(Typography)`
    font-family: 'Roboto', sans-serif;
    font-size: 32px;
    font-weight: 700;  // Bolder weight for title
    color: #222;  // Darker color for better contrast
    margin-bottom: 20px;  // Space between title and subtitle
    animation: ${fadeInUp} 1.2s ease-out; // Apply animation to the title
`;

const SubtitleTypography = styled(Typography)`
    font-family: 'Roboto', sans-serif;
    font-size: 18px;  // Slightly larger for better readability
    font-weight: 300;  // Lighter weight for subtitle
    color: #555;  // Softer color for subtitle to create hierarchy
    margin-bottom: 40px;  // More space before the login button
    text-align: center;  // Center the text
    animation: ${fadeInUp} 1.4s ease-out; // Apply animation to the subtitle
`;

const GoogleLoginWrapper = styled(Box)`
    width: 100%;  // Full width for the Google button
    display: flex;
    justify-content: center;  // Center the Google button
    animation: ${fadeInUp} 1.6s ease-out; // Apply animation to the Google button
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
                <IconWrapper>
                    <WhatsAppIcon sx={{ fontSize: 90, color: '#25D366' }} /> {/* Large WhatsApp icon */}
                </IconWrapper>
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
