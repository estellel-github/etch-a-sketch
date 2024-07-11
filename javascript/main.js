const containerEl = document.querySelector("#container");

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

const colorOnHover = () => {
  document.querySelectorAll(".grid-square").forEach((item) => {
    item.addEventListener("mouseover", (event) => {
      item.classList.add("grid-square-colored");
    });
  });
};

updateGrid(16);

const applyUserInput = () => {
  const inputFormEl = document.querySelector("#input-form");
  const lengthInputEl = document.querySelector("#length-input");
  inputFormEl.addEventListener("submit", (event) => {
    event.preventDefault();
    numInput = Number(lengthInputEl.value);
    if (numInput < 2 || numInput > 100 || typeof numInput !== "number") {
      alert("Please input a valid number from 2 to 100.");
    }
    else {
    const length = Number(lengthInputEl.value) || 16;
    updateGrid(length);
    }
    lengthInputEl.value = "";
  });
};

applyUserInput();