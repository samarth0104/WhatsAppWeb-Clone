import { useState, useContext } from "react";
import { MoreVert } from "@mui/icons-material";
import { Menu, MenuItem, styled } from '@mui/material';
import { AccountContext } from "../../context/AccountProvider";

const HeaderMenu = ({ setOpenDrawer }) => {
    const [open, setOpen] = useState(null);
    const { setAccount } = useContext(AccountContext); // Access the context to manage account state

    const handleClose = () => {
        setOpen(null);
    }

    const StyledMenu = styled(Menu)`
        .MuiPaper-root {
            min-width: 100px; /* Increase the width of the menu */
            min-height: 60px;
        }
    `;

    const handleClick = (e) => {
        setOpen(e.currentTarget);
    }

    const handleLogout = () => {
        // Perform any additional logout logic here
        setAccount(null); // Reset the account context to null
        handleClose();
    }

    const MenuOption = styled(MenuItem)`
    font-size: 14px;
    color: #4A4A4A;
    &:hover {
        background-color: #e0e0e0;
    }
    &:focus {
        background-color: #ffffff; /* or the same color as the rest of the menu */
    }
`;


    return (
        <>
            <MoreVert onClick={handleClick} />
            <StyledMenu
                anchorEl={open}
                keepMounted
                open={Boolean(open)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                disableAutoFocusItem // Disable auto-focus on the first item
            >
                <MenuOption onClick={() => { handleClose(); setOpenDrawer(true); }}>Profile</MenuOption>
                <MenuOption onClick={handleLogout}>Logout</MenuOption>
            </StyledMenu>

        </>
    );
};

export default HeaderMenu;
