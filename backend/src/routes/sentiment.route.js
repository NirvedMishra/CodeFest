import { Router } from "express";
import { getCodeCompletion, getSyntaxFixSuggestions, generateCodeDocumentation } from "../controllers/huggingFaceService.controller.js";

const router = Router();
router.post('/autocomplete', async (req, res) => {
    const { codeSnippet } = req.body;
    const result = await getCodeCompletion(codeSnippet);
    res.json(result);
  });
  
  router.post('/quickfix', async (req, res) => {
    const { codeSnippet } = req.body;
    const result = await getSyntaxFixSuggestions(codeSnippet);
    res.json(result);
  });
  
  router.post('/generate-doc', async (req, res) => {
    const { codeSnippet } = req.body;
    const result = await generateCodeDocumentation(codeSnippet);
    res.json(result);
  });

export default router;