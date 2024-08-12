import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const interactWithBot = async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: message,
                            },
                        ],
                    },
                ],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        // Access the actual text content inside the content object
        const botReply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from bot';
        res.json({ botReply: botReply.trim() });
    } catch (error) {
        console.error('Error while calling Google Gemini API', error.message);
        res.status(500).json({ message: 'Failed to interact with bot' });
    }
};
