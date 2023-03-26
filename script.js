const grid = document.getElementById("grid");

const sliderLabel = document.querySelector(".slider-label");
let slider = document.querySelector(".slider");

const gridItem = getComputedStyle(document.documentElement)
.getPropertyValue('--color-light-gray');

//createGrid
function createGrid(size) {
  for (let i = 1; i <= size * size; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.style.width = `calc(100% / ${size})`;
  cell.style.height = `calc(100% / ${size})`;
  cell.style.border = '1px solid '+ gridItem;

  grid.appendChild(cell);
  };
};

// sliderLabel
function updateSliderLabel() {
  sliderLabel.innerText = `${slider.value} x ${slider.value}`;
};

// colorPicker
// solidColor
// mixColor
// erase
// clear

slider.addEventListener("input", (e) => updateSliderLabel(e.target.value));

window.onload = () => {
  createGrid(16);
};