// script.js

document.addEventListener("DOMContentLoaded", function () {
    const songList = document.querySelector(".song-list");
    const albumArt = document.querySelector(".album-art");
    const playPauseButton = document.getElementById("playPause");
    const stopButton = document.getElementById("stop");
    const progressBar = document.querySelector(".progress-bar");
  
    let currentSong = null;
    let isPlaying = false;
  
    songList.addEventListener("click", function (event) {
        if (event.target.classList.contains("song-list-item")) {
          const selectedSong = event.target.dataset.song;
          loadSong(selectedSong);
          playPause();
          updateUI(selectedSong);
        }
      });
      
      function loadSong(song) {
        if (currentSong) {
          currentSong.pause();
        }
      
        currentSong = new Audio(song);
        currentSong.addEventListener("loadedmetadata", function () {
          updateUI(song);
        });
      }
      
      function updateUI(song) {
        const albumArt = document.querySelector(".album-art");
        let artworkUrl;
      
        // Set the artwork URL based on the selected song
        if (song === "path/to/song1.mp3") {
          artworkUrl = 'url("https://i1.sndcdn.com/artworks-zCsXbJrCDMQGucaj-3HAuoA-t500x500.jpg")';
        } else if (song === "path/to/song2.mp3") {
          artworkUrl = 'url("https://i1.sndcdn.com/artworks-DAwnElNmDWPWy5Zf-X7g0tA-t200x200.jpg")';
        }
      
        albumArt.style.backgroundImage = artworkUrl;
        albumArt.style.backgroundSize = 'cover';
      }
  
    function playPause() {
      if (currentSong) {
        if (isPlaying) {
          currentSong.pause();
        } else {
          currentSong.play();
        }
        isPlaying = !isPlaying;
        updatePlayPauseButton();
      }
    }
  
    function updatePlayPauseButton() {
      playPauseButton.innerHTML = isPlaying ? "⏸ Pause" : "▶️ Play";
    }
  
    playPauseButton.addEventListener("click", playPause);
  
    stopButton.addEventListener("click", function () {
      if (currentSong) {
        currentSong.pause();
        currentSong.currentTime = 0;
        isPlaying = false;
        updatePlayPauseButton();
      }
    });
  
    currentSong.addEventListener("timeupdate", function () {
      const progress = (currentSong.currentTime / currentSong.duration) * 100;
      progressBar.style.width = progress + "%";
    });
  });
  