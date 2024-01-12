const express = require('express')
const cors = require('cors')
const path = require('path');
const ConductivityChecker = require('./classes/conductivityChecker')
const { isValidGrid } = require('./classes/validator')
const db = require('./classes/database')

const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, '..', '..', 'public')));

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
});

app.get('/download-example', (_req, res) => {
    const filePath = path.join(__dirname, '..', '..', 'public', 'example.txt');
    res.download(filePath);
});

app.post('/evaluate', (req, res) => {
    const grid = req.body.grid
    if (!isValidGrid(grid)) {
        return res.status(400).send({ error: 'Invalid grid format' })
    }

    const checker = new ConductivityChecker(grid)
    const result = checker.checkConductivity()

    db.addEvaluation(grid, result.result, result.path)
        .then((id) => {
            res.send({ message: result.result, path: result.path })
        })
        .catch((err) => {
            console.error(err)
            res.status(500).send('Error processing request')
        });
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
