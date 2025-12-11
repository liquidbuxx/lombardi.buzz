const tracks = [
    {
      title: "Advantage",
      url: "music/IX/01. advantage.mp3",
      albumArt: "music/IX/cover.png"
    },
    {
      title: "Coo",
      url: "music/IX/02. coo.mp3",
      albumArt: "music/IX/cover.png"
    },
    {
        title: "No Shame In the Game",
        url: "music/IX/03. no shame in the game.mp3",
        albumArt: "music/IX/cover.png"
    },
    {
        title: "Run It Up",
        url: "music/IX/04. run it up.mp3",
        albumArt: "music/IX/cover.png"
    },
    {
        title: "Brain",
        url: "music/IX/05. brain.mp3",
        albumArt: "music/IX/cover.png"
    },
    {
        title: "Matchbook",
        url: "music/IX/06. matchbook.mp3",
        albumArt: "music/IX/cover.png"
    },
    {
        title: "Sorry Anymore",
        url: "music/IX/07. sorry anymore.mp3",
        albumArt: "music/IX/cover.png"
    },
    {
        title: "Come Up For Air",
        url: "music/IX/08. come up for air.mp3",
        albumArt: "music/IX/cover.png"
    },
    {
        title: "Index Cards",
        url: "music/IX/09. index cards.mp3",
        albumArt: "music/IX/cover.png"
    }
    {
        title: "Village",
        url: "music/IX/10. village.mp3",
        albumArt: "music/IX/cover.png"
    }{
        title: "Video Camera",
        url: "music/IX/11. video camera.mp3",
        albumArt: "music/IX/cover.png"
    }
  ];
  
  const audio = new Audio();
  let currentTrackIndex = 0;
  
  const playPauseButton = document.getElementById("play-pause");
  const progressBar = document.getElementById("progress");
  const albumArt = document.getElementById("album-art");
  const trackTitle = document.getElementById("track-title");
  const trackArtist = document.getElementById("track-artist");
  const playlist = document.getElementById("playlist");
  
  function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.url;
    albumArt.src = track.albumArt;
    trackTitle.textContent = track.title;
  }
  
  function playPause() {
    if (audio.paused) {
      audio.play();
      playPauseButton.textContent = "⏸";
    } else {
      audio.pause();
      playPauseButton.textContent = "▶";
    }
  }
  
  function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
  }
  
  function prevTrack() {
    currentTrackIndex =
      (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
  }
  
  function updateProgress() {
    progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
  }
  
  function seek(event) {
    const seekTime = (event.target.value / 100) * audio.duration;
    audio.currentTime = seekTime;
  }
  
  tracks.forEach((track, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${track.title}`;
    listItem.addEventListener("click", () => {
      currentTrackIndex = index;
      loadTrack(currentTrackIndex);
      audio.play();
    });
    playlist.appendChild(listItem);
  });
  
  playPauseButton.addEventListener("click", playPause);
  document.getElementById("next").addEventListener("click", nextTrack);
  document.getElementById("prev").addEventListener("click", prevTrack);
  progressBar.addEventListener("input", seek);
  audio.addEventListener("timeupdate", updateProgress);
  
  // Load the first track
  loadTrack(currentTrackIndex);
  