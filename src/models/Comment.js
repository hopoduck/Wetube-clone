import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  text: String,
  creator: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const model = mongoose.model("Comment", CommentSchema);

export default model;
