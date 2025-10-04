// MINIMAL VERSION - Orientation Basic
// No visual feedback - data displayed in debug panel only
// Demonstrates: Reading device orientation (rotationX, rotationY, rotationZ)

function setup() 
{
    createCanvas(windowWidth, windowHeight);
    
    // Show debug panel FIRST
    showDebug();
    
    // Enable motion sensors with tap permission (iOS)
    enableGyroTap();
    
    // Lock mobile gestures
    lockGestures();
    
    debug("Orientation Basic - Minimal Version");
    debug("Tilt your device to see orientation values");
    debug("Waiting for sensor data...");
}

function draw() 
{
    // No visual feedback in minimal version
    
    // Check if motion sensors are enabled
    if (window.sensorsEnabled) 
    {
        // Get current orientation values
        let rx = rotationX;
        let ry = rotationY;
        let rz = rotationZ;
        
        // Output to debug panel
        debug("--- Device Orientation ---");
        debug("Rotation X (Tilt Forward/Back): " + int(rx) + "°");
        debug("Rotation Y (Tilt Left/Right): " + int(ry) + "°");
        debug("Rotation Z (Turn/Compass): " + int(rz) + "°");
        
        // Add helpful descriptions
        if (rx > 10) debug("  Tilted BACKWARD");
        else if (rx < -10) debug("  Tilted FORWARD");
        
        if (ry > 10) debug("  Tilted RIGHT");
        else if (ry < -10) debug("  Tilted LEFT");
    }
    else 
    {
        debug("Waiting for sensor permissions...");
        debug("Tap the screen to enable sensors");
    }
}