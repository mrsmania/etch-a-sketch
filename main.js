function createGrid(squaresPerSide) {
    let activePen='black';
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
    const gridElementsArr = Array.from(gridElements);
    const gridElementWidth = (gridContainerWidth / squaresPerSide);
    for (let i = 0; i < gridElementsArr.length; i++) {
        gridElementsArr[i].classList.toggle('gridBorder');
        gridElementsArr[i].style.width = gridElementWidth + "px";
        gridElementsArr[i].style.height = gridElementWidth + "px";
        if (((i + 1) % squaresPerSide) === 0) { // add border to most right elements (every nth element, whereas nth = number of squares)
            gridElementsArr[i].classList.toggle('gridBorderRight');
        }
        if ((gridElementsArr.length - (i + 1)) < squaresPerSide) { // add border to bottom elements (last nth elements, whereas nth = number of squares)
            gridElementsArr[i].classList.toggle('gridBorderBottom');
        }
    };

    // Button for rainbow pen
    const rainbowButton = document.getElementById('rainbowColors');
    rainbowButton.addEventListener('click', () => {
        if (activePen === "black") {
            activePen = "color";
            rainbowButton.classList.toggle('rainbowButtonBackground');
        } else if (activePen==="color") {
            activePen = "black";
            rainbowButton.classList.toggle('rainbowButtonBackground');
        }
        console.log("activePen: "+activePen);
    });
    //EventListener to change background color
    gridElements.forEach(gridElement => {
        gridElement.addEventListener('mouseover', () => {
            if (activePen === "black") {
                gridElement.style.backgroundColor = 'black';
            } else if (activePen === "color") {
                gridElement.style.backgroundColor = generateRandomColor();
            }
        });
    });

    function generateRandomColor() {
        //rgb(221, 208, 200);
        const rValue = Math.floor(Math.random() * 256);
        const gValue = Math.floor(Math.random() * 256);
        const bValue = Math.floor(Math.random() * 256);
        const randomColor = "rgb(" + rValue + ", " + gValue + ", " + bValue + ")";
        return randomColor;
    }

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
        for (let i = 0; i < gridElementsArr.length; i++) {
            gridElementsArr[i].classList.toggle('gridBorder');
            if (((i + 1) % squaresPerSide) === 0) { // add border to most right elements (every nth element, whereas nth = number of squares)
                gridElementsArr[i].classList.toggle('gridBorderRight');
            }
            if ((gridElementsArr.length - (i + 1)) < squaresPerSide) { // add border to bottom elements (last nth elements, whereas nth = number of squares)
                gridElementsArr[i].classList.toggle('gridBorderBottom');
            }
        };
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

//Initial grid creation
createGrid(16);