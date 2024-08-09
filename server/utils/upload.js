import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    url: `mongodb://${username}:${password}@whatsappwebclonedb-shard-00-00.sjtfu.mongodb.net:27017,whatsappwebclonedb-shard-00-01.sjtfu.mongodb.net:27017,whatsappwebclonedb-shard-00-02.sjtfu.mongodb.net:27017/?ssl=true&replicaSet=atlas-eklci3-shard-0&authSource=admin&retryWrites=true&w=majority&appName=WhatsAppWebCloneDB`,
    file: (req, file) => {
        const match = ["image/png", "image/jpg", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            return `${Date.now()}-file-${file.originalname}`;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-file-${file.originalname}`
        };
    }
});

const upload = multer({ storage });

export default upload;
