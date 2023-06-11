// Create grid
const grid = 15;
const gridSize = grid*grid;
const gridContainer = document.getElementById('gridContainer');
for (let i = 0; i < gridSize; i++) {
    const div = document.createElement('div');
    div.className = "gridElement";
    gridContainer.append(div);
}
const gridContainerWidth = parseInt(getComputedStyle(gridContainer).width, 10);
const gridElements = document.querySelectorAll('.gridElement');
const gridElementWidth = gridContainerWidth / grid;
gridElements.forEach(gridElement => {
    gridElement.style.width = gridElementWidth + "px";
    gridElement.style.height = gridElementWidth + "px";
});

//EventListener to change background color
gridElements.forEach(gridElement => {
    gridElement.addEventListener('mouseover', () => {
        gridElement.style.backgroundColor = "salmon";
        console.log('Element colored');
    });
});

// Clear button to remove colorings
const clearButton = document.getElementById('clearColors');
clearButton.addEventListener('click', () => {
    gridElements.forEach(gridElement => {
        gridElement.style.backgroundColor = "transparent";
    });
    console.log("colors cleared");
});