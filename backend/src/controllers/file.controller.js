import { Folder } from "../models/folder.model.js";
import { File } from "../models/file.model.js";
import multer from "multer";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asynchandler } from "../utils/asynchandler.js";

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

 
        const {name,parentId, workspaceId,content} = req.body;
        const file = await File.create({name,parentId,workspaceId,content});
        if(!file){
            throw new ApiError(500,"Failed to create file")
        }
        const folder = await Folder.findById(parentId);
        if(!folder){
            throw new ApiError(404,"Folder not found")
        }
        folder.files.push(file._id);
        await folder.save();
        return res.json(new ApiResponse(200,{message:"File uploaded successfully",file}));
 
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

const deleteFile = asynchandler(async (req, res) => {
  
        const { fileId } = req.params;
        console.log('Received fileId:', fileId);

        const file = await File.findById(fileId);
        if (!file) {
            console.log('File not found for fileId:', fileId);
            throw new ApiError(404, 'File not found');
        }

        // Remove file reference from folder
        await Folder.findByIdAndUpdate(file.parentId, { $pull: { files: fileId } });

        await File.findByIdAndDelete(fileId);

        console.log('File deleted successfully:', fileId);
        res.status(200).json(new ApiResponse(200, { message: 'File deleted successfully' }));
  
});
const saveFile = asynchandler(async (req, res) => {
    const { fileId } = req.params;
    const { content } = req.body;
    const file = await File.findByIdAndUpdate(fileId, { content:content});
    if (!file) {
        throw new ApiError(404, 'File not found');
    }
    await file.save();
    return res.json(new ApiResponse(200, { message: 'File updated successfully', file }));
})

export { uploadFile, getFile, renameFile, deleteFile,saveFile };
