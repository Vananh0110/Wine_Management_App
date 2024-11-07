const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});


