import { useContext } from "react";
import { AccountContext } from "../context/AccountProvider";
import { Box, styled, Typography } from "@mui/material";

const Component1 = styled(Box)`
display:flex;
margin-top : 10%;
justify-content:center;
`
const Component2 = styled(Box)`
margin-top : 8%;
height:12%;
width:100%;
background: #FFFFFF;
`
const Image = styled('img')`
border-radius:50%;
    height: 30%;
    width: 30%;
`
const Text1 = styled(Typography)`
margin-top:auto;
color: #4A4A4A;
padding: 1% 0 0 2%;
`
const Text2 = styled(Typography)`
margin-bottom:auto;
color: #4A4A4A;
padding: 2% 0 0 2%;
font-size : 26px;
`

const Profile = () => {
    const { account } = useContext(AccountContext);
    return (
        <>
            <Component1>
                <Image size={"large"} src={account.picture} />
            </Component1>
            <Component2>
                <Text1>Your Name</Text1>
                <Text2>{account.name}</Text2>
            </Component2>
            <Component2>
                <Text1>About</Text1>
                <Text2>Sleep</Text2>
            </Component2>
        </>
    )
}
export default Profile;