function gcd(a, b) {
      while (b !== 0) {
            let temp = b;
            b = a % b;
            a = temp;
      }
      return a;
}

function lcm(x, y) {
      return (x * y) / gcd(x, y);
}

function isNaturalNumber(value) {
      const num = Number(value);
      return Number.isInteger(num) && num > 0;
}

module.exports = (req, res) => {
      // Handle both root and /shakhaoyathossain_12_gmail_com
      const { x, y } = req.query;

      if (!isNaturalNumber(x) || !isNaturalNumber(y)) {
            return res.status(200).send('NaN');
      }

      const result = lcm(Number(x), Number(y));
      res.status(200).send(result.toString());
};
