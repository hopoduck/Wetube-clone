import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
// const deleteCommentBtn = document.getElementById("jsDeleteComment");
const commentList = document.getElementById("jsCommentList");
const commentCount = document.getElementById("jsCommentCount");
const commentEnd = document.getElementById("jsCommentEnd");

const addComment = (comment) => {
  const div = document.createElement("div");
  div.classList.add("comment");
  div.setAttribute("data-id", "attributevalue");
  div.innerHTML = comment;
  commentList.prepend(div);
  commentCount.innerHTML = parseInt(commentCount.innerHTML) + 1;
  if (parseInt(commentCount.innerHTML) + 1 === 0 || parseInt(commentCount.innerHTML) + 1 === 1) {
    commentEnd.innerHTML = "&nbsp;comment";
  } else {
    commentEnd.innerHTML = "&nbsp;comments";
  }
};

const deleteComment = (event, comment) => {};

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
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
  // deleteCommentBtn
}

if (addCommentForm) {
  init();
}
