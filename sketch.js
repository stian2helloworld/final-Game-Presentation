let appState = "title";

let bgTitleVid;
let logoVid;

let instructionBg;
let instructionVid;

let topBtnX, topBtnY, topBtnW, topBtnH;

// ⭐ Title page full-size button (1080×900 PNG)
let titleBtnImg;

function preload() {
  // Title background VIDEO
  bgTitleVid = createVideo("/nine_lights_final/title_page/welcome_page.webm");
  bgTitleVid.hide();
  bgTitleVid.volume(0);
  bgTitleVid.attribute("muted", "");

  // Title logo video
  logoVid = createVideo("/nine_lights_final/title_page/title_page-1.webm");
  logoVid.hide();
  logoVid.volume(0);
  logoVid.attribute("muted", "");

  // ⭐ Load full-size button image
  titleBtnImg = loadImage("/nine_lights_final/title_page/button_title_page.png");

  // Instruction background
  instructionBg = loadImage("/nine_lights_final/general_instruction/instruction_page.jpg");

  // Instruction video
  instructionVid = createVideo("/nine_lights_final/general_instruction/general_instruction.webm");
  instructionVid.hide();
  instructionVid.volume(0);
  instructionVid.attribute("muted", "");
}

function setup() {
  createCanvas(1080, 900);

  bgTitleVid.loop();
  logoVid.loop();
  instructionVid.loop();

  // Back button for instruction page
  topBtnW = 150;
  topBtnH = 150;
  topBtnX = 20;
  topBtnY = 20;
}

function draw() {
  if (appState === "title") {
    drawTitlePage();
  } 
  else if (appState === "instruction") {
    drawInstructionPage();
  }
}

function drawTitlePage() {
  // Background video
  image(bgTitleVid, 0, 0, width, height);

  // Logo video
  image(
    logoVid,
    width / 2 - logoVid.width / 2,
    height / 2 - logoVid.height / 2
  );

  // ⭐ Full-size button overlay (1080×900 PNG)
  // This will appear on top of the background & logo
  image(titleBtnImg, 0, 0);
}

function drawInstructionPage() {
  image(instructionBg, 0, 0, width, height);
  image(
    instructionVid,
    width / 2 - instructionVid.width / 2,
    height / 2 - instructionVid.height / 2
  );
}

function mousePressed() {

  // ===== TITLE PAGE (click anywhere on the PNG) =====
  if (appState === "title") {

    // ⭐ Entire 1080×900 PNG is clickable
    if (mouseX >= 0 && mouseX <= width &&
        mouseY >= 0 && mouseY <= height) {

      appState = "instruction";
      return;
    }
  }

  // ===== INSTRUCTION PAGE =====
  else if (appState === "instruction") {

    // Back button
    if (
      mouseX > topBtnX && mouseX < topBtnX + topBtnW &&
      mouseY > topBtnY && mouseY < topBtnY + topBtnH
    ) {
      appState = "title";
      return;
    }

    // Bottom button → Ritual 01
    if (
      mouseX > 0 && mouseX < width &&
      mouseY > height - 200 && mouseY < height
    ) {
      window.location.href = "/nine_lights_final/ritual_01/index.html";
      return;
    }
  }
}
