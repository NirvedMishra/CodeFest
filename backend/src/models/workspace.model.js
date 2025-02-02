import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rootFolder: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Folder' 
      },
    contributors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    invitations: [{ email:{ type: String, required: true }, token: { type: String, required: true } }],
    type: { type: String, required: true }
}, { timestamps: true });

export const WorkSpace = mongoose.model("WorkSpace", workspaceSchema);