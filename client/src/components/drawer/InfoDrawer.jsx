import { Drawer, Box, styled, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import Profile from "./Profile";

const drawStyle = {
    height: '100%',
    width: '40%',
    boxShadow: 'none',
    left: 0
};

const Header = styled(Box)`
    background: #00bfa5;
    height: 15%;
    color: #FFFFFF;
    display: flex;
    & > svg, & > p {
        margin-top: auto;
        color: #FFFFFF;
        padding: 2%;
        font-weight: 600;
    } 
`;

const Component = styled(Box)`
    background: #ededed;
    height: 100%;
`;

const Arrowz = styled(ArrowBack)`
    cursor: pointer;
`;

const InfoDrawer = ({ open, setOpen }) => {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Drawer
            open={open}
            onClose={handleClose}
            PaperProps={{ sx: drawStyle }}
            style={{ zIndex: 1500 }}
        >
            <Header>
                <Arrowz onClick={handleClose} />
                <Typography>Profile</Typography>
            </Header>
            <Component>
                <Profile />
            </Component>
        </Drawer>
    );
};

export default InfoDrawer;
