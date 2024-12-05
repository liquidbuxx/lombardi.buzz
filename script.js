const tracks = [
    {
      title: "Against The Wind",
      url: "music/against the wind.mp3",
      albumArt: "music/album cover.png"
    },
    {
      title: "Stripe It",
      url: "music/stripe it.mp3",
      albumArt: "music/album cover.png"
    },
    {
        title: "beatsbreak",
        url: "music/beatsbreak.mp3",
        albumArt: "music/album cover.png"
    },
    {
        title: "Earplug",
        url: "music/earplug.mp3",
        albumArt: "music/album cover.png"
    },
    {
        title: "guitar break",
        url: "music/guitar break 10.8.24.mp3",
        albumArt: "music/album cover.png"
    },
    {
        title: "Fight Night",
        url: "music/fight night (v2.mp3",
        albumArt: "music/album cover.png"
    },
    {
        title: "Sloped Ceiling",
        url: "music/sloped ceiling (v4).mp3",
        albumArt: "music/album cover.png"
    },
    {
        title: "Part",
        url: "music/part v2 no break.mp3",
        albumArt: "music/album cover.png"
    },
    {
        title: "Rain",
        url: "music/rain.mp3",
        albumArt: "music/album cover.png"
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
  