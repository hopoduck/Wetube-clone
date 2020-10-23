import Video from "../models/Video";
import Comment from "../models/Comment";

export const postApiView = async (req, res) => {
  const {
    params: { id },
  } = req;
  let video = await Video.findById(id);
  console.log(video);
  video.views += 1;
  video.save();
};

export const postApiCommentAdd = async (req, res) => {
  const {
    params: { id },
    body: { comment },
  } = req;
  try {
    console.log(comment);
    let video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: req.user._id,
    });
    video.comments.push(newComment._id);
    video.save();
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};

// export const postApiCommentDelete = async (req, res) => {
//   const {
//     params: { id },
//   } = req;
//   try {
//     let video = await Video.findById(id);
//     const newComment = await Comment.create({
//       text: comment,
//       creator: req.user._id,
//     });
//     video.comments.push(newComment._id);
//     video.save();
//   } catch (error) {
//     console.log(error);
//     res.status(400);
//   } finally {
//     res.end();
//   }
// };
