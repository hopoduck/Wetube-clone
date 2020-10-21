import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "title is required",
  },
  description: String,
  creator: String,
  creatorName: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  fileUrl: {
    type: String,
    required: "FileUrl is required!!",
  },
  views: {
    type: Number,
    default: 0,
  },
});

const model = mongoose.model("Video", VideoSchema);

export default model;
