// ======================================
// App State
// ======================================
let appState = "title";

// ======================================
// Audio
// ======================================
let welcomeSound;
let clickSound;
let audioStarted = false;

// ======================================
// Videos & Images
// ======================================
let bgTitleVid;
let logoVid;

let instructionBg;
let instructionVid;

let titleBtnImg;

// ======================================
// Invisible Buttons
// ======================================

// Title page invisible button
let titleBtnX = 390;
let titleBtnY = 650;
let titleBtnW = 300;
let titleBtnH = 160;

// Instruction page buttons
let topBtnX, topBtnY, topBtnW, topBtnH;
let bottomBtnY = 700;

// ======================================
// Preload (ONLY asset loading)
// ======================================
function preload() {

  // ----- Audio -----
  welcomeSound = loadSound("/nine_lights_final/audio/welcome_page_.mp3");
  clickSound = loadSound("/nine_lights_final/audio/clicking_sound.mp3");

  // ----- Title page -----
  bgTitleVid = createVideo("/nine_lights_final/title_page/welcome_page.webm");
  bgTitleVid.hide();
  bgTitleVid.volume(0);
  bgTitleVid.attribute("muted", "");

  logoVid = createVideo("/nine_lights_final/title_page/title_page.webm");
  logoVid.hide();
  logoVid.volume(0);
  logoVid.attribute("muted", "");

  titleBtnImg = loadImage("/nine_lights_final/title_page/button_title_page.png");

  // ----- Instruction page -----
  instructionBg = loadImage("/nine_lights_final/general_instruction/instruction_page.jpg");

  instructionVid = createVideo("/nine_lights_final/general_instruction/general_instruction.webm");
  instructionVid.hide();
  instructionVid.volume(0);
  instructionVid.attribute("muted", "");
}

// ======================================
// Setup
// ======================================
function setup() {
  createCanvas(1080, 900);

  bgTitleVid.loop();
  logoVid.loop();
  instructionVid.loop();

  // Set volumes
  welcomeSound.setVolume(0.35);
  clickSound.setVolume(0.6);

  // Instruction page back button
  topBtnW = 150;
  topBtnH = 150;
  topBtnX = 20;
  topBtnY = 20;
}

// ======================================
// Audio starter (called once)
// ======================================
function startWelcomeAudio() {
  if (!audioStarted) {
    userStartAudio();      // unlock browser audio
    welcomeSound.loop();   // ambient loop
    audioStarted = true;
  }
}

// ======================================
// Click sound helper (prevents overlap)
// ======================================
function playClick() {
  if (clickSound.isPlaying()) {
    clickSound.stop();
  }
  clickSound.play();
}

// ======================================
// Draw
// ======================================
function draw() {
  if (appState === "title") {
    drawTitlePage();
  } else if (appState === "instruction") {
    drawInstructionPage();
  }
}

// ======================================
// Title Page
// ======================================
function drawTitlePage() {

  image(bgTitleVid, 0, 0, width, height);

  image(
    logoVid,
    width / 2 - logoVid.width / 2,
    height / 2 - logoVid.height / 2
  );

  // Blinking button (soft pulse)
  let alpha = map(
    sin(frameCount * 0.08),
    -1, 1,
    120, 255
  );

  push();
  tint(255, alpha);
  image(titleBtnImg, 0, 0);
  pop();

  // ---- DEBUG (optional) ----
  // noFill();
  // stroke(255, 0, 0);
  // rect(titleBtnX, titleBtnY, titleBtnW, titleBtnH);
}

// ======================================
// Instruction Page
// ======================================
function drawInstructionPage() {

  image(instructionBg, 0, 0, width, height);

  image(
    instructionVid,
    width / 2 - instructionVid.width / 2,
    height / 2 - instructionVid.height / 2
  );
}

// ======================================
// Mouse Interaction
// ======================================
function mousePressed() {

  // Start ambient sound on first interaction
  startWelcomeAudio();

  // ----- TITLE PAGE -----
  if (appState === "title") {

    if (
      mouseX > titleBtnX &&
      mouseX < titleBtnX + titleBtnW &&
      mouseY > titleBtnY &&
      mouseY < titleBtnY + titleBtnH
    ) {
      playClick();
      appState = "instruction";
      return;
    }
  }

  // ----- INSTRUCTION PAGE -----
  else if (appState === "instruction") {

    // Back to title
    if (
      mouseX > topBtnX &&
      mouseX < topBtnX + topBtnW &&
      mouseY > topBtnY &&
      mouseY < topBtnY + topBtnH
    ) {
      playClick();
      appState = "title";
      return;
    }

    // Go to Ritual 01
    if (
      mouseX > 0 &&
      mouseX < width &&
      mouseY > bottomBtnY &&
      mouseY < height
    ) {
      playClick();
      window.location.href = "/nine_lights_final/ritual_01/index.html";
      return;
    }
  }
}
