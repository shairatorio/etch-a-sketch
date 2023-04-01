let grid = document.querySelector("#grid");
let gridSize = 16;

let colorPicker = document.querySelector("#colorPicker");
let btnPencil =  document.querySelector("#btnPencil");
let btnRainbow =  document.querySelector("#btnRainbow");
let btnErase =  document.querySelector("#btnErase");
let btnClear =  document.querySelector("#btnClear");
let sliderLabel = document.querySelector("#sliderLabel");
let slider = document.querySelector("#slider");

let gridBorderColor = getComputedStyle(document.documentElement).getPropertyValue('--color-light-gray');
let eraseColor = getComputedStyle(document.documentElement).getPropertyValue('--color-white');

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

function removeActiveButton(btnTypeOne, btnTypeTwo) {
    btnTypeOne.classList.remove("active-button");
    btnTypeTwo.classList.remove("active-button");
}

function clickButton(btnType) {
  switch (btnType) {
    case 'pencil':
      removeActiveButton(btnRainbow,btnErase);
      btnPencil.classList.add("active-button");

      addGlobalEventListener("mouseover", ".cell", e => {
        e.target.style.background = colorPicker.value;
      });
    break;

    case 'rainbow':
      removeActiveButton(btnPencil,btnErase);
      btnRainbow.classList.add("active-button");
    break;

    case 'erase':
      removeActiveButton(btnPencil,btnRainbow);
      btnErase.classList.add("active-button");

      addGlobalEventListener("mouseover", ".cell", e => {
        e.target.style.background = eraseColor;
      });
    break;
  }
}
  
// clear

function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, e => {
    if(e.target.matches(selector)) callback(e)
  })
}

addGlobalEventListener("click", "button", e => clickButton(e.target.classList[0]));

addGlobalEventListener("change", "input", e => {
  updateSliderLabel(e.target.value)
  updateSizeGrid(e.target.value)
});

window.onload = () => {
  createGrid(gridSize);
};