const http = require('http');

function testEndpoint(x, y, expected) {
      const url = `http://localhost:3000/shakhaoyathossain_12_gmail_com?x=${x}&y=${y}`;

      http.get(url, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                  data += chunk;
            });

            res.on('end', () => {
                  const pass = data === expected ? '✓' : '✗';
                  console.log(`${pass} x=${x}, y=${y} => ${data} (expected: ${expected})`);
            });
      }).on('error', (err) => {
            console.log(`✗ Error testing x=${x}, y=${y}: ${err.message}`);
      });
}

console.log('Testing LCM endpoint...\n');

// Test valid natural numbers
setTimeout(() => testEndpoint(12, 18, '36'), 100);     // LCM(12, 18) = 36
setTimeout(() => testEndpoint(7, 5, '35'), 200);       // LCM(7, 5) = 35
setTimeout(() => testEndpoint(1, 100, '100'), 300);    // LCM(1, 100) = 100
setTimeout(() => testEndpoint(15, 25, '75'), 400);     // LCM(15, 25) = 75
setTimeout(() => testEndpoint(6, 8, '24'), 500);       // LCM(6, 8) = 24

// Test invalid inputs (should return 'NaN')
setTimeout(() => testEndpoint(-5, 10, 'NaN'), 600);    // negative number
setTimeout(() => testEndpoint(3.5, 7, 'NaN'), 700);    // decimal number
setTimeout(() => testEndpoint(0, 5, 'NaN'), 800);      // zero
setTimeout(() => testEndpoint('abc', 5, 'NaN'), 900);  // non-numeric
setTimeout(() => testEndpoint(5, -3, 'NaN'), 1000);    // negative y
