import { Search as SearchIcon } from "@mui/icons-material";
import { Box, styled } from '@mui/material';
import { InputBase } from "@mui/material";

const Component1 = styled(Box)`
background: #fff;
height: 8%;
border-bottom: 1px solid rgba(1,1,1,0.14);
display: flex;
align-items: center;
`
const Component2 = styled(Box)` 
background: #f0f2f5;
position: relative;
margin: 2%;
width:100%;
border-radius: 2%;
`
const Icon = styled(SearchIcon)`
position: absolute;
height: 100%;
margin-left: 10%;
color: #919191;
`
const InputField = styled(InputBase)`
width: 100%;
height: 15%;
padding-left: 10%;
margin-left: 10%;
font-size: 15px;
`

const Search = ({ setText }) => {
    return (
        <Component1>
            <Component2>
                <Box>
                    <Icon fontSize="small" />
                </Box>
                <InputField placeholder="Search or Start New Chat" onChange={(e) => setText(e.target.value)} />
            </Component2>
        </Component1>
    );
};

export default Search;
