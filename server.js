const http = require('http');
const url = require('url');
const fs = require('fs');
const readline = require('readline');


const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  if (parsedUrl.pathname === '/spare-parts' && parsedUrl.query.name) {
    fs.readFile('LE.txt', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }
      
        const lines = data.trim().split('\n');
        
        const jsonData = [];
      
        lines.forEach((line) => {
          const values = line.trim().split('\t');
          
          const jsonObject = {
            column1: values[0].replace(/"/g, ''), // Remove quotes
            column2: values[1].replace(/"/g, ''),
            column3: parseInt(values[2].replace(/"/g, ''), 10), // Convert to integer
            column4: parseInt(values[3].replace(/"/g, ''), 10),
            column5: parseInt(values[4].replace(/"/g, ''), 10),
            column6: parseInt(values[5].replace(/"/g, ''), 10),
            column7: parseInt(values[6].replace(/"/g, ''), 10),
            column8: values[7].replace(/"/g, ''),
            column9: parseFloat(values[8].replace(/"/g, '').replace(',', '.')), // Convert to float
            column10: values[9].replace(/"/g, ''),
            column11: parseInt(values[10].replace(/"/g, ''), 10)
          };
          
          jsonData.push(jsonObject);
        });
      
        
        const jsonString = JSON.stringify(jsonData, null, 2);


        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(jsonString)



      });


  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = 3400;
const HOST = 'localhost';

server.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});