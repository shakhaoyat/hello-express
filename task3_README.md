# Task #3: LCM Web Service

## Implementation

This Node.js HTTP server calculates the Lowest Common Multiple (LCM) of two natural numbers.

**Endpoint:** `/shakhaoyathossain_12_gmail_com`

**Method:** HTTP GET

**Parameters:**
- `x` - first natural number
- `y` - second natural number

**Response:**
- Plain text string containing only digits (LCM result)
- Returns `NaN` if either input is not a natural number

## Local Testing

1. **Start the server:**
   ```bash
   node task3.js
   ```

2. **Test URLs:**
   - Valid: `http://localhost:3000/shakhaoyathossain_12_gmail_com?x=12&y=18` → `36`
   - Valid: `http://localhost:3000/shakhaoyathossain_12_gmail_com?x=7&y=5` → `35`
   - Invalid: `http://localhost:3000/shakhaoyathossain_12_gmail_com?x=-5&y=10` → `NaN`
   - Invalid: `http://localhost:3000/shakhaoyathossain_12_gmail_com?x=3.5&y=7` → `NaN`

## Deployment Options

### Option 1: Render.com (Recommended - Free)

1. Create account at https://render.com
2. Click "New" → "Web Service"
3. Connect your GitHub repository (or deploy from Git URL)
4. Configure:
   - **Build Command:** `npm install` (if needed)
   - **Start Command:** `node task3.js`
   - **Environment:** Node
5. Your URL will be: `https://your-service-name.onrender.com/shakhaoyathossain_12_gmail_com?x={}&y={}`

### Option 2: Railway.app (Free tier)

1. Create account at https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Railway will auto-detect Node.js
5. Your URL will be: `https://your-app.railway.app/shakhaoyathossain_12_gmail_com?x={}&y={}`

### Option 3: Fly.io (Free tier)

1. Install flyctl: `npm install -g flyctl` or download from https://fly.io/docs/hands-on/install-flyctl/
2. Login: `fly auth login`
3. Launch app: `fly launch`
4. Deploy: `fly deploy`
5. Your URL will be: `https://your-app-name.fly.dev/shakhaoyathossain_12_gmail_com?x={}&y={}`

### Option 4: Glitch.com (Free, quick)

1. Go to https://glitch.com
2. Click "New Project" → "Import from GitHub"
3. Or manually create project and paste task3.js
4. Your URL will be: `https://your-project-name.glitch.me/shakhaoyathossain_12_gmail_com?x={}&y={}`

### Option 5: Vercel (Serverless - requires small modification)

For Vercel, you'll need to convert to serverless format. Create `api/shakhaoyathossain_12_gmail_com.js`:

```javascript
// GCD and LCM functions
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

export default function handler(req, res) {
    const { x, y } = req.query;

    if (!isNaturalNumber(x) || !isNaturalNumber(y)) {
        return res.status(200).send('NaN');
    }

    const result = lcm(Number(x), Number(y));
    res.status(200).send(result.toString());
}
```

Deploy:
```bash
npm install -g vercel
vercel
```

Your URL: `https://your-project.vercel.app/api/shakhaoyathossain_12_gmail_com?x={}&y={}`

## Submission Template

Once deployed, submit using:

```
!task3 shakhaoyathossain.12@gmail.com http://your-deployed-url.com/shakhaoyathossain_12_gmail_com?x={}&y={}
```

## Algorithm Details

**LCM Calculation:**
- Uses the formula: `LCM(x, y) = (x * y) / GCD(x, y)`
- GCD calculated using Euclidean algorithm (efficient for large numbers)

**Validation:**
- Checks if input is an integer: `Number.isInteger()`
- Checks if input is positive: `num > 0`
- Returns `NaN` for: negative numbers, zero, decimals, non-numeric values

## Examples

| x | y | Result | Explanation |
|---|---|--------|-------------|
| 12 | 18 | 36 | LCM of 12 and 18 |
| 7 | 5 | 35 | LCM of 7 and 5 |
| 1 | 100 | 100 | LCM with 1 |
| -5 | 10 | NaN | Negative number |
| 3.5 | 7 | NaN | Decimal number |
| 0 | 5 | NaN | Zero is not natural |
