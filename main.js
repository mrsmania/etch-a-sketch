let activePen = 'black';

const clearButton = document.getElementById('clearColors');
const gridLinesButton = document.getElementById('toggleGridLines');
const rainbowButton = document.getElementById('rainbowColors');
const eraserButton = document.getElementById('eraser');
const rangeSliderInput = document.getElementById('slider');
const sizeValueDiv = document.getElementById('sizeValue');
const gridContainerWidth = parseInt(getComputedStyle(gridContainer).width);

clearButton.addEventListener('click', clearGrid);
gridLinesButton.addEventListener('click', toggleGridLines);
rainbowButton.addEventListener('click', toggleActivePen);
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

function changeColor(e) {
    if (activePen === "color") {
        const rValue = Math.floor(Math.random() * 256);
        const gValue = Math.floor(Math.random() * 256);
        const bValue = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = "rgb(" + rValue + ", " + gValue + ", " + bValue + ")";
    } else if (activePen === "black") {
        e.target.style.backgroundColor = 'black';
    } else if (activePen === "eraser") {
        e.target.style.backgroundColor = 'white';
    }
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

function toggleActivePen(e) {
    clickedButton = e.target.id;
    if (clickedButton === "rainbowColors") {
        if (activePen === "black") {
            activePen = "color";
            rainbowButton.classList.toggle('buttonActive');
        } else if (activePen === "color") {
            activePen = "black";
            rainbowButton.classList.toggle('buttonActive');
        } else if (activePen === "eraser") {
            activePen = "color";
            rainbowButton.classList.toggle('buttonActive');
            eraserButton.classList.toggle('buttonActive');
        }
    } else if (clickedButton === "eraser") {
        if (activePen === "black") {
            activePen = "eraser";
            eraserButton.classList.toggle('buttonActive');
        } else if (activePen === "color") {
            activePen = "eraser";
            rainbowButton.classList.toggle('buttonActive');
            eraserButton.classList.toggle('buttonActive');
        } else if (activePen === "eraser") {
            activePen = "black";
            eraserButton.classList.toggle('buttonActive');
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
