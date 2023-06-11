//Initial grid creation
createGrid(10);

function createGrid(squaresPerSide) {
    let gridSize = squaresPerSide * squaresPerSide;
    //create new grid container
    const newGridContainer = document.createElement('div');
    newGridContainer.id = "gridContainer";

    //append new grid container to container div
    const outerGridContainer = document.getElementById('outerGridContainer');
    outerGridContainer.appendChild(newGridContainer);

    //append divs to newly created grid container
    const gridContainer = document.getElementById('gridContainer');
    for (let i = 0; i < gridSize; i++) {
        const div = document.createElement('div');
        div.className = "gridElement";
        gridContainer.append(div);
    }
    const gridContainerWidth = parseInt(getComputedStyle(gridContainer).width); //get total container width in order to calculated the size of the grid-divs
    const gridElements = document.querySelectorAll('.gridElement');
    const gridElementWidth = (gridContainerWidth / squaresPerSide);
    gridElements.forEach(gridElement => {
        gridElement.classList.add('gridBorder');
        gridElement.style.width = gridElementWidth + "px";
        gridElement.style.height = gridElementWidth + "px";
    });

    //EventListener to change background color
    gridElements.forEach(gridElement => {
        gridElement.addEventListener('mouseover', () => {
            gridElement.style.backgroundColor = "black";
        });
    });

    // Clear button to remove colorings
    const clearButton = document.getElementById('clearColors');
    clearButton.addEventListener('click', () => {
        gridElements.forEach(gridElement => {
            gridElement.style.backgroundColor = "white";
        });
    });

    //Toggle grid lines
    //Add eventListener to the respective button
    const gridLinesButton = document.getElementById('toggleGridLines');
    gridLinesButton.addEventListener('click', () => {
        gridElements.forEach(gridElement => {
            gridElement.classList.toggle('gridBorder');
        });
    });
}

// Change grid size
//Remove grid first
function removeGrid() {
    gridContainer.remove();
}
//Create new grid based on prompt input
//add eventListener to the respective button
const gridSizeButton = document.getElementById('changeGridSize');
gridSizeButton.addEventListener('click', () => {
    let input = "How many Squares per side?";
    checkPrompt(input);
});
//check if prompt contains a valid integer between 1&100
function checkPrompt(input) {
    let newSquaresPerSide = prompt(input, "");

    if (newSquaresPerSide === null) {
    } else {
        newSquaresPerSide = parseInt(newSquaresPerSide);
        if (Number.isInteger(newSquaresPerSide) && newSquaresPerSide > 0 && newSquaresPerSide <= 100) {
            removeGrid();
            createGrid(newSquaresPerSide);
        } else {
            input = "Please enter a number between 1-100."
            checkPrompt(input);
        }
    }
}

