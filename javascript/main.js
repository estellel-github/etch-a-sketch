const containerEl = document.querySelector("#grid-container");

const colorOnHover = () => {
  const colorOptionEl = document.querySelector("#color-input");
  if (colorOptionEl.value === "unique" || colorOptionEl.value === "undefined" ) {
    return uniqueColorOnHover();
  }
  else if (colorOptionEl.value === "random") {
    return randomColorOnHover();
  }
}

const uniqueColorOnHover = () => {
  document.querySelectorAll(".grid-square").forEach((item) => {
    item.addEventListener("mouseover", (event) => {
      item.classList.add("grid-square-colored");
    });
  });
};


const updateGrid = (length) => {
  containerEl.innerHTML = "";
  for (let i = 1; i <= length; i++) {
    const newRowDiv = document.createElement("div");
    let rowId = "row" + i;
    newRowDiv.setAttribute("id", rowId);
    newRowDiv.classList.add("row");
    containerEl.appendChild(newRowDiv);
    for (let j = 1; j <= length; j++) {
      const newSquareDiv = document.createElement("div");
      let squareId = "square" + i + "-" + j;
      newSquareDiv.setAttribute("id", squareId);
      newSquareDiv.classList.add("grid-square");
      newRowDiv.appendChild(newSquareDiv);
    }
  }
  colorOnHover();
};

updateGrid(16);

// https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/

function hsvToRgb(h, s, v) {
  let r, g, b;
  let i = Math.floor(h * 6);
  let f = h * 6 - i;
  let p = v * (1 - s);
  let q = v * (1 - f * s);
  let t = v * (1 - (1 - f) * s);

  switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
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
}

function rgbToHex(r, g, b) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

const applyUserInput = () => {
  const inputFormEl = document.querySelector("#user-input");
  const lengthInputEl = document.querySelector("#length-input");
  inputFormEl.addEventListener("submit", (event) => {
    event.preventDefault();
    numInput = Number(lengthInputEl.value);
    if (numInput < 2 || numInput > 100 || typeof numInput !== "number") {
      alert("Please input a valid number from 2 to 100.");
    }
    else {
    const length = numInput || 16;
    updateGrid(length);
  }
  lengthInputEl.value = "";
  });
};

applyUserInput();