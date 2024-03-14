// Access HTML elements
let doorImage1 = document.getElementById("door1");
let doorImage2 = document.getElementById("door2");
let doorImage3 = document.getElementById("door3");
let startButton = document.getElementById("start");

// Define paths for different door images
let botDoorPath =
  "https://content.codecademy.com/projects/chore-door/images/robot.svg";
let beachDoorPath =
  "https://content.codecademy.com/projects/chore-door/images/beach.svg";
let spaceDoorPath =
  "https://content.codecademy.com/projects/chore-door/images/space.svg";
let closedDoorPath =
  "https://content.codecademy.com/projects/chore-door/images/closed_door.svg";

// Initialize variables to track game state
let numClosedDoors = 3; // Number of closed doors at the beginning
let openDoor1;
let openDoor2;
let openDoor3;
let currentlyPlaying = true; // Flag to indicate if the game is currently in progress

// Define functions for game logic

// Check if a door has been clicked (opened)
const isClicked = (door) => {
  if (door.src === closedDoorPath) {
    return true;
  } else {
    return false;
  }
};

// Check if a door contains a bot (lost)
const isBot = (door) => {
  if (door.src === botDoorPath) {
    return true;
  } else {
    return false;
  }
};

// End the game with a win or loss message
const gameOver = (status) => {
  if (status === "win") {
    startButton.innerHTML = "You win! Play again?";
  } else {
    startButton.innerHTML = "Game over! Play again?";
  }
  currentlyPlaying = false; // Set game state to not currently playing
};

// Process opening a door and check if the game should end
const playDoor = (door) => {
  numClosedDoors--; // Decrement the number of closed doors
  if (numClosedDoors === 0) {
    // If there are no more closed doors, the player wins
    gameOver("win");
  } else if (isBot(door)) {
    // If the opened door contains a bot, the player loses
    gameOver();
  }
};

// Generate a random chore door arrangement
const randomChoreDoorGenerator = () => {
  const choreDoor = Math.floor(Math.random() * numClosedDoors); // Generate a random number between 0 and 2
  // Assign door paths based on the random number
  if (choreDoor == 0) {
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else if (choreDoor == 1) {
    openDoor1 = beachDoorPath;
    openDoor2 = botDoorPath;
    openDoor3 = spaceDoorPath;
  } else {
    openDoor1 = beachDoorPath;
    openDoor2 = spaceDoorPath;
    openDoor3 = botDoorPath;
  }
};

// Event listeners for clicking on door images

doorImage1.onclick = () => {
  if (currentlyPlaying && isClicked(doorImage1)) {
    // Check if the game is in progress and the door is clickable
    doorImage1.src = openDoor1; // Change the image source to reveal the door
    playDoor(doorImage1); // Process opening the door
  }
};

doorImage2.onclick = () => {
  if (currentlyPlaying && isClicked(doorImage2)) {
    doorImage2.src = openDoor2;
    playDoor(doorImage2);
  }
};

doorImage3.onclick = () => {
  if (currentlyPlaying && isClicked(doorImage3)) {
    doorImage3.src = openDoor3;
    playDoor(doorImage3);
  }
};

// Event listener for clicking on the start button
startButton.onclick = () => {
  if (currentlyPlaying === false) {
    // Check if the game is not currently in progress
    startRound(); // Start a new game round
  }
};

// Start a game round
const startRound = () => {
  doorImage1.src = closedDoorPath; // Reset all door images to closed state
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  numClosedDoors = 3; // Reset the number of closed doors
  currentlyPlaying = true; // Set game state to currently playing
  startButton.innerHTML = "Good Luck!"; // Update start button text
  randomChoreDoorGenerator(); // Generate a new random chore door arrangement
};

startRound(); // Start the first game round when the script is executed
