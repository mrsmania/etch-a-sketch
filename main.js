
let activePen = 'black';

function createGrid(squaresPerSide) {
    let gridSize = squaresPerSide * squaresPerSide;
    //create new grid container
    const newGridContainer = document.createElement('div');
    newGridContainer.id = "gridContainer";
    //newGridContainer.style.cssText="background-color:#a5826d";

    //append new grid container to container div
    const outerGridContainer = document.getElementById('outerGridContainer');
    outerGridContainer.appendChild(newGridContainer);

    //append divs to newly created grid container
    const gridContainer = document.getElementById('gridContainer');
    for (let i = 0; i < gridSize; i++) {
        const div = document.createElement('div'); // create new grid element
        div.className = "gridElement";
        div.id = "gridElement" + i;
        gridContainer.append(div); // append grid element to grid container
    }
    createBorder(squaresPerSide);

    colorizeCanvas();
}

function colorizeCanvas() {
    const gridElements = document.querySelectorAll('.gridElement');
    gridElements.forEach(gridElement => {
        gridElement.addEventListener('mouseover', () => {
            if (activePen === "black") {
                gridElement.style.backgroundColor = 'black';
            } else if (activePen === "color") {
                gridElement.style.backgroundColor = generateRandomColor();
            } else if (activePen === "eraser") {
                gridElement.style.backgroundColor = 'white';
            }
        });
    });
}

function createBorder(input) {
    squaresPerSide = input;
    //create border for right-most elements & bottom elements
    const gridContainerWidth = parseInt(getComputedStyle(gridContainer).width); //get total container width in order to calculated the size of the grid-divs
    const gridElements = document.querySelectorAll('.gridElement');
    const gridElementWidth = ((gridContainerWidth / squaresPerSide)) + "px";
    const gridElementsArr = Array.from(gridElements);
    for (let i = 0; i < gridElementsArr.length; i++) {
        gridElementsArr[i].style.width = gridElementWidth;
        gridElementsArr[i].style.height = gridElementWidth;
    };
    toggleGridLines();
}

function clearColors() {
    const gridElements = document.querySelectorAll('.gridElement');
    gridElements.forEach(gridElement => {
        gridElement.style.backgroundColor = "white";
    });
}

function checkPrompt(input) {
    let newSquaresPerSide = prompt(input, "");

    if (newSquaresPerSide === null) {
    } else {
        newSquaresPerSide = parseInt(newSquaresPerSide);
        if (Number.isInteger(newSquaresPerSide) && newSquaresPerSide > 0 && newSquaresPerSide <= 100) {

            gridContainer.remove();
            createGrid(newSquaresPerSide);
        } else {
            input = "Please enter a number between 1-100."
            checkPrompt(input);
        }
    }
}

function toggleGridLines() {
    const gridElements = document.querySelectorAll('.gridElement');
    const gridElementsArr = Array.from(gridElements);
    for (let i = 0; i < gridElementsArr.length; i++) {
        gridElementsArr[i].classList.toggle('gridBorder');
        if (((i + 1) % squaresPerSide) === 0) { // add border to most right elements (every nth element, whereas nth = number of squares)
            gridElementsArr[i].classList.toggle('gridBorderRight');
        }
        if ((gridElementsArr.length - (i + 1)) < squaresPerSide) { // add border to bottom elements (last nth elements, whereas nth = number of squares)
            gridElementsArr[i].classList.toggle('gridBorderBottom');
        }
    };
}

function generateRandomColor() {
    const rValue = Math.floor(Math.random() * 256);
    const gValue = Math.floor(Math.random() * 256);
    const bValue = Math.floor(Math.random() * 256);
    const randomColor = "rgb(" + rValue + ", " + gValue + ", " + bValue + ")";
    return randomColor;
}

//Button to reset colored divs
const clearButton = document.getElementById('clearColors');
clearButton.addEventListener('click', clearColors);

//Button to change grid size
const gridSizeButton = document.getElementById('changeGridSize');
gridSizeButton.addEventListener('click', () => {
    let input = "How many Squares per side?"; //define msg
    checkPrompt(input);
});

//Button to toggle grid lines
const gridLinesButton = document.getElementById('toggleGridLines');
gridLinesButton.addEventListener('click', toggleGridLines);

//Button for rainbow pen
const rainbowButton = document.getElementById('rainbowColors');
rainbowButton.addEventListener('click', () => {
    if (activePen === "black") {
        activePen = "color";
        rainbowButton.classList.toggle('rainbowButtonBackground');
    } else if (activePen === "color") {
        activePen = "black";
        rainbowButton.classList.toggle('rainbowButtonBackground');
        eraserButton.classList.toggle('eraserButtonBackground');
    } else if (activePen === "eraser") {
        activePen = "color";
        rainbowButton.classList.toggle('rainbowButtonBackground');
    }
});

//Button for eraser
const eraserButton = document.getElementById('eraser');
eraserButton.addEventListener('click', () => {
    if(activePen === "black") {
        activePen = "eraser";
        eraserButton.classList.toggle('eraserButtonBackground');
    } else if (activePen === "color") {
        activePen = "eraser";
        rainbowButton.classList.toggle('rainbowButtonBackground');
        eraserButton.classList.toggle('eraserButtonBackground');
    } else if (activePen === "eraser") {
        activePen = "black";
        eraserButton.classList.toggle('eraserButtonBackground');
    }
});

//Initial grid creation
createGrid(16);