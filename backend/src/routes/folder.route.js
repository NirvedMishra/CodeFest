import { Router } from 'express';
import { createFolder, deleteFolder, getUserRootFolder, renameFolder } from '../controllers/folder.controller.js';
import { verifyUser } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/create').post(verifyUser,createFolder);
router.route('/user/:userId/root-folder').get(getUserRootFolder);
router.route('/:folderId/rename').put(renameFolder);
router.route('/delete/:folderId').delete(deleteFolder);

export default router;
