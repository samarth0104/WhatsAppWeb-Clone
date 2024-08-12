import { useState, useEffect, useRef, useContext } from 'react';
import { Box, styled, Dialog, DialogContent, Typography } from '@mui/material';
import { interactWithBot } from '../../service/api';
import Footer from './Footer';
import { formatDate } from '../../utils/common-utils';
import { AccountContext } from '../context/AccountProvider';

const Wrapper = styled(Box)`
    background-image: url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'});
    background-size: 50%;
    border-radius: 10px;
`;

const Component = styled(Box)`
    height: 68vh;
    overflow-y: scroll;
    border-radius: 10px;
`;

const Sent = styled(Box)`
    background: #dcf8c6;
    max-width: 60%;
    margin-left: auto;
    padding: 5px;
    width: fit-content;
    display: flex;
    border-radius: 10px;
    margin-top: 4px;
    word-break: break-word;
`;

const Rec = styled(Box)`
    background: #FFFFFF;
    max-width: 60%;
    padding: 5px;
    width: fit-content;
    display: flex;
    border-radius: 10px;
    margin-top: 4px;
    word-break: break-word;
    margin-left: 8px;
`;

const Text = styled(Typography)`
    font-size: 14px;
    padding: 0 25px 0 5px;
`;

const Timestamp = styled(Typography)`
    font-size: 10px;
    margin-left: 2px;
    margin-top: auto;
    word-break: keep-all;
`;

const Header = styled(Box)`
    background-color: #25D366; /* Green color */
    padding: 16px;
    text-align: center;
    color: white;
    font-size: 20px;
    font-weight: bold;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
`;

const AIChat = ({ onClose }) => {
    const { account } = useContext(AccountContext);
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const scrollRef = useRef();
    const [loading, setLoading] = useState(false);

    const sendText = async (e) => {
        let code = e.keyCode || e.which;
        if (!value) return;

        if (code === 13) {
            setValue('');
            const userMessage = {
                senderId: account.sub,
                text: value,
                type: 'text',
                createdAt: new Date().getTime(),
            };

            setMessages((prev) => [...prev, userMessage]);
            setLoading(true);

            try {
                const botReply = await interactWithBot(value);
                const botMessage = {
                    senderId: 'ai-bot',
                    text: botReply,
                    type: 'text',
                    createdAt: new Date().getTime(),
                };
                setMessages((prev) => [...prev, botMessage]);
            } catch (error) {
                console.error('Error interacting with bot:', error);
                const errorMessage = {
                    senderId: 'ai-bot',
                    text: 'Sorry, something went wrong. Please try again later.',
                    type: 'text',
                    createdAt: new Date().getTime(),
                };
                setMessages((prev) => [...prev, errorMessage]);
            }


            setLoading(false);
        }
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
            <Header>ChatBot</Header>
            <DialogContent>
                <Wrapper>
                    <Component>
                        {messages.map((message, index) => (
                            <Box ref={scrollRef} key={index} style={{ "border-radius": "10px" }}>
                                {account.sub === message.senderId ? (
                                    <Sent>
                                        <Text>{message.text}</Text>
                                        <Timestamp>{formatDate(message.createdAt)}</Timestamp>
                                    </Sent>
                                ) : (
                                    <Rec>
                                        <Text>{message.text}</Text>
                                        <Timestamp>{formatDate(message.createdAt)}</Timestamp>
                                    </Rec>
                                )}
                            </Box>
                        ))}
                    </Component>
                    <Footer style={{ "border-radius": "10px" }}
                        sendText={sendText}
                        value={value}
                        setValue={setValue}
                    />
                </Wrapper>
            </DialogContent>
        </Dialog>
    );
};

export default AIChat;
