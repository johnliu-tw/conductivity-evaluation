const { showErrorAlert, showInputAlert } = require('./popup.js')
const EXISTENCE_RESPONSE = 'YES';

// Upload file functionality
document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0]
    if (!file) {
        return
    }

    if (file.type !== 'text/plain') {
        showErrorAlert('Invalid file type', 'Please upload a .txt file.')
        return
    }

    const reader = new FileReader()
    reader.onload = function (e) {
        document.getElementById('gridInput').value = e.target.result
    }
    reader.readAsText(file)
})

// Check conductivity path functionality
document.getElementById('checkBtn').addEventListener('click', function () {
    const gridData = document.getElementById('gridInput').value
    fetch('/evaluate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ grid: gridData.split('\n') }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                showErrorAlert('Error', data.error)
            } else {
                displayResult(data)
            }
        })
        .catch((error) => {
            console.error('Error:', error)
        })
})

function displayResult(data) {
    const result = data.message;
    const gridData = document.getElementById('gridInput').value.split('\n')
    const gridVisualization = document.getElementById('gridVisualization')
    gridVisualization.innerHTML = ''

    // Start to paint the grid
    gridData.forEach((row, rowIndex) => {
        const rowDiv = document.createElement('div')
        rowDiv.classList.add('grid-row')
        row.split('').forEach((cell, colIndex) => {
            const cellDiv = document.createElement('div')
            cellDiv.classList.add('grid-cell')
            if (result === EXISTENCE_RESPONSE && isPathCell(rowIndex, colIndex, data.path)) {
                cellDiv.classList.add('conductive')
            }
            cellDiv.textContent = cell
            rowDiv.appendChild(cellDiv)
        })
        gridVisualization.appendChild(rowDiv)
    })

    // Refresh the result div
    const resultElement = document.getElementById('result')
    resultElement.innerText = 'Has conductive path: ' + result
    resultElement.className = result === EXISTENCE_RESPONSE ? 'text-green-500' : 'text-red-500'
}

function isPathCell(x, y, path) {
    return path.some((point) => point[0] === x && point[1] === y)
}

// Generate random gird functionality
document.getElementById('generateBtn').addEventListener('click', function () {
    showInputAlert('Enter the grid size (N x N)', 'Generate', (result) => {
        if (!result.value) {
            return
        }

        const n = parseInt(result.value)
        const randomGrid = generateRandomGrid(n)
        document.getElementById('gridInput').value = gridToString(randomGrid)
    })
})

function generateRandomGrid(n) {
    const grid = []
    for (let i = 0; i < n; i++) {
        const row = []
        for (let j = 0; j < n; j++) {
            row.push(Math.round(Math.random()).toString())
        }
        grid.push(row)
    }
    return grid
}

function gridToString(grid) {
    return grid.map((row) => row.join('')).join('\n')
}
