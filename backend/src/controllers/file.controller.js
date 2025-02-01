import { Folder } from "../models/folder.model.js";
import { File } from "../models/file.model.js";
import multer from "multer";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage }).single('file');

const uploadFile = async (req, res) => {
    console.log('uploadFile function invoked');
    console.log('Request body:', req.body);

    try {
        upload(req, res, async (err) => {
            if (err) {
                console.log('File upload error:', err);
                throw new ApiError(500, 'Error uploading file', err);
            }

            console.log('File upload successful:', req.file);

            const { folderId } = req.body;

            const newFile = new File({
                name: req.file.originalname,
                path: req.file.path,
                size: req.file.size,
                folderId,
            });

            console.log('Attempting to save new file:', newFile);

            await newFile.save();

            if (folderId) {
                console.log('Adding file to folder with ID:', folderId);
                await Folder.findByIdAndUpdate(folderId, { $push: { files: newFile._id } });
            }

            console.log('File saved successfully:', newFile);
            res.status(201).json(new ApiResponse(201, { message: 'File uploaded successfully', file: newFile }));
        });
    } catch (error) {
        console.log('Error occurred while uploading file:', error);
        throw new ApiError(500, 'Error uploading file', error);
    }
};

const getFile = async (req, res) => {
    console.log('getFile function invoked');
    console.log('Request parameters:', req.params);
    try {
        const { fileId } = req.params;
        console.log('Attempting to fetch file with ID:', fileId);
        const file = await File.findById(fileId);
        console.log('File document:', file);
        if (!file) {
            console.log('No file found with ID:', fileId);
            throw new ApiError(404, 'File not found');
        }

        console.log('File fetched successfully:', file);
        res.status(200).json(new ApiResponse(200, { file }));
    } catch (error) {
        console.log('Error occurred while fetching file:', error);
        throw new ApiError(500, 'Error fetching file', error);
    }
};

const renameFile = async (req, res) => {
    console.log('renameFile function invoked');
    console.log('Request parameters:', req.params);
    console.log('Request body:', req.body);
    try {
        const { fileId } = req.params;
        const { newName } = req.body;

        console.log('Attempting to update file with ID:', fileId, 'to new name:', newName);
        const updatedFile = await File.findByIdAndUpdate(fileId, { name: newName }, { new: true });

        if (!updatedFile) {
            console.log('No file found with ID:', fileId);
            throw new ApiError(404, 'File not found');
        }

        console.log('File updated successfully:', updatedFile);
        res.status(200).json(new ApiResponse(200, { message: 'File renamed successfully', file: updatedFile }));
    } catch (error) {
        console.log('Error occurred while renaming file:', error);
        throw new ApiError(500, 'Error renaming file', error);
    }
};

const deleteFile = async (req, res) => {
    try {
        const { fileId } = req.params;

        const file = await File.findById(fileId);
        if (!file) return res.status(404).json({ message: 'File not found' });

        // Remove file reference from folder
        await Folder.findByIdAndUpdate(file.folderId, { $pull: { files: fileId } });

        await File.findByIdAndDelete(fileId);

        res.status(200).json(new ApiResponse(200, { message: 'File deleted successfully' }));
    } catch (error) {
        console.log('Error occurred while deleting file:', error);
        throw new ApiError(500, 'Error deleting file', error);
    }
};

export { uploadFile, getFile, renameFile, deleteFile };
