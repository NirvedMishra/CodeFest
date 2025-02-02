import { Router } from 'express';
import { deleteFile, getFile, renameFile, uploadFile,saveFile } from '../controllers/file.controller.js';

const router = Router();

router.route('/upload').post(uploadFile);
router.route('/:fileId').get(getFile);
router.route('/:fileId/rename').put(renameFile);
router.route('/delete/:fileId').delete(deleteFile);
router.route('/save/:fileId').put(saveFile);    

export default router;
