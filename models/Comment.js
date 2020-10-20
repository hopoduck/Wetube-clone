import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  text: String,
  creator: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const model = mongoose.model("Comment", CommentSchema);

export default model;
