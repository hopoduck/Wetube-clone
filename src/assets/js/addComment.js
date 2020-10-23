import axios from "axios";
import routes from "../../routes";

const addCommentForm = document.getElementById("jsAddComment");
const deleteCommentBtns = document.querySelectorAll(".deleteBtn");
const commentList = document.getElementById("jsCommentList");
// const commentCount = document.getElementById("jsCommentCount");
// const commentEnd = document.getElementById("jsCommentEnd");

const addComment = (comment) => {
  const div = document.createElement("div");
  div.classList.add("comment");
  div.classList.add("mycomment");
  div.setAttribute("data-id", "attributevalue");
  div.innerHTML = comment;
  commentList.prepend(div);
  // commentCount.innerHTML = parseInt(commentCount.innerHTML) + 1;
  // if (parseInt(commentCount.innerHTML) + 1 === 0 || parseInt(commentCount.innerHTML) + 1 === 1) {
  //   commentEnd.innerHTML = "&nbsp;comment";
  // } else {
  //   commentEnd.innerHTML = "&nbsp;comments";
  // }
};

// const deleteComment = async (event, comment) => {
//   const id = event.target.getAttribute("data-id");
//   fetch(rotues.api + routes.apiCommentDelete(id), {
//     method: "POST",
//   });
// };

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  console.log(routes.api + routes.apiCommentAdd(videoId));
  const response = await axios({
    url: routes.api + routes.apiCommentAdd(videoId),
    method: "POST",
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    console.log(response);
    addComment(comment);
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  deleteCommentBtns.forEach((d) => {
    d.addEventListener("click", deleteComment);
  });
  // deleteCommentBtns
}

if (addCommentForm) {
  init();
}
