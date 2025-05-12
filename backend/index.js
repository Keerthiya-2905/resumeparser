const express = require('express');
const fileUpload = require('express-fileupload');
const resumeParser = require('./resume_parser');

const app = express();
const port = 3000;

app.use(fileUpload());
app.use(express.static('frontend'));

app.post('/upload', (req, res) => {
    if (!req.files || !req.files.resume) {
        return res.status(400).send('No resume file uploaded');
    }

    const resumeFile = req.files.resume;

    resumeParser.parseResume(resumeFile.data)
        .then(parsedData => {
            res.json(parsedData);
        })
        .catch(err => {
            console.error('Error parsing resume:', err);
            res.status(500).send('Error processing the resume');
        });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
