import { Router } from 'express';
import { createFolder, deleteFolder, getUserRootFolder, renameFolder } from '../controllers/folder.controller.js';

const router = Router();

router.route('/create').post(createFolder);
router.route('/user/:userId/root-folder').get(getUserRootFolder);
router.route('/:folderId/rename').put(renameFolder);
router.route('/:folderId').delete(deleteFolder);

export default router;
