// ==============================================
// BASIC TOUCH DETECTION EXAMPLE
// ==============================================
// This example shows how to detect when the user
// is touching the screen and display appropriate text
// 
//  CONCEPTS COVERED:
// - Touch detection (touchStarted, touchEnded)
// - Visual feedback based on user interaction
// - Basic p5.js setup and draw functions
// - Mobile gesture locking
// ==============================================

// Variables to store our current state
let isCurrentlyTouching = false;  // Track if screen is being touched
let touchCounter = 0;             // Count how many times screen has been touched
let textColor;                    // Color of the text

// ==============================================
// SETUP FUNCTION - Runs once when page loads
// ==============================================
function setup() {
    // Create a canvas that fills the entire screen
    // windowWidth and windowHeight are p5.js variables for screen size
    createCanvas(windowWidth, windowHeight);
    
    // Lock mobile gestures to prevent scrolling, zooming, etc.
    // This function comes from the mobile-p5-permissions library
    lockGestures();
    
    // Set initial text properties
    textAlign(CENTER, CENTER);  // Center the text horizontally and vertically
    textSize(48);               // Make text large enough to read on mobile
    
    // Set initial colors
    textColor = color(50, 50, 50);  // Dark gray text
}

// ==============================================
// DRAW FUNCTION - Runs continuously (like a loop)
// ==============================================
function draw() 
{
    background(200, 255, 200);
    // Clear the screen each frame
    // Change background color based on touch state
    if (isCurrentlyTouching) 
    {
        text("TOUCHED",width/2,height/2);  
    } 
    else 
    {
        text("NOT TOUCHED",width/2,height/2); 
    }
    
    // Show the touch counter at the top of the screen
    textSize(32);  // Smaller text for the counter
    text("Touch Count: " + touchCounter, width/2, 60);
    textSize(48);  // Reset to original size

}

// ==============================================
// TOUCH EVENT FUNCTIONS
// ==============================================

// This function runs when a touch begins (finger touches screen)
function touchStarted() 
{
    isCurrentlyTouching = true;
    touchCounter = touchCounter + 1;  // Add 1 to our counter each time screen is touched

}

// This function runs when a touch ends (finger lifts off screen)
function touchEnded() 
{
    isCurrentlyTouching = false;

}

// ==============================================
// MOUSE EVENTS FOR DESKTOP TESTING
// ==============================================
// These functions allow the example to work on desktop too
// for easier testing during development

function mousePressed()
{
    isCurrentlyTouching = true;
    touchCounter = touchCounter + 1;  // Add 1 to counter for desktop testing too

    
}

function mouseReleased() 
{
    isCurrentlyTouching = false;

}

// ==============================================
// WINDOW RESIZE HANDLER
// ==============================================
// This function runs when the screen orientation changes
// or the browser window is resized
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}