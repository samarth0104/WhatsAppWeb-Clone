
import axios from 'axios';

const url = 'http://localhost:8000';

export const addUser = async (data) => {
    try {
        await axios.post(`${url}/add`, data);
    } catch (error) {
        console.log('Error while calling addUser API ', error.message);
    }
}

export const getUsers = async () => {
    try {
        let response = await axios.get(`${url}/users`);
        return response.data
    } catch (error) {
        console.log('Error while calling getUsers API ', error.message);
    }
}

export const setConversation = async (data) => {
    try {
        await axios.post(`${url}/conversation/add`, data);
    } catch (error) {
        console.log('Error while calling setConversation API ', error);
    }
}

export const getConversation = async (users) => {
    try {
        let response = await axios.post(`${url}/conversation/get`, users);
        return response.data;
    } catch (error) {
        console.log('Error while calling getConversation API ', error);
    }
}

export const newMessage = async (data) => {
    try {
        return await axios.post(`${url}/message/add`, data);
    } catch (error) {
        console.log('Error while calling newMessage API ', error);
    }
}

export const getMessages = async (id) => {
    try {
        let response = await axios.get(`${url}/message/get/${id}`);
        return response.data
    } catch (error) {
        console.log('Error while calling getMessages API ', error);
    }
}

export const interactWithBot = async (message) => {
    try {
        const response = await axios.post(`${url}/bot/interact`, { message });
        return response.data.botReply;
    } catch (error) {
        console.log('Error while calling interactWithBot API', error.message);
        return "Sorry, something went wrong with the bot interaction.";
    }
};


export const getMessageStats = async (senderId, receiverId) => {
    try {
        const response = await axios.post(`${url}/message/stats`, { senderId, receiverId });
        return response.data;
    } catch (error) {
        console.log('Error while calling getMessageStats API', error.message);
    }
};

// export const uploadFile = async (data) => {
//     try {
//         return await axios.post(`${url}/file/upload`, data);
//     } catch (error) {
//         console.log('Error while calling newConversations API ', error);
//     }
// }