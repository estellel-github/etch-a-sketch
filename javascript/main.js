const container = document.querySelector("#container");

let gridLength = 16;

for (let i = 1; i <= gridLength; i++) {
  const newRowDiv = document.createElement("div");
  let rowId = "row" + i;
  newRowDiv.setAttribute("id", rowId);
  container.appendChild(newRowDiv);
  for (let j = 1; j <= gridLength; j++) {
  const newColDiv = document.createElement("div");
  let squareId = "square" + i + "-" + j;
  newColDiv.setAttribute("id", squareId);
  newColDiv.classList.add("grid-square");
  newRowDiv.appendChild(newColDiv);
  }
}