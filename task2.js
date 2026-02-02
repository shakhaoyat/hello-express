const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { createHash } = require('crypto');

// You'll need to install sha3 package: npm install sha3
const { SHA3 } = require('sha3');

// Configuration
const ARCHIVE_URL = 'https://www.dropbox.com/s/oy2668zp1lsuseh/task2.zip?dl=1';
const ARCHIVE_PATH = './task2.zip';
const EXTRACT_DIR = './task2_manual';
const YOUR_EMAIL = process.argv[2] || 'your.email@example.com'; // Pass email as command line argument

// Download file from URL
function downloadFile(url, destPath) {
      return new Promise((resolve, reject) => {
            const file = fs.createWriteStream(destPath);
            const protocol = url.startsWith('https') ? https : http;

            protocol.get(url, (response) => {
                  if (response.statusCode === 302 || response.statusCode === 301) {
                        // Follow redirect
                        file.close();
                        fs.unlinkSync(destPath);
                        return downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
                  }

                  response.pipe(file);
                  file.on('finish', () => {
                        file.close();
                        resolve();
                  });
            }).on('error', (err) => {
                  fs.unlinkSync(destPath);
                  reject(err);
            });
      });
}

// Calculate SHA3-256 hash of binary data
function calculateSHA3_256(buffer) {
      const hash = new SHA3(256);
      hash.update(buffer);
      return hash.digest('hex');
}

// Calculate the product of (hex_digit + 1) for sorting
function calculateSortKey(hash) {
      let product = BigInt(1);
      for (let i = 0; i < hash.length; i++) {
            const digit = parseInt(hash[i], 16);
            product *= BigInt(digit + 1);
      }
      return product;
}

// Extract ZIP file (requires unzipper package: npm install unzipper)
async function extractZip(zipPath, extractPath) {
      const unzipper = require('unzipper');

      return new Promise((resolve, reject) => {
            fs.createReadStream(zipPath)
                  .pipe(unzipper.Extract({ path: extractPath }))
                  .on('close', resolve)
                  .on('error', reject);
      });
}

// Main function
async function main() {
      try {
            console.log('Step 1: Downloading archive...');
            await downloadFile(ARCHIVE_URL, ARCHIVE_PATH);
            console.log('Archive downloaded successfully.');

            console.log('\nStep 2: Extracting files...');
            if (!fs.existsSync(EXTRACT_DIR)) {
                  fs.mkdirSync(EXTRACT_DIR);
            }
            await extractZip(ARCHIVE_PATH, EXTRACT_DIR);
            console.log('Files extracted successfully.');

            console.log('\nStep 3: Calculating SHA3-256 hashes...');
            const files = fs.readdirSync(EXTRACT_DIR).filter(f => {
                  const fullPath = path.join(EXTRACT_DIR, f);
                  return fs.statSync(fullPath).isFile();
            });

            console.log(`Found ${files.length} files.`);

            if (files.length !== 256) {
                  console.warn(`WARNING: Expected 256 files, but found ${files.length}!`);
            }

            const hashes = [];
            for (const file of files) {
                  const filePath = path.join(EXTRACT_DIR, file);
                  const buffer = fs.readFileSync(filePath); // Read as binary
                  const hash = calculateSHA3_256(buffer);
                  hashes.push(hash);
            }

            console.log(`Calculated ${hashes.length} hashes.`);
            console.log('Sample hash:', hashes[0]);

            console.log('\nStep 4: Sorting hashes by product key...');
            const hashesWithKeys = hashes.map(hash => ({
                  hash: hash,
                  key: calculateSortKey(hash)
            }));

            hashesWithKeys.sort((a, b) => {
                  if (a.key < b.key) return -1;
                  if (a.key > b.key) return 1;
                  return 0;
            });

            console.log('Sample sort key:', hashesWithKeys[0].key.toString());

            console.log('\nStep 5: Joining sorted hashes...');
            const sortedHashes = hashesWithKeys.map(item => item.hash);
            const joinedHashes = sortedHashes.join(''); // No separator

            console.log('Joined length:', joinedHashes.length);
            console.log('Expected length:', 64 * hashes.length);

            console.log('\nStep 6: Concatenating with email...');
            const email = YOUR_EMAIL.toLowerCase();
            const finalString = joinedHashes + email;

            console.log('Email used:', email);
            console.log('Final string length:', finalString.length);

            console.log('\nStep 7: Calculating final SHA3-256...');
            const finalHash = calculateSHA3_256(Buffer.from(finalString, 'utf8'));

            console.log('\n' + '='.repeat(70));
            console.log('FINAL RESULT:');
            console.log(finalHash);
            console.log('='.repeat(70));
            console.log('\nUse this command in Discord:');
            console.log(`!task2 ${email} ${finalHash}`);

      } catch (error) {
            console.error('Error:', error);
      }
}

main();
