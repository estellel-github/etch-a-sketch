const container = document.querySelector("#container");

let numRows = 16;
let numCols = 16;

for (let i = 1; i <= numRows; i++) {
  const newRowDiv = document.createElement("div");
  let rowId = "row" + i;
  newRowDiv.setAttribute("id", rowId);
  newRowDiv.classList.add("row");
  container.appendChild(newRowDiv);
  for (let j = 1; j <= numCols; j++) {
  const newSquareDiv = document.createElement("div");
  let squareId = "square" + i + "-" + j;
  newSquareDiv.setAttribute("id", squareId);
  newSquareDiv.classList.add("grid-square");
  newRowDiv.appendChild(newSquareDiv);
  newSquareDiv.addEventListener("mouseover", (event) => {
    newSquareDiv.classList.add("grid-square-colored");
  });
  }
}
