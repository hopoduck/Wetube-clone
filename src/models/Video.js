import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "title is required",
  },
  description: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  fileUrl: {
    type: String,
    required: "FileUrl is required!!",
  },
  views: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const model = mongoose.model("Video", VideoSchema);

export default model;
