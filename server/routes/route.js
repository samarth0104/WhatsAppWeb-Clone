// route.js

import express from 'express';
import { addUser, getUsers } from '../controller/user-controller.js';
import { newConversation, getConversation } from '../controller/conversation-controller.js';
import { newMessage, getMessages } from '../controller/message-controller.js';
import { interactWithBot } from '../controller/bot-controller.js'; // Import the bot controller

// import { uploadFile } from '../controller/image-controller.js';
// import upload from '../utils/upload.js';

const route = express.Router();

route.post('/add', addUser);
route.get('/users', getUsers);
route.post('/conversation/add', newConversation);
route.post('/conversation/get', getConversation);
route.post('/message/add', newMessage);
route.get('/message/get/:id', getMessages);
route.post('/bot/interact', interactWithBot); // Add the new route for bot interaction

// route.post('/file/upload', upload.single("file"), uploadFile);

export default route;
