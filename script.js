let grid = document.getElementById("grid");
let gridSize = 16;

let colorPicker = document.getElementById("colorPicker");
let btnPencil =  document.getElementById("btnPencil");
let btnRainbow =  document.getElementById("btnRainbow");
let btnErase =  document.getElementById("btnErase");
let btnClear =  document.getElementById("btnClear");
let sliderLabel = document.getElementById("sliderLabel");
let slider = document.getElementById("slider");

let gridBorderColor = getComputedStyle(document.documentElement).getPropertyValue('--color-light-gray');

function createGrid(size) {
  for (let i = 1; i <= size * size; i++) {
  let cell = document.createElement("div");
  cell.classList.add("cell");
  cell.style.width = `calc(100% / ${size})`;
  cell.style.height = `calc(100% / ${size})`;
  cell.style.border = '1px solid '+ gridBorderColor;

  grid.appendChild(cell);
  };
};

function updateSizeGrid(size) {
  grid.innerHTML = '';
  createGrid(size);
}

function updateSliderLabel() {
  sliderLabel.innerText = `${slider.value} x ${slider.value}`;
};

// colorPicker

function clickBtnPencil() {
  removeActiveButtons();

  btnPencil.classList.add("active-button");
}

function clickBtnRainbow() {
  removeActiveButtons();

  btnRainbow.classList.add("active-button");
}

function clickBtnErase() {
  removeActiveButtons();

  btnErase.classList.add("active-button");
}

function removeActiveButtons() {
  btnPencil.classList.remove("active-button");
  btnRainbow.classList.remove("active-button");
  btnErase.classList.remove("active-button");
}

// clear

slider.addEventListener("input", (e) => updateSliderLabel(e.target.value));
slider.addEventListener("input", (e) => updateSizeGrid(e.target.value));
btnPencil.addEventListener("click", (e) => clickBtnPencil(e.target.value));
btnRainbow.addEventListener("click", (e) => clickBtnRainbow(e.target.value));
btnErase.addEventListener("click", (e) => clickBtnErase(e.target.value));

window.onload = () => {
  createGrid(gridSize);
};