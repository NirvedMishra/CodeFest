// services/huggingFaceService.js
import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";
dotenv.config();

const inference = new HfInference(process.env.HF_API_KEY);

export const getCodeCompletion = async (CodeSnippet) => {
  try {
    const result = await inference.textClassification({
      model: "meta-llama/CodeLlama-7b-hf",
      inputs: CodeSnippet,
    });
    return result;
  } catch (error) {
    console.error("Error fetching sentiment:", error);
    throw error;
  }
};

export const getSyntaxFixSuggestions = async (codeSnippet) => {
  try {
    const result = await inference.textGeneration({
      model: "facebook/codebert-base", // Use a model that can detect syntax issues
      inputs: codeSnippet,
    });
    return result; // This will contain suggestions for fixing errors
  } catch (error) {
    console.error("Error in syntax fix:", error);
    return null;
  }
};


export const generateCodeDocumentation = async (codeSnippet) => {
  try {
    const result = await inference.textGeneration({
      model: "microsoft/CodeBERT",
      inputs: `Generate documentation for the following code: ${codeSnippet}`,
    });
    return result;
  } catch (error) {
    console.error("Error generating documentation:", error);
    return null;
  }
};

