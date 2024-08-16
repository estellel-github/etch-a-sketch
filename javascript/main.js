const DEFAULT_SIZE = 16;
const NEUTRAL_COLOR = "#FFFFFF";
const DEFAULT_COLOR = "#575757";
const DEFAULT_MODE = "grayscale";

let size = DEFAULT_SIZE;
let color = DEFAULT_COLOR;
let mode = DEFAULT_MODE;

let isMouseDown = false;

const containerEl = document.querySelector("#grid");

const grayscaleButtonEl = document.querySelector("#grayscale-button");
const rainbowButtonEl = document.querySelector("#rainbow-button");
const eraserButtonEl = document.querySelector("#eraser-button");
const sizeSliderEl = document.querySelector("#size-slider");
const sizeValueEl = document.querySelector("#size-value");
const clearButtonEl = document.querySelector("#clear-button");

showActiveButton("grayscale");

function setSize(updatedSize) {
  size = updatedSize;
}

function setMode(updatedMode) {
  mode = updatedMode;
  showActiveButton(mode);
}

function resetAllOpacity() {
  document.querySelectorAll(".grid-square").forEach((item) => {
    resetOpacity(item);
  });
}

function resetOpacity(item) {
  item.style.opacity = null;
}

grayscaleButtonEl.addEventListener("click", () => setMode("grayscale"));

rainbowButtonEl.addEventListener("click", () => setMode("rainbow"));

eraserButtonEl.addEventListener("click", () => setMode("eraser"));

sizeSliderEl.addEventListener("change", (e) => {
  changeSize(e.target.value);
});

clearButtonEl.addEventListener("click", () => {
  setMode("grayscale");
  loadGrid();
});

function changeSize(value) {
  setSize(value);
  sizeValueEl.textContent = `${value} x ${value}`;
  loadGrid();
}

function loadGrid() {
  containerEl.innerHTML = "";
  containerEl.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  containerEl.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 1; i <= size; i++) {
    for (let j = 1; j <= size; j++) {
      const newSquareDiv = document.createElement("div");
      let squareId = "square" + i + "-" + j;
      newSquareDiv.setAttribute("id", squareId);
      newSquareDiv.classList.add("grid-square");
      containerEl.appendChild(newSquareDiv);
    }
  }
  applyColoring();
}

loadGrid();

function applyColoring() {
  const numColors = document.querySelectorAll(".grid-square").length;
  const colors = generateRandomColors(numColors);
  document.querySelectorAll(".grid-square").forEach((item, index) => {
    item.addEventListener("mousedown", () => {
      isMouseDown = true;
      colorSquare(item, index, colors);
    });
    item.addEventListener("mouseup", () => {
      isMouseDown = false;
    });
    item.addEventListener("mouseenter", () => {
      if (isMouseDown) {
        colorSquare(item, index, colors);
      }
    });
    item.addEventListener("dragstart", (e) => {
      e.preventDefault();
    });
    item.addEventListener("drop", (e) => {
      e.preventDefault();
    });
  });
  document.body.addEventListener("mouseup", () => {
    isMouseDown = false;
  });
}

function colorSquare(item, index, colors) {
  if (mode === "grayscale") {
    item.style.backgroundColor = DEFAULT_COLOR;
    applyOpacity(item);
  }
  if (mode === "rainbow") {
    const [r, g, b] = colors[index];
    item.style.backgroundColor = rgbToHex(r, g, b);
    applyOpacity(item);
  }
  if (mode === "eraser") {
    resetOpacity(item);
    item.style.backgroundColor = NEUTRAL_COLOR;
  }
}
function applyOpacity(item) {
  let currentOpacity = parseFloat(item.style.opacity) || 0;
  currentOpacity += 0.1;
  if (currentOpacity > 1) {
    currentOpacity = 1;
  }
  item.style.opacity = currentOpacity;
}

function showActiveButton(mode) {
  if (mode === "rainbow") {
    rainbowButtonEl.classList.remove("rainbow-button-inactive");
    rainbowButtonEl.classList.add("rainbow-button-active");
    grayscaleButtonEl.classList.remove("grayscale-button-active");
    eraserButtonEl.classList.remove("eraser-button-active");
    rainbowButtonEl.disabled = true;
    grayscaleButtonEl.disabled = false;
    eraserButtonEl.disabled = false;
  } else if (mode === "grayscale") {
    grayscaleButtonEl.classList.remove("grayscale-button-inactive");
    grayscaleButtonEl.classList.add("grayscale-button-active");
    rainbowButtonEl.classList.remove("rainbow-button-active");
    eraserButtonEl.classList.remove("eraser-button-active");
    rainbowButtonEl.disabled = false;
    grayscaleButtonEl.disabled = true;
    eraserButtonEl.disabled = false;
  } else if (mode === "eraser") {
    eraserButtonEl.classList.remove("eraser-button-inactive");
    eraserButtonEl.classList.add("eraser-button-active");
    rainbowButtonEl.classList.remove("rainbow-button-active");
    grayscaleButtonEl.classList.remove("grayscale-button-active");
    rainbowButtonEl.disabled = false;
    grayscaleButtonEl.disabled = false;
    eraserButtonEl.disabled = true;
  }
}
