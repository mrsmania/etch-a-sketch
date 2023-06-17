let activePen = 'black';
let mouseIsClicked = false;

document.addEventListener('mousedown', () => mouseIsClicked = true);
document.addEventListener('mouseup', () => mouseIsClicked = false);

const clearButton = document.getElementById('clearColors');
const gridLinesButton = document.getElementById('toggleGridLines');
const rainbowButton = document.getElementById('rainbowColors');
const gradientButton = document.getElementById('gradient');
const eraserButton = document.getElementById('eraser');
const rangeSliderInput = document.getElementById('slider');
const sizeValueDiv = document.getElementById('sizeValue');
const gridContainerWidth = parseInt(getComputedStyle(gridContainer).width);

clearButton.addEventListener('click', clearGrid);
gridLinesButton.addEventListener('click', toggleGridLines);
rainbowButton.addEventListener('click', toggleActivePen);
gradientButton.addEventListener('click', toggleActivePen);
eraserButton.addEventListener('click', toggleActivePen);
rangeSliderInput.addEventListener('change', changeGridSize);

function createGrid(squaresPerSide) {
    const gridSize = squaresPerSide * squaresPerSide;
    const gridElementWidth = ((gridContainerWidth / squaresPerSide)) + "px";
    for (let i = 0; i < gridSize; i++) {
        const div = document.createElement('div');
        div.className = "gridElement";
        div.addEventListener('mouseover', changeColor);
        div.addEventListener('mousedown', changeColor);
        div.style.width = gridElementWidth;
        div.style.height = gridElementWidth;
        gridContainer.append(div);
    }
    toggleGridLines(squaresPerSide);
}

function clearGrid() {
    const gridElements = document.querySelectorAll('.gridElement');
    gridElements.forEach(gridElement => {
        gridElement.style.backgroundColor = "white";
    });
}

function toggleGridLines(input) {
    squaresPerSide = input;
    const gridElements = document.querySelectorAll('.gridElement');
    const gridElementsArr = Array.from(gridElements);
    for (let i = 0; i < gridElementsArr.length; i++) {
        gridElementsArr[i].classList.toggle('gridBorder');
        if (((i + 1) % squaresPerSide) === 0) {
            gridElementsArr[i].classList.toggle('gridBorderRight');
        }
        if ((gridElementsArr.length - (i + 1)) < squaresPerSide) {
            gridElementsArr[i].classList.toggle('gridBorderBottom');
        }
    };
}

function changeColor(e) {
    if (mouseIsClicked === false) return;
    if (activePen === "rainBow") {
        const rValue = Math.floor(Math.random() * 256);
        const gValue = Math.floor(Math.random() * 256);
        const bValue = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = "rgb(" + rValue + ", " + gValue + ", " + bValue + ")";
    } else if (activePen === "black") {
        e.target.style.backgroundColor = 'black';
    } else if (activePen === "eraser") {
        e.target.style.backgroundColor = 'white';
    } else if (activePen === "gradient") {
        if (e.target.style.backgroundColor.match(/rgba/)) {
            currentOpacity = Number(e.target.style.backgroundColor.slice(-4, -1));
            if (currentOpacity <= 0.9) {
                e.target.style.backgroundColor = "rgba(0, 0, 0, " + Number(currentOpacity + 0.1) + ")";
            }
        } else if (e.target.style.backgroundColor === "rgb(0, 0, 0)") {
            return;
        } else {
            e.target.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
        }
    }
}

function toggleActivePen(e) {
    clickedButton = e.target.id;
    if (clickedButton === "rainbowColors") {
        if (activePen === "rainBow") {
            activePen = "black";
            rainbowButton.classList.toggle('buttonActive');
        } else if (activePen === "black") {
            activePen = "rainBow";
            rainbowButton.classList.toggle('buttonActive');
        } else if (activePen === "eraser") {
            activePen = "rainBow";
            rainbowButton.classList.toggle('buttonActive');
            eraserButton.classList.toggle('buttonActive');
        } else if (activePen === "gradient") {
            activePen = "rainBow";
            rainbowButton.classList.toggle('buttonActive');
            gradientButton.classList.toggle('buttonActive');
        }
    } else if (clickedButton === "eraser") {
        if (activePen === "eraser") {
            activePen = "black";
            eraserButton.classList.toggle('buttonActive');
        } else if (activePen === "black") {
            activePen = "eraser";
            eraserButton.classList.toggle('buttonActive');
        } else if (activePen === "rainBow") {
            activePen = "eraser";
            rainbowButton.classList.toggle('buttonActive');
            eraserButton.classList.toggle('buttonActive');
        } else if (activePen === "gradient") {
            activePen = "eraser";
            gradientButton.classList.toggle('buttonActive');
            eraserButton.classList.toggle('buttonActive');
        }
    } else if (clickedButton === "gradient") {
        if (activePen === "gradient") {
            activePen = "black";
            gradientButton.classList.toggle('buttonActive');
        } else if (activePen === "black") {
            activePen = "gradient";
            gradientButton.classList.toggle('buttonActive');
        } else if (activePen === "rainBow") {
            activePen = "gradient";
            rainbowButton.classList.toggle('buttonActive');
            gradientButton.classList.toggle('buttonActive');
        } else if (activePen === "eraser") {
            activePen = "gradient";
            eraserButton.classList.toggle('buttonActive');
            gradientButton.classList.toggle('buttonActive');
        }
    }
}

function changeGridSize() {
    newValue = rangeSliderInput.value;
    gridContainer.innerHTML = '';
    createGrid(newValue);
    sizeValueDiv.innerHTML = newValue + " x " + newValue;
}

//Initial grid creation
createGrid(16);