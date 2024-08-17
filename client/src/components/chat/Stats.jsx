import { useContext } from 'react';
import { Box, styled, Dialog, DialogContent, Typography } from '@mui/material';
import { Bar, Pie } from 'react-chartjs-2';
import { AccountContext } from '../context/AccountProvider';
import 'chart.js/auto';

const Wrapper = styled(Box)`
    background-image: url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'});
    background-size: 50%;
    border-radius: 10px;
    padding: 24px;
`;

const StatBox = styled(Box)`
    background: #FFFFFF;
    padding: 24px;
    border-radius: 10px;
    margin-top: 24px;
`;

const StatItem = styled(Box)`
    margin-bottom: 16px;
`;

const StatLabel = styled(Typography)`
    font-size: 16px;
    font-weight: bold;
`;

const StatValue = styled(Typography)`
    font-size: 18px;
    color: black;
`;

const MessageList = styled(Box)`
    margin-top: 12px;
    background-color: #f0f0f0;
    padding: 12px;
    border-radius: 8px;
`;

const MessageText = styled(Typography)`
    font-size: 14px;
    color: #000;
    margin-bottom: 8px;
`;

const Header = styled(Box)`
    background-color: #25D366;
    padding: 24px;
    text-align: center;
    color: white;
    font-size: 24px;
    font-weight: bold;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
`;

const Stats = ({ messages, onClose }) => {
    const { account } = useContext(AccountContext);

    const goodMessages = messages.filter(msg => msg.text.toLowerCase().includes('good'));
    const badMessages = messages.filter(msg => !msg.text.toLowerCase().includes('good'));

    const totalMessages = messages.length;
    const sentMessages = messages.filter(msg => msg.senderId === account.sub).length;
    const receivedMessages = messages.filter(msg => msg.senderId !== account.sub).length;

    const barData = {
        labels: ['Total', 'Sent', 'Received', 'Good', 'Bad'],
        datasets: [{
            label: 'Messages',
            data: [totalMessages, sentMessages, receivedMessages, goodMessages.length, badMessages.length],
            backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF']
        }]
    };

    const pieData = {
        labels: ['Good Messages', 'Bad Messages'],
        datasets: [{
            data: [goodMessages.length, badMessages.length],
            backgroundColor: ['#36A2EB', '#FF6384'],
            hoverBackgroundColor: ['#36A2EB', '#FF6384']
        }]
    };

    return (
        <Dialog open={true} onClose={onClose} fullWidth maxWidth="md">
            <Header>Message Statistics</Header>
            <DialogContent>
                <Wrapper>
                    <StatBox>
                        <StatItem>
                            <StatLabel>Total Messages:</StatLabel>
                            <StatValue>{totalMessages}</StatValue>
                        </StatItem>
                        <StatItem>
                            <StatLabel>Sent Messages:</StatLabel>
                            <StatValue>{sentMessages}</StatValue>
                        </StatItem>
                        <StatItem>
                            <StatLabel>Received Messages:</StatLabel>
                            <StatValue>{receivedMessages}</StatValue>
                        </StatItem>

                        <Box sx={{ marginTop: '24px' }}>
                            <Typography variant="h6" gutterBottom>Message Distribution</Typography>
                            <Bar data={barData} width={100} height={100} /> {/* Adjusted width and height */}
                        </Box>

                        <Box sx={{ marginTop: '24px' }}>
                            <Typography variant="h6" gutterBottom>Good vs Bad Messages</Typography>
                            <Pie data={pieData} width={200} height={200} /> {/* Adjusted width and height */}
                        </Box>
                    </StatBox>
                </Wrapper>
            </DialogContent>
        </Dialog>
    );
};

export default Stats;
