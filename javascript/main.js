const container = document.querySelector("#container");

let gridLength = 16;

for (let i = 1; i <= gridLength; i++) {
  for (let j = 1; j <= gridLength; j++) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("grid-square");
  container.appendChild(newDiv);
  }
}