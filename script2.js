const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");
const audio = document.getElementById("audio");

const albumArt = new Image();
albumArt.src = "music/album cover.png"; // Replace with your album art URL

let audioContext;
let analyzer;
let dataArray;

// Initialize the Web Audio API
function setupAudioContext() {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const source = audioContext.createMediaElementSource(audio);
  analyzer = audioContext.createAnalyser();
  analyzer.fftSize = 256;
  source.connect(analyzer);
  analyzer.connect(audioContext.destination);

  dataArray = new Uint8Array(analyzer.frequencyBinCount);
}

// Draw the visualizer
function drawVisualizer() {
  const width = canvas.width;
  const height = canvas.height;

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Get audio data
  analyzer.getByteFrequencyData(dataArray);

  // Calculate average frequency for warping intensity
  const avgFrequency = dataArray.reduce((sum, val) => sum + val, 0) / dataArray.length;

  // Draw album art with distortion
  const distortion = avgFrequency / 20; // Adjust distortion intensity
  const scaleX = 1 + distortion * 0.02;
  const scaleY = 1 - distortion * 0.01;

  const drawWidth = width * scaleX;
  const drawHeight = height * scaleY;
  const offsetX = (width - drawWidth) / 2;
  const offsetY = (height - drawHeight) / 2;

  ctx.drawImage(albumArt, offsetX, offsetY, drawWidth, drawHeight);

  requestAnimationFrame(drawVisualizer);
}

// Start visualizer on audio play
audio.addEventListener("play", () => {
  if (!audioContext) setupAudioContext();
  audioContext.resume();
  drawVisualizer();
});

// Load the album art and draw the initial canvas
albumArt.onload = () => {
  ctx.drawImage(albumArt, 0, 0, canvas.width, canvas.height);
};
