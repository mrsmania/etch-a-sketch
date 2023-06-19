const colorBtn = document.getElementById('colorPicker');
const clearBtn = document.getElementById('clearColors');
const gridBtn = document.getElementById('toggleGridLines');
const rainbowBtn = document.getElementById('rainbowColors');
const darkenBtn = document.getElementById('gradient');
const eraserBtn = document.getElementById('eraser');
const rangeSlider = document.getElementById('slider');
const spsValue = document.getElementById('squaresPerSide');
const gridContainerWidth = parseInt(getComputedStyle(gridContainer).width);

let pen = 'color';
let mouseIsClicked = false;

document.addEventListener('mousedown', () => mouseIsClicked = true);
document.addEventListener('mouseup', () => mouseIsClicked = false);
clearBtn.addEventListener('click', clearGrid);
gridBtn.addEventListener('click', toggleGridLines);
rainbowBtn.addEventListener('click', toggleActivePen);
darkenBtn.addEventListener('click', toggleActivePen);
eraserBtn.addEventListener('click', toggleActivePen);
rangeSlider.addEventListener('input', (e) => displayGridSize(e.target.value));
rangeSlider.addEventListener('change', (e) => changeGridSize(e.target.value));

function createGrid(squaresPerSide) {
    const gridSize = squaresPerSide * squaresPerSide;
    const gridElementWidth = ((gridContainerWidth / squaresPerSide)) + "px";
    for (let i = 0; i < gridSize; i++) {
        const div = document.createElement('div');
        div.addEventListener('mouseover', changeColor);
        div.addEventListener('mousedown', changeColor);
        div.className = "gridElement";
        div.style.width = gridElementWidth;
        div.style.height = gridElementWidth;
        div.style.backgroundColor = "#fff";
        gridContainer.append(div);
    }
    toggleGridLines(squaresPerSide);
}

function selectAllGridElements() {
    return gridElements = document.querySelectorAll('.gridElement');
}

function clearGrid() {
    selectAllGridElements();
    gridElements.forEach(gridElement => {
        gridElement.style.backgroundColor = "rgb(255, 255, 255)";
        delete gridElement.dataset.darkenedCounter;
        delete gridElement.dataset.originColor;
    });
}

function toggleGridLines(input) {
    squaresPerSide = input;
    selectAllGridElements();
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
    gridBtn.classList.toggle('buttonActive');
}

function changeColor(e) {
    if (e.type === 'mouseover' && mouseIsClicked === false) return;
    if (pen === "rainBow") {
        const rValue = Math.floor(Math.random() * 256);
        const gValue = Math.floor(Math.random() * 256);
        const bValue = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = "rgb(" + rValue + ", " + gValue + ", " + bValue + ")";
        delete e.target.dataset.darkenedCounter;
        delete e.target.dataset.originColor;
    } else if (pen === "color") {
        e.target.style.backgroundColor = colorBtn.value;
        delete e.target.dataset.darkenedCounter;
        delete e.target.dataset.originColor;
    } else if (pen === "eraser") {
        e.target.style.backgroundColor = 'rgb(255, 255, 255)';
        delete e.target.dataset.darkenedCounter;
        delete e.target.dataset.originColor;
    } else if (pen === "gradient") {
        let rgb = e.target.style.backgroundColor.substring(4, e.target.style.backgroundColor.length - 1).replace(/ /g, '').split(',');
        if (e.target.dataset.originColor === undefined) {
            e.target.dataset.originColor = "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
            e.target.dataset.darkenedCounter = "0";
            darkenBackground(e);
        } else {
            darkenBackground(e);
        }
    }
}

function darkenBackground(e) {
    currentCounter = Number(e.target.dataset.darkenedCounter);
    let rgbOrigin = e.target.dataset.originColor.substring(4, e.target.dataset.originColor.length - 1).replace(/ /g, '').split(',');
    if (currentCounter < 10) {
        newR = Math.round(Number(rgbOrigin[0]) - (Number(rgbOrigin[0]) * (currentCounter + 1) / 10));
        newG = Math.round(Number(rgbOrigin[1]) - (Number(rgbOrigin[1]) * (currentCounter + 1) / 10));
        newB = Math.round(Number(rgbOrigin[2]) - (Number(rgbOrigin[2]) * (currentCounter + 1) / 10));
        newColor = "rgb(" + newR + "," + newG + "," + newB + ")";
        currentCounter++;
        e.target.style.backgroundColor = newColor;
        e.target.dataset.darkenedCounter = currentCounter;
    }
}

function toggleActivePen(e) {
    if (e.target.id === "rainbowColors") {
        if (pen === "rainBow") {
            pen = "color";
            rainbowBtn.classList.toggle('buttonActive');
        } else if (pen === "color") {
            pen = "rainBow";
            rainbowBtn.classList.toggle('buttonActive');
        } else if (pen === "eraser") {
            pen = "rainBow";
            rainbowBtn.classList.toggle('buttonActive');
            eraserBtn.classList.toggle('buttonActive');
        } else if (pen === "gradient") {
            pen = "rainBow";
            rainbowBtn.classList.toggle('buttonActive');
            darkenBtn.classList.toggle('buttonActive');
        }
    } else if (e.target.id === "eraser") {
        if (pen === "eraser") {
            pen = "color";
            eraserBtn.classList.toggle('buttonActive');
        } else if (pen === "color") {
            pen = "eraser";
            eraserBtn.classList.toggle('buttonActive');
        } else if (pen === "rainBow") {
            pen = "eraser";
            rainbowBtn.classList.toggle('buttonActive');
            eraserBtn.classList.toggle('buttonActive');
        } else if (pen === "gradient") {
            pen = "eraser";
            darkenBtn.classList.toggle('buttonActive');
            eraserBtn.classList.toggle('buttonActive');
        }
    } else if (e.target.id === "gradient") {
        if (pen === "gradient") {
            pen = "color";
            darkenBtn.classList.toggle('buttonActive');
        } else if (pen === "color") {
            pen = "gradient";
            darkenBtn.classList.toggle('buttonActive');
        } else if (pen === "rainBow") {
            pen = "gradient";
            rainbowBtn.classList.toggle('buttonActive');
            darkenBtn.classList.toggle('buttonActive');
        } else if (pen === "eraser") {
            pen = "gradient";
            eraserBtn.classList.toggle('buttonActive');
            darkenBtn.classList.toggle('buttonActive');
        }
    }
}

function displayGridSize(value) {
    return spsValue.innerHTML = "Size: " + value + " x " + value;
}

function changeGridSize(value) {
    displayGridSize(value);
    gridContainer.innerHTML = '';
    createGrid(value);
    gridBtn.classList.toggle('buttonActive');
}

//Initial grid creation
createGrid(40);