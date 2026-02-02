// GCD using Euclidean algorithm
function gcd(a, b) {
      while (b !== 0) {
            let temp = b;
            b = a % b;
            a = temp;
      }
      return a;
}

// LCM calculation
function lcm(x, y) {
      return (x * y) / gcd(x, y);
}

// Check if value is a natural number
function isNaturalNumber(value) {
      const num = Number(value);
      return Number.isInteger(num) && num > 0;
}

// Vercel serverless function
export default function handler(req, res) {
      const { x, y } = req.query;

      if (!isNaturalNumber(x) || !isNaturalNumber(y)) {
            return res.status(200).send('NaN');
      }

      const result = lcm(Number(x), Number(y));
      res.status(200).send(result.toString());
}
