import { Schema } from "mongoose";
import mongoose from "mongoose";


const fileSchema = new Schema({
    name: { type: String, required: true },
    parentId: {
        type: Schema.Types.ObjectId,
        ref: 'Folder',
        required: true
    },
    content: { type: String, default: '' },
    workspaceId: {
        type: Schema.Types.ObjectId,
        ref: 'WorkSpace',
        required: true
    },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true,
});

export const File = mongoose.model('File', fileSchema);