const http = require('http');

function showSampleMessage() {
  return 'Hello from sample.js — this is a sample message!';
}

if (require.main === module) {
  const port = Number(process.env.PORT) || 8080;
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`${showSampleMessage()}\n`);
  });

  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

module.exports = { showSampleMessage };
