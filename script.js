let grid = document.querySelector("#grid");
let gridSize = 16;
let colorPicker = document.querySelector("#colorPicker");
let btnPencil =  document.querySelector("#btnPencil");
let btnRainbow =  document.querySelector("#btnRainbow");
let btnErase =  document.querySelector("#btnErase");
let btnClear =  document.querySelector("#btnClear");
let sliderLabel = document.querySelector("#sliderLabel");
let slider = document.querySelector("#slider");
let leftRoller = document.querySelector(".left-roller");
let rightRoller = document.querySelector(".right-roller");
let gridBorderColor = getComputedStyle(document.documentElement).getPropertyValue('--color-light-gray');
let eraseColor = getComputedStyle(document.documentElement).getPropertyValue('--color-white');
const percentage = 100;
let boolCPS = false;

function createGrid(size) {
  for (let i = 1; i <= size * size; i++) {
  let cell = document.createElement("div");
  cell.classList.add("cell");
  cell.style.width = `calc(${percentage}% / ${size})`;
  cell.style.height = `calc(${percentage}% / ${size})`;
  cell.style.border = '1px solid '+ gridBorderColor;
  grid.appendChild(cell);
  };
};

function updateSizeGrid(size) {
  grid.innerHTML = '';
  // if (boolCPS === true) {
  //   preSelectedButton();
  //   return
  // }
  createGrid(size);
}

function updateSliderLabel() {
  sliderLabel.innerText = `${slider.value} x ${slider.value}`;
};

function preSelectedButton() { 
  boolCPS = false;
  btnPencil.focus();
  addGlobalEventListener("mouseover", ".cell", e => {
    btnPencil.focus();
    e.target.style.background = colorPicker.value;
  });
}

function clickButton(btnType) {
  switch (btnType) {
    case 'pencil':      
      preSelectedButton();
    break;
    case 'rainbow':
      addGlobalEventListener("mouseover", ".cell", e => {
        if (boolCPS === true) {
          console.log('true');
          preSelectedButton();
          return
        } else {
          console.log('false');
          boolCPS = false;
          btnRainbow.focus();
          e.target.style.background = randomColor();
        }
      });
    break;
    case 'erase':
      addGlobalEventListener("mouseover", ".cell", e => {
        if (boolCPS === true) {
          preSelectedButton();
          return
        } else {
          boolCPS = false;
          btnErase.focus();
          e.target.style.background = eraseColor;
        }
      });
    break;
    case 'clear':
      const cells = document.querySelectorAll('.cell');
      cells.forEach((cell) => {
        cell.style.background = eraseColor;
      });
      preSelectedButton();
    break;
  }
}

function randomColor() {
  let color = '#';
  const digits = '0123456789ABCDEF';
  for (let i = 0; i < 6; i++) {
    color += digits[Math.floor(Math.random() * 16)];
  }
  return color;
}

function rotateRollers() {
  leftRoller.classList.toggle("rotate");
  rightRoller.classList.toggle("rotate");
}

function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, e => {
    if(e.target.matches(selector)) callback(e)
  })
}

addGlobalEventListener("click", "button", e => clickButton(e.target.classList[0]));
addGlobalEventListener("mousemove", ".cell", () => rotateRollers());
addGlobalEventListener("click", ".color-picker", e => e.type === 'click' ? boolCPS = true : null);
addGlobalEventListener("change", ".slider", e => {
  // boolCPS = true;
  updateSliderLabel(e.target.value);
  updateSizeGrid(e.target.value);
});

window.onload = () => {
  createGrid(gridSize);
  preSelectedButton();
};