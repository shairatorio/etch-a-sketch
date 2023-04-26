let grid = document.querySelector('#grid');
let gridSize = 16;
let colorPicker = document.querySelector('#colorPicker');
let btnPencil =  document.querySelector('#btnPencil');
let btnRainbow =  document.querySelector('#btnRainbow');
let btnErase =  document.querySelector('#btnErase');
let btnClear =  document.querySelector('#btnClear');
let sliderLabel = document.querySelector('#sliderLabel');
let slider = document.querySelector('#slider');
let leftRoller = document.querySelector('.left-roller');
let rightRoller = document.querySelector('.right-roller');
let gridBorderColor = getComputedStyle(document.documentElement).getPropertyValue('--color-light-gray');
let eraseColor = getComputedStyle(document.documentElement).getPropertyValue('--color-white');
const percentage = 100;

function createGrid(size) {
  for (let i = 1; i <= size * size; i++) {
  let cell = document.createElement('div');
  cell.classList.add('cell');
  cell.style.width = `calc(${percentage}% / ${size})`;
  cell.style.height = `calc(${percentage}% / ${size})`;
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

function clickButton(btnType) {
  switch (btnType) {
    case 'pencil':
    case 'color-picker':
    case 'slider':
      btnPencil.focus();
      break;
    case 'rainbow':
      btnRainbow.focus();
      break;
    case 'erase':
      btnErase.focus();
      break;
    case 'clear':
      const cells = document.querySelectorAll('.cell');
      cells.forEach((cell) => {
        cell.style.background = eraseColor;
      });
      btnPencil.focus();
      break;
  }
}

addGlobalEventListener("mouseover", ".cell", e => {
  switch (document.activeElement.id) {
    case 'btnPencil':
      e.target.style.background = colorPicker.value;
      break;
    case 'btnRainbow':
      e.target.style.background = randomColor();
      break;
    case 'btnErase':
      e.target.style.background = eraseColor;
      break;
  }
});

function randomColor() {
  let color = '#';
  const digits = '0123456789ABCDEF';
  for (let i = 0; i < 6; i++) {
    color += digits[Math.floor(Math.random() * 16)];
  }
  return color;
}

function rotateRollers() {
  leftRoller.classList.toggle('rotate');
  rightRoller.classList.toggle('rotate');
}

function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, e => {
    if(e.target.matches(selector)) callback(e)
  })
}

addGlobalEventListener('click', 'button', e => clickButton(e.target.classList[0]));
addGlobalEventListener('mousemove', '.cell', () => rotateRollers());
addGlobalEventListener('change', '.color-picker', e => clickButton(e.target.classList[0]));
addGlobalEventListener('change', '.slider', e => {
  updateSliderLabel(e.target.value);
  updateSizeGrid(e.target.value);
  clickButton(e.target.classList[0]);
});

window.onload = () => {
  createGrid(gridSize);
  btnPencil.focus();
};