import routes from "../../routes";

const videoContainer = document.getElementById("jsVideoContainer");
const videoPlayer = document.getElementById("jsVideo");
const videoController = document.getElementById("jsVideoController");

const playBtn = document.getElementById("jsPlayButton");
const videoTimer = document.getElementById("jsVideoTimer");
const videoTime = document.getElementById("jsVideoTime");
const volumeBtn = document.getElementById("jsVoulmeIcon");
const volumeRange = document.getElementById("jsVoulmeRange");
const fullScreenBtn = document.getElementById("jsFullScreen");

let totalTime;
let currentTime;
let check;

function handleFullScreenClick() {
  if (!document.fullscreenElement) {
    videoContainer.requestFullscreen();
    fullScreenBtn.innerHTML = `<i class="fas fa-compress"></i>`;
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      fullScreenBtn.innerHTML = `<i class="fas fa-expand"></i>`;
    }
  }
}

function timeFormater(seconds) {
  const secondsNumber = parseInt(seconds, 10);
  let minutes = Math.floor(secondsNumber / 60);
  let totalSeconds = secondsNumber - minutes * 60;
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${minutes}:${totalSeconds}`;
}

function handlePlayBtn() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
  }
}

function setTotalTime() {
  totalTime = Math.floor(videoPlayer.duration);
  videoTimer.value = totalTime;
  totalTime = timeFormater(totalTime);
  videoTimer.min = 0;
  videoTimer.max = Math.floor(videoPlayer.duration);
  setCurrentTime();
}

function setCurrentTime() {
  setInterval(() => {
    currentTime = Math.floor(videoPlayer.currentTime);
    videoTimer.value = currentTime;
    currentTime = timeFormater(currentTime);
    videoTime.innerHTML = `${currentTime} / ${totalTime}`;
  }, 500);
}

function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeRange.value = videoPlayer.volume;
    handleVolumeDrag(videoPlayer.volume);
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = `<i class="fas fa-volume-mute"></i>`;
    volumeRange.value = 0;
  }
}

function handleVolumeDrag(value) {
  videoPlayer.volume = volumeRange.value;
  if (value >= 0.7) {
    volumeBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
  } else if (value >= 0.4) {
    volumeBtn.innerHTML = `<i class="fas fa-volume"></i>`;
  } else if (value == 0) {
    volumeBtn.innerHTML = `<i class="fas fa-volume-mute"></i>`;
  } else {
    volumeBtn.innerHTML = `<i class="fas fa-volume-down"></i>`;
  }
}

function handleSliderDrag() {
  videoPlayer.currentTime = videoTimer.value;
  currentTime = timeFormater(videoTimer.value);
  videoTime.innerHTML = `${currentTime} / ${totalTime}`;
}

function handleKeyboardInput(event) {
  if (event.key === " ") {
    event.preventDefault();
    handlePlayBtn();
  }
}

function handleMouseMove() {
  videoController.classList.add("visible");
  videoPlayer.style.cursor = "default";
  clearTimeout(check);
  check = setTimeout(() => {
    videoController.classList.remove("visible");
    videoPlayer.style.cursor = "none";
  }, 3000);
}

function handleEnded() {
  videoPlayer.currentTime = 0;
  videoPlayer.play();
  const id = window.location.href.split("videos")[1];
  console.log(`${routes.api}${id}/views`);
  fetch(`${routes.api}${id}/views`, {
    method: "POST",
  });
}

function init() {
  playBtn.addEventListener("click", handlePlayBtn);
  videoPlayer.addEventListener("click", handlePlayBtn);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  volumeBtn.addEventListener("click", handleVolumeClick);
  volumeRange.addEventListener("input", handleVolumeDrag);
  videoTimer.addEventListener("change", handleSliderDrag);
  document.addEventListener("keydown", handleKeyboardInput);
  videoPlayer.addEventListener("mousemove", handleMouseMove);
  videoController.addEventListener("mousemove", handleMouseMove);
  videoPlayer.addEventListener("ended", handleEnded);

  fullScreenBtn.addEventListener("click", handleFullScreenClick);
}

if (videoPlayer) {
  init();
}
