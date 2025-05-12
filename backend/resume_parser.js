const pdf = require('pdf-parse');

function parseResume(pdfBuffer) {
    return pdf(pdfBuffer).then(data => {
        return {
            text: data.text
        };
    }).catch(error => {
        console.error("Error parsing PDF:", error);
        throw error;
    });
}

module.exports = { parseResume };
