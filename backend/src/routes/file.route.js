import { Router } from 'express';
import { deleteFile, getFile, renameFile, uploadFile } from '../controllers/file.controller.js';

const router = Router();

router.route('/upload').post(uploadFile);
router.route('/:fileId').get(getFile);
router.route('/:fileId/rename').put(renameFile);
router.route('/:fileId').delete(deleteFile);

export default router;
