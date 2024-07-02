const url = 'portfolio.pdf';  

const pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.0.279/pdf.worker.min.js';

const pdfViewer = document.getElementById('pdf-viewer');

pdfjsLib.getDocument(url).promise.then(function(pdf) {
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        pdf.getPage(pageNumber).then(function(page) {
            const viewport = page.getViewport({scale: 1.5});
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext);
            pdfViewer.appendChild(canvas);
        });
    }
});

