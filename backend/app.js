const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });


app.get('/', (req, res) => {
    res.send('<h1 style="display: flex; justify-content: center; margin-top: 1.5rem;">Upload File Using Express with Angular</h1>')
})

app.post('/file', upload.single('file'), (req, res, next) => {
    const file = req.file;
    console.log(file);
    if (!file) {
        const error = new Error('Please choosen file');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.status(200).json({
        message: 'upload file thanh cong',
        file: file
    });
})

app.use((err, req, res, next) => {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
  });

app.listen(PORT, () => {
    console.log('Project is running on port: 3000');
})