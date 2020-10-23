import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: "id is required",
  },
  name: String,
  avatarUrl: { type: String, default: `uploads/avatars/default.svg` },
  githubId: Number,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
});

UserSchema.plugin(passportLocalMongoose, {
  usernameField: "id",
});

const model = mongoose.model("User", UserSchema);

export default model;
