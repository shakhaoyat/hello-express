const http = require('http');
const url = require('url');

// Calculate GCD (Greatest Common Divisor) using Euclidean algorithm
function gcd(a, b) {
      while (b !== 0) {
            let temp = b;
            b = a % b;
            a = temp;
      }
      return a;
}

// Calculate LCM (Lowest Common Multiple)
function lcm(x, y) {
      return (x * y) / gcd(x, y);
}

// Check if a value is a natural number (positive integer)
function isNaturalNumber(value) {
      const num = Number(value);
      return Number.isInteger(num) && num > 0;
}

// Create HTTP server
const server = http.createServer((req, res) => {
      const parsedUrl = url.parse(req.url, true);
      const pathname = parsedUrl.pathname;
      const query = parsedUrl.query;

      // Handle the endpoint for your email: shakhaoyathossain.12@gmail.com -> shakhaoyathossain_12_gmail_com
      if (pathname === '/shakhaoyathossain_12_gmail_com' && req.method === 'GET') {
            const x = query.x;
            const y = query.y;

            // Validate inputs
            if (!isNaturalNumber(x) || !isNaturalNumber(y)) {
                  res.writeHead(200, { 'Content-Type': 'text/plain' });
                  res.end('NaN');
                  return;
            }

            // Calculate LCM
            const result = lcm(Number(x), Number(y));

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(result.toString());
      } else {
            // Handle other paths
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
      }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/`);
      console.log(`Endpoint: http://localhost:${PORT}/shakhaoyathossain_12_gmail_com?x={}&y={}`);
      console.log(`\nTest URLs:`);
      console.log(`  http://localhost:${PORT}/shakhaoyathossain_12_gmail_com?x=12&y=18`);
      console.log(`  http://localhost:${PORT}/shakhaoyathossain_12_gmail_com?x=7&y=5`);
      console.log(`  http://localhost:${PORT}/shakhaoyathossain_12_gmail_com?x=-5&y=10`);
      console.log(`  http://localhost:${PORT}/shakhaoyathossain_12_gmail_com?x=3.5&y=7`);
});
