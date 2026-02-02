// Simple synchronous test using fetch (available in Node 18+)
async function test() {
      const tests = [
            { x: 12, y: 18, expected: '36' },
            { x: 7, y: 5, expected: '35' },
            { x: 1, y: 100, expected: '100' },
            { x: 15, y: 25, expected: '75' },
            { x: 6, y: 8, expected: '24' },
            { x: -5, y: 10, expected: 'NaN' },
            { x: 3.5, y: 7, expected: 'NaN' },
            { x: 0, y: 5, expected: 'NaN' },
            { x: 'abc', y: 5, expected: 'NaN' },
      ];

      console.log('Testing LCM endpoint...\n');

      for (const { x, y, expected } of tests) {
            try {
                  const url = `http://localhost:3000/shakhaoyathossain_12_gmail_com?x=${x}&y=${y}`;
                  const response = await fetch(url);
                  const result = await response.text();
                  const pass = result === expected ? '✓' : '✗';
                  console.log(`${pass} x=${x}, y=${y} => ${result} (expected: ${expected})`);
            } catch (err) {
                  console.log(`✗ Error testing x=${x}, y=${y}: ${err.message}`);
            }
      }
}

test();
