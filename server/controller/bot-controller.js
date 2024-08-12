import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const interactWithBot = async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4o-mini",  // Update model name to match the one in your curl command
            prompt: message,
            max_tokens: 100,  // You can adjust this value as needed
            temperature: 0.7,   // Match the temperature parameter from your curl command
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.json({ botReply: response.data.choices[0].text.trim() });
    } catch (error) {
        console.error('Error while calling OpenAI API', error.message);
        res.status(500).json({ message: 'Failed to interact with bot' });
    }
};
