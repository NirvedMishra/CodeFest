import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
dotenv.config();

const inference = new HfInference(process.env.HF_TOKEN);

export const handleAutocomplete = async (req, res) => {
  try {
    const { codeSnippet } = req.body;
    const result = await getCodeCompletion(codeSnippet);
    res.json(new ApiResponse(200, result));
  } catch (error) {
    res
      .status(500)
      .json(new ApiError(500, "Failed to process autocomplete request"));
  }
};

export const handleQuickfix = async (req, res) => {
  try {
    const { codeSnippet } = req.body;
    const result = await getSyntaxFixSuggestions(codeSnippet);
    console.log(codeSnippet, "result", result);
    res.json(new ApiResponse(200, result));
  } catch (error) {
    res
      .status(500)
      .json(new ApiError(500, "Failed to process quickfix request"));
  }
};

export const handleGenerateDoc = async (req, res) => {
  try {
    const { codeSnippet } = req.body;
    if (!codeSnippet) {
      throw new ApiError(400, "Code snippet is required");
    }

    const result = await generateCodeDocumentation(codeSnippet);
    res.json(new ApiResponse(200, result));
  } catch (error) {
    res
      .status(500)
      .json(new ApiError(500, "Failed to process generate doc request"));
  }
};

export const getCodeCompletion = async (CodeSnippet) => {
  try {
    const result = await inference.textGeneration({
      model: "codellama/CodeLlama-7b-hf",
      inputs: `you are an elite level expert coder who is helping a student to write code then please complete the following code without changing the existing code as well as do not write any other thing  which is not a code: and avoid writing comments and only write code:${CodeSnippet}`,
      parameters: {
        max_new_tokens: 100,
        temperature: 0.3,
        return_full_text: false,
      },
    });
    console.log(result);
    return {
      success: true,
      generatedCode: result,
    };
  } catch (error) {
    console.error("Error in code completion:", error);
    return {
      success: false,
      error: error.message,
      generatedCode: null,
    };
  }
};

export const getSyntaxFixSuggestions = async (codeSnippet) => {
  try {
    const result = await inference.textGeneration({
      model: "codellama/CodeLlama-7b-hf",
      inputs: `prompt: you are an elite level expert coder then please tell me the quick fix for the following code:,
      ${codeSnippet}`,
      parameters: {
        max_new_tokens: 10,
        temperature: 0.3,
        return_full_text: false,
      },
    });
    return {
      success: true,
      generated_text: result.generated_text
    };
  } catch (error) {
    console.error("Error in syntax fix:", error);
    return {
      success: false,
      error: error.message,
      generated_text: null
    };
  }
};

export const generateCodeDocumentation = async (codeSnippet) => {
  try {
    const prompt = `
Generate concise documentation for the following code. Include:
- Function purpose
- Parameters
- Return value
- Key functionality

Code to document:
${codeSnippet}

Documentation:`;

    const result = await inference.textGeneration({
      model: "bigcode/starcoder",
      inputs: prompt,
      parameters: {
        max_new_tokens: 250,
        temperature: 0.3,
        top_p: 0.95,
        stop: ["```", "\n\n\n"],
        return_full_text: false,
      },
    });

    const documentation = result.generated_text
      .trim()
      .replace(/^```.*\n/, "")
      .replace(/```$/, "");

    return {
      success: true,
      documentation: documentation,
    };
  } catch (error) {
    console.error("Error generating documentation:", error);
    return {
      success: false,
      error: error.message,
      documentation: null,
    };
  }
};
