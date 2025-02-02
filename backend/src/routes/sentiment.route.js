import { Router } from "express";
import { handleAutocomplete, handleQuickfix, handleGenerateDoc } from "../controllers/huggingFaceService.controller.js";

const router = Router();

router.post('/autocomplete', handleAutocomplete);
router.post('/quickfix', handleQuickfix);
router.post('/generate-doc', handleGenerateDoc);

export default router;