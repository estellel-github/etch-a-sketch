const DEFAULT_SIZE = 16;
const NEUTRAL_COLOR = "#FFFFFF";
const DEFAULT_COLOR = "#575757";
const DEFAULT_MODE = "unique";

let size = DEFAULT_SIZE;
let color = DEFAULT_COLOR;
let mode = DEFAULT_MODE;

const containerEl = document.querySelector("#grid");

const uniqueButtonEl = document.querySelector("#unique-button");
const rainbowButtonEl = document.querySelector("#rainbow-button");
const eraserButtonEl = document.querySelector("#eraser-button");
const sizeSliderEl = document.querySelector("#size-slider");
const sizeValueEl = document.querySelector("#size-value");
const clearButtonEl = document.querySelector("#clear-button");
const gradualButtonEl = document.querySelector("#gradual-button");

function setSize(updatedSize) {
  size = updatedSize;
}

function setMode(updatedMode) {
  mode = updatedMode;
  resetOpacity();
  applyColoring();
}

uniqueButtonEl.addEventListener("click", () => setMode("unique"));

rainbowButtonEl.addEventListener("click", () => setMode("rainbow"));

eraserButtonEl.addEventListener("click", () => setMode("eraser"));

gradualButtonEl.addEventListener("click", () => setMode("gradual"));

sizeSliderEl.addEventListener("change", (el) => {
  changeSize(el.target.value);
});

clearButtonEl.addEventListener("click", () => {
  setMode("unique");
  loadGrid();
});

function changeSize(value) {
  setSize(value);
  sizeValueEl.textContent = `${value} x ${value}`;
  loadGrid();
}

function loadGrid() {
  containerEl.innerHTML = "";
  for (let i = 1; i <= size; i++) {
    const newRowDiv = document.createElement("div");
    let rowId = "row" + i;
    newRowDiv.setAttribute("id", rowId);
    newRowDiv.classList.add("row");
    containerEl.appendChild(newRowDiv);
    for (let j = 1; j <= size; j++) {
      const newSquareDiv = document.createElement("div");
      let squareId = "square" + i + "-" + j;
      newSquareDiv.setAttribute("id", squareId);
      newSquareDiv.classList.add("grid-square");
      newRowDiv.appendChild(newSquareDiv);
      newSquareDiv.style.opacity = 1;
    }
  }
  applyColoring();
}

// https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/

function hsvToRgb(h, s, v) {
  let r, g, b;
  let i = Math.floor(h * 6);
  let f = h * 6 - i;
  let p = v * (1 - s);
  let q = v * (1 - f * s);
  let t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }

  return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
}

const generateRandomColors = (numColors) => {
  const GOLDEN_RATIO = 0.618033988749895;
  let h = Math.random();
  const colors = [];

  for (let i = 0; i < numColors; i++) {
    h += GOLDEN_RATIO;
    h %= 1;
    colors.push(hsvToRgb(h, 0.5, 0.95));
  }
  console.log(colors);
  return colors;
};

function rgbToHex(r, g, b) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

loadGrid();

function applyColoring() {
  const numColors = document.querySelectorAll(".grid-square").length;
  const colors = generateRandomColors(numColors);
  if (mode === "unique") {
    resetOpacity();
    document.querySelector("#eraser-button").disabled = false;
    document.querySelector("#rainbow-button").disabled = false;
    document.querySelector("#unique-button").disabled = true;
    document.querySelectorAll(".grid-square").forEach((item) => {
      item.addEventListener("mouseover", () => {
        item.style.backgroundColor = DEFAULT_COLOR;
      });
    });
  } else if (mode === "rainbow") {
    resetOpacity();
    document.querySelector("#eraser-button").disabled = false;
    document.querySelector("#unique-button").disabled = false;
    document.querySelector("#rainbow-button").disabled = true;
    document.querySelectorAll(".grid-square").forEach((item, index) => {
      item.addEventListener("mouseover", () => {
        const [r, g, b] = colors[index];
        const color = rgbToHex(r, g, b);
        item.style.backgroundColor = color;
      });
    });
  } else if (mode === "gradual") {
    document.querySelector("#eraser-button").disabled = false;
    document.querySelector("#unique-button").disabled = false;
    document.querySelector("#rainbow-button").disabled = false;
    document.querySelectorAll(".grid-square").forEach((item) => {
      item.addEventListener("mouseover", () => {
        let currentOpacity = parseFloat(item.style.opacity) || 0;
        currentOpacity += 0.1;
        if (currentOpacity > 1) {
          currentOpacity = 1;
        }
        item.style.opacity = currentOpacity;
        console.log(item.style.opacity);
      });
    });
  } else if (mode === "eraser") {
    document.querySelector("#eraser-button").disabled = true;
    document.querySelector("#rainbow-button").disabled = false;
    document.querySelector("#unique-button").disabled = false;
    document.querySelectorAll(".grid-square").forEach((item) => {
      item.addEventListener("mouseover", () => {
        item.style.backgroundColor = NEUTRAL_COLOR;
        resetOpacity();
      });
    });
  }
}

function resetOpacity() {
  document.querySelectorAll(".grid-square").forEach((item) => {
    item.addEventListener("mouseover", () => {
      item.style.opacity = 1;
    });
  });
}