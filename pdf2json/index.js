var from = require('linq').from;



let fs = require('fs'),
    PDFParser = require("pdf2json");

let pdfParser = new PDFParser(this, 1);

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
pdfParser.on("pdfParser_dataReady", pdfData => {
    
    console.log(pdfParser.getRawTextContent());

    fs.writeFile("./PDFTESTE.json", JSON.stringify(pdfData));

    var lines = from(pdfData.formImage.Pages)
                .selectMany("$.Texts")
                .orderBy("$.y")
                .groupBy("$.y", "$", function (key, group) { 
                    return { y: key, columns: from(group).orderBy("$.x").toArray() };
                })
                .toArray();
    lines.forEach(function(line) {
        var text = from(line.columns).orderBy("$.x").selectMany("$.R").select("$.T").toArray();

        console.log(decodeURI(text.join(' ')));
    }, this);
    
});

pdfParser.loadPDF("./PDFTESTE.pdf");