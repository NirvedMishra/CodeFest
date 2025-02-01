import axios from "axios";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import dotenv from 'dotenv';
dotenv.config();
const JUDGE0_URL = 'https://judge0-ce.p.rapidapi.com/submissions';
const API_KEY = process.env.JUDGE0_API_KEY;


// Function to submit code to Judge0
const submitCode = async (sourceCode, languageId, input) => {
    try {
        const response = await axios.post(JUDGE0_URL, {
            source_code: sourceCode,
            language_id: languageId,  // Example: 54 for Python 3
            stdin: input,
        }, {
            headers: {
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                'X-RapidAPI-Key': API_KEY,
                'Content-Type': 'application/json',
            },
            params: {
                wait: false,
            }
        });

        return response.data;  // Contains a token
    } catch (error) {
        throw new ApiError(500, 'Failed to submit code');
    }
};

// Function to fetch execution result
const getSubmissionResult = async (token) => {
    try {
        const response = await axios.get(`${JUDGE0_URL}/${token}`, {
            params: {
                base64_encoded: 'true',
                fields: '*'
            },
            headers: {
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                'X-RapidAPI-Key': API_KEY,
            }
        });
        console.log("here is the response", response.data);

        return response.data;
    } catch (error) {
        throw new ApiError(500, 'Failed to fetch execution result though submission result controller');
    }
};

const getHumanReadableResult = (result) => {
    // Extract the status description and output
    const statusDescription = result.status.description || 'Unknown status';
    const stdout = result.stdout || 'No output';
    const stderr = result.stderr || 'No errors';
    const compileOutput = result.compile_output || 'No compilation errors';
    
    // Generate a human-readable message
    let message = `Status: ${statusDescription}\n`;

    // If the status is Accepted (meaning code executed correctly), show the output
    if (statusDescription === "Accepted") {
        message += `Output:\n${stdout}\n`;
    } else if (statusDescription === "Compilation Error") {
        // If there was a compilation error, show the compile output
        message += `Compilation Error: ${compileOutput}\n`;
    } else if (statusDescription === "Runtime Error") {
        // Show runtime error if occurred
        message += `Runtime Error: ${stderr}\n`;
    } else {
        // For other status, provide stderr if available
        message += `Error Details: ${stderr}\n`;
    }

    return message;
};

// Express route handler
const executeCode = async (req, res) => {
    const { sourceCode, languageId, input } = req.body;

    const submission = await submitCode(sourceCode, languageId, input);
    if (!submission || !submission.token) {
        return res.status(500).json({ error: "Submission failed" });
    }

    // Wait before fetching the result
    setTimeout(async () => {
        const result = await getSubmissionResult(submission.token);
        const readableResult = getHumanReadableResult(result);
        if (!result) {
            throw new ApiError(500, 'Failed to fetch execution result');
        }
        res
            .status(200)
            .json(new ApiResponse(200, readableResult, "Code executed successfully"));
    }, 3000);
};

export { executeCode };