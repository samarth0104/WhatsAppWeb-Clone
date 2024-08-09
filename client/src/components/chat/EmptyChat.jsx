import { Box, styled, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const Component = styled(Box)`
    background: #ededed;
    height: 118%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative; /* Make the parent relative */
`;

const Text1 = styled(Typography)`
    color: #4A4A4A;
    font-size: 40px;
    font-weight: 550;
`;

const Text2 = styled(Typography)`
    color: #4A4A4A;
    font-size: 20px;
    position: absolute;
    top: 80%; /* Adjust this percentage to position Text2 as desired */
`;

const Icon = styled(FontAwesomeIcon)`
    top: 80%;
    left:20%;
`


export default function EmptyChat() {
    return (
        <Component>
            <Text1>
                Send Messages and Don't Be A Loner
            </Text1>

            <Text2>
                <Icon icon={faLock} /> End to End Encrypted.
            </Text2>
        </Component>
    );
}
