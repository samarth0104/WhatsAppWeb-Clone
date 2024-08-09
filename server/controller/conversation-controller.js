import Conversation from "../model/Conversation.js";

export const newConversation = async (request, response) => {
    try {
        const { senderId, receiverId } = request.body;

        // Log request data for debugging
        // console.log("Request body:", request.body);

        // Ensure receiverId and senderId are in an array for the $all operator
        const exist = await Conversation.findOne({ members: { $all: [senderId, receiverId] } });

        if (exist) {
            return response.status(200).json("conversation exists");
        }

        const newConversation = new Conversation({
            members: [senderId, receiverId]
        });

        await newConversation.save();
        return response.status(200).json("conversation saved");
    } catch (error) {
        // Log the error for debugging
        // console.error("Error while creating new conversation:", error.message);
        return response.status(500).json("fail");
    }
};


export const getConversation = async (request, response) => {
    try {

        const conversation = await Conversation.findOne({ members: { $all: [request.body.senderId, request.body.receiverId] } });
        response.status(200).json(conversation);
    } catch (error) {
        response.status(500).json(error.message);
    }

}