import Message from "../model/Message.js";
import Conversation from '../model/Conversation.js';
export const newMessage = async (request, response) => {
    const newMessage = new Message(request.body);
    try {
        await newMessage.save();
        await Conversation.findByIdAndUpdate(request.body.conversationId, { message: request.body.text });
        response.status(200).json("Message has been sent successfully");
    } catch (error) {
        response.status(500).json(error);
    }

}
export const getMessages = async (request, response) => {
    try {
        const messages = await Message.find({ conversationId: request.params.id });
        response.status(200).json(messages);
    } catch (error) {
        response.status(500).json(error);
    }

}

export const getMessageStats = async (req, res) => {
    const { senderId, receiverId } = req.body;

    try {
        // Fetch all messages between the sender and receiver
        const messages = await Message.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        }).sort({ createdAt: 1 }); // Sort by creation time

        // Calculate statistics
        const totalMessages = messages.length;
        const sentMessages = messages.filter(msg => msg.senderId === senderId).length;
        const receivedMessages = messages.filter(msg => msg.senderId === receiverId).length;
        const goodMessages = messages.filter(msg => msg.text.toLowerCase().includes('good')).length;
        const badMessages = totalMessages - goodMessages; // Assuming "bad" is anything not containing "good"

        // Respond with the statistics
        res.status(200).json({
            totalMessages,
            sentMessages,
            receivedMessages,
            goodMessages,
            badMessages,
            messages // Optionally return the messages
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch message stats' });
    }
};
