const url = 'http://localhost:8000';

export const uploadFile = (request, response) => {
    if (!request.file) {
        return response.status(404).json({ message: "File not found" });
    }

    try {
        const imageUrl = `${url}/file/${request.file.filename}`;
        response.status(200).json({ imageUrl });
    } catch (error) {
        console.error('Upload error:', error);
        response.status(500).json({ message: "File upload failed", error });
    }
};
