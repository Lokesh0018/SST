const bezier = require('bezier-js');

// Define control points for the cubic bezier curve
const curve = new bezier(
  { x: 100, y: 420 },
  { x: 400, y: 380 },
  { x: 600, y: 120 },
  { x: 900, y: 80 }
);

// We need points at X = 100, 300, 500, 700, 900
const targetX = [100, 300, 500, 700, 900];

targetX.forEach(x => {
  // Find t where curve(t).x is approximately equal to x
  let closestT = 0;
  let minDiff = Infinity;
  let finalY = 0;

  for (let t = 0; t <= 1; t += 0.0001) {
    const pt = curve.get(t);
    const diff = Math.abs(pt.x - x);
    if (diff < minDiff) {
      minDiff = diff;
      closestT = t;
      finalY = pt.y;
    }
  }

  console.log(`X: ${x} (${(x/10)}%), Y: ${finalY.toFixed(2)} (${(finalY/500 * 100).toFixed(2)}%)`);
});
