/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Functions */
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function checkKeyCode(e) {
  if (e.keyCode === 32) {
    togglePlay();
  }
  return;
}

function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);

  /*  Figure out why this doesnt work */
  // let currentTime = video.currentTime;
  // if (e.target.dataset.skip == -10) {
  //   currentTime -= parseFloat(10);
  //   console.log(currentTime);
  // } else if (e.target.dataset.skip == 25) {
  //   currentTime += parseFloat(25);
  //   console.log(currentTime);
  // } else return;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/* Event Listeners */
document.addEventListener('keydown', checkKeyCode);

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

toggle.addEventListener('click', togglePlay);
