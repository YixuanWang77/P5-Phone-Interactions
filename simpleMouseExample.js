// Global variables to store our audio files
// We declare these at the top so they can be accessed by all functions
let audioTrack1;
let audioTrack2;

// Global variables for audio level detection
// Amplitude analyzes the volume level of audio in real-time
let amplitude1;
let amplitude2;

// Global variable to track which track is currently playing
// This prevents multiple tracks from playing simultaneously
let currentTrack = false;

// Global variable to track the last mouse side
// This prevents retriggering when mouse stays on the same side
let lastMouseSide = false;

// Global variable to track if audio context has been started
// Modern browsers require user interaction before playing audio
let audioStarted = false;

// Global variable to track if audio is currently paused by user
// This allows toggling pause/play with clicks after initial activation
let audioPaused = false;

// preload() function runs BEFORE setup()
// This is the best place to load external assets like images, sounds, or fonts
// p5.js will wait for all preload operations to complete before moving to setup()
function preload() {
  // Load both audio files from the tracks folder
  // The paths are relative to where our HTML file is located
  audioTrack1 = loadSound('tracks/audio1.mp3');
  audioTrack2 = loadSound('tracks/audio2.mp3');
  
  // Note: Audio files must be loaded in preload() to ensure they're ready
  // Modern browsers require user interaction before playing audio
}

// setup() runs once after preload() is complete
// This is where we configure our canvas and initial settings
function setup() {
  // Create a canvas that's 800 pixels wide and 400 pixels tall
  createCanvas(400, 850);
  
  // Set the background to a dark color
  background(50);
  
  // Set text properties for displaying instructions
  textAlign(CENTER, CENTER);
  textSize(16);
  fill(255);
  
  // Set the volume of both audio tracks (0.0 to 1.0)
  audioTrack1.setVolume(0.7);
  audioTrack2.setVolume(0.7);
  
  // Set both tracks to loop continuously
  audioTrack1.loop();
  audioTrack2.loop();
  // Pause them initially (they will start looped when played)
  audioTrack1.pause();
  audioTrack2.pause();
  
  // Create amplitude objects to analyze audio levels for both tracks
  amplitude1 = new p5.Amplitude();
  amplitude2 = new p5.Amplitude();
  // Connect the amplitude analyzers to our audio tracks
  amplitude1.setInput(audioTrack1);
  amplitude2.setInput(audioTrack2);
}


function draw() {
  // Clear the background each frame
  background(50);
  
  // Show instruction text if audio context hasn't been started yet
  if (!audioStarted) {
    fill(255, 255, 0); // yellow text
    textSize(24);
    text("Click anywhere to start", width/2, height/2);
    return; // don't draw anything else until audio is started
  }
  
  // Show pause/play instruction
  fill(255, 255, 0); // yellow text
  textSize(12);
  if (audioPaused) {
    text("Click to resume audio", width/2, 30);
  } else {
    text("Click to pause audio", width/2, 30);
  }
  
  // Draw a horizontal line to divide the canvas in half
  stroke(255);
  strokeWeight(2);
  line(0, height/2, width, height/2);
  
  // Determine which half of the screen the mouse is on
  // 0 = top half, 1 = bottom half
  let mouseSide;
  if (mouseY < height/2) {
    mouseSide = 0; // top half
  } else {
    mouseSide = 1; // bottom half
  }
  
  // KEY CONCEPT: Only trigger audio changes when mouse side actually changes
  // This prevents constantly restarting audio while mouse stays on same side
  // Also check if audio is not paused by user
  if (mouseSide !== lastMouseSide && !audioPaused) {
    // Stop any currently playing track
    if (currentTrack) {
      currentTrack.stop();
      currentTrack = false;
    }
    
    // Start the appropriate track based on mouse position
    if (mouseSide === 0) { // top half
      audioTrack1.play();
      currentTrack = audioTrack1;
    } else { // bottom half (mouseSide === 1)
      audioTrack2.play();
      currentTrack = audioTrack2;
    }
    
    // Update the last mouse side to prevent retriggering
    lastMouseSide = mouseSide;
  }
  

  
  // Visual audio level feedback for track 1
  if (audioTrack1.isPlaying() && !audioPaused) {
    let level1 = amplitude1.getLevel();
    let circleSize1 = map(level1, 0, 0.3, 30, 100);
    fill(100, 150, 255, 150);
    noStroke();
    ellipse(width/2, height/4, circleSize1, circleSize1);
    

  } else if (audioPaused && currentTrack === audioTrack1) {
    // Show static circle when paused
    fill(100, 150, 255, 100);
    noStroke();
    ellipse(width/2, height/4, 50, 50);
    fill(255);
    text("PAUSED", width/2, height/4 + 60);
  }
  
  // Visual audio level feedback for track 2
  if (audioTrack2.isPlaying() && !audioPaused) {
    let level2 = amplitude2.getLevel();
    let circleSize2 = map(level2, 0, 0.3, 30, 100);
    fill(255, 150, 100, 150);
    noStroke();
    ellipse(width/2, 3*height/4, circleSize2, circleSize2);
    

  } else if (audioPaused && currentTrack === audioTrack2) {
    // Show static circle when paused
    fill(255, 150, 100, 100);
    noStroke();
    ellipse(width/2, 3*height/4, 50, 50);
    fill(255);
    text("PAUSED", width/2, 3*height/4 + 60);
  }
  
}

// Mouse release to start audio context (required by browsers)
// This function runs when the mouse is released
function mouseReleased() {
  // Start the audio context on first user interaction
  if (!audioStarted) {
    userStartAudio();
    audioStarted = true;
  } else {
    // After initial activation, toggle pause/play state
    audioPaused = !audioPaused;
    
    if (audioPaused) {
      // Pause all audio
      audioTrack1.pause();
      audioTrack2.pause();
    } else {
      // Resume based on current mouse position
      let mouseSide = mouseY < height/2 ? 0 : 1;
      if (mouseSide === 0) {
        audioTrack1.play();
        currentTrack = audioTrack1;
      } else {
        audioTrack2.play();
        currentTrack = audioTrack2;
      }
      lastMouseSide = mouseSide;
    }
  }
}
