import { Folder } from '../models/folder.model.js';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const createFolder = async (req, res) => {
    try {
        const { userId, name, parentId } = req.body;
        const user = await User.findById(userId);
        if (!user) throw new ApiError(404, 'User not found');

        const newFolder = new Folder({
            name,
            userId,
            parentId: parentId || null,
        });

        await newFolder.save();

        if (parentId) {
            await Folder.findByIdAndUpdate(parentId, { $push: { children: newFolder._id } });
        }

        res.status(201).json(new ApiResponse(201, { message: 'Folder created successfully', folder: newFolder }));
    } catch (error) {
        throw new ApiError(500, 'Error creating folder', error);
    }
};

const getUserRootFolder = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId).populate('rootFolder');
        if (!user) return res.status(404).json({ message: 'User not found' });

        const rootFolder = await Folder.findById(user.rootFolder)
            .populate('children')
            .populate('files');

        res.status(200).json(new ApiResponse(200, { rootFolder }));
    } catch (error) {
        throw new ApiError(500, 'Error fetching user root folder', error);
    }
};

const renameFolder = async (req, res) => {
    try {
        const { folderId } = req.params;
        const { newName } = req.body;

        const updatedFolder = await Folder.findByIdAndUpdate(folderId, { name: newName }, { new: true });

        res.status(200).json(new ApiResponse(200, { message: 'Folder renamed successfully', folder: updatedFolder }));
    } catch (error) {
        throw new ApiError(500, 'Error renaming folder', error);
    }
};

const deleteFolder = async (req, res) => {
    try {
        const { folderId } = req.params;

        const folder = await Folder.findById(folderId);
        if (!folder) return res.status(404).json({ message: 'Folder not found' });

        if (folder.parentId) {
            await Folder.findByIdAndUpdate(folder.parentId, { $pull: { children: folderId } });
        }

        await Folder.findByIdAndDelete(folderId);
        res.status(200).json(new ApiResponse(200, { message: 'Folder deleted successfully' }));
    } catch (error) {
        throw new ApiError(500, 'Error deleting folder', error);
    }
};

export { createFolder, getUserRootFolder, renameFolder, deleteFolder };
