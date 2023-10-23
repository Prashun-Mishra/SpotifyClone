let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressbar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songitem"));

let songs = [
  {
    songName: "Let me down slowly",
    filePath: "songs/1.mp3",
    coverPath: "songimage/song1.jpg",
  },
  {
    songName: "Perfect",
    filePath: "songs/2.mp3",
    coverPath: "songimage/song-2.jpeg",
  },
  {
    songName: "Mokingbird",
    filePath: "songs/3.mp3",
    coverPath: "songimage/song-3.jpg",
  },
  {
    songName: "Let me Love You",
    filePath: "songs/4.mp3",
    coverPath: "songimage/song-4.jpg",
  },
  {
    songName: "Night Changes",
    filePath: "songs/5.mp3",
    coverPath: "songimage/song-5.jpg",
  },
  {
    songName: "Let Her Go",
    filePath: "songs/6.mp3",
    coverPath: "songimage/song-6.jpg",
  },
  {
    songName: "Treat You Better",
    filePath: "songs/7.mp3",
    coverPath: "songimage/song-7.jpg",
  },
  {
    songName: "Stay",
    filePath: "songs/8.mp3",
    coverPath: "songimage/song-8.jpg",
  },
  {
    songName: "Die For You",
    filePath: "songs/9.mp3",
    coverPath: "songimage/song-9.jpeg",
  },
  {
    songName: "Until I Found You",
    filePath: "songs/10.mp3",
    coverPath: "songimage/song-10.jpg",
  },
];
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
});

masterPlay.addEventListener("click", () => {
  if (audioElement.paused) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
});

audioElement.addEventListener("ended", () => {
  masterPlay.classList.remove("fa-pause-circle");
  masterPlay.classList.add("fa-play-circle");
  gif.style.opacity = 0;
});

audioElement.addEventListener("timeupdate", () => {
  if (isFinite(audioElement.duration)) {
    let progress = parseInt(
      (audioElement.currentTime / audioElement.duration) * 100
    );
    myProgressBar.value = progress;
  }
});
myProgressBar.addEventListener("change", () => {
  if (isFinite(audioElement.duration)) {
    audioElement.currentTime =
      (myProgressBar.value * audioElement.duration) / 100;
  }
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songitemsplay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};

Array.from(document.getElementsByClassName("songitemsplay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();

      songIndex = parseInt(e.target.id);
      if (songIndex >= 0 && songIndex < songs.length) {
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");

        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;

        if (audioElement.paused) {
          audioElement.play();
          masterPlay.classList.remove("fa-play-circle");
          masterPlay.classList.add("fa-pause-circle");
          gif.style.opacity = 1;
        } else {
          audioElement.pause();
          masterPlay.classList.remove("fa-pause-circle");
          masterPlay.classList.add("fa-play-circle");
          gif.style.opacity = 0;
        }
      }
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex < songs.length - 1) {
    songIndex += 1;
  } else {
    songIndex = 0;
  }
  playSong(songIndex);
  updatePlayPauseButtons(songIndex);
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex > 0) {
    songIndex -= 1;
  } else {
    songIndex = songs.length - 1;
  }
  playSong(songIndex);
  updatePlayPauseButtons(songIndex);
});

function updatePlayPauseButtons(index) {
  makeAllPlays();

  const playButton = document.getElementById(index);
  if (playButton) {
    playButton.classList.remove("fa-play-circle");
    playButton.classList.add("fa-pause-circle");
  }
  if (masterPlay) {
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
  }
}

function playSong(index) {
  audioElement.src = songs[index].filePath;
  masterSongName.innerText = songs[index].songName;

  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
}
