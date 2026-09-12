const targetX = [100, 300, 500, 700, 900];

function getBezierPoint(t, p0, p1, p2, p3) {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;

  let x = uuu * p0.x;
  x += 3 * uu * t * p1.x;
  x += 3 * u * tt * p2.x;
  x += ttt * p3.x;

  let y = uuu * p0.y;
  y += 3 * uu * t * p1.y;
  y += 3 * u * tt * p2.y;
  y += ttt * p3.y;

  return { x, y };
}

const p0 = { x: 100, y: 440 }; // Start low
const p1 = { x: 450, y: 400 }; // Gentle start
const p2 = { x: 550, y: 100 }; // Steep middle, flattening at end
const p3 = { x: 900, y: 60 };  // End high

targetX.forEach(target => {
  let closestT = 0;
  let minDiff = Infinity;
  let finalY = 0;

  for (let t = 0; t <= 1; t += 0.0001) {
    const pt = getBezierPoint(t, p0, p1, p2, p3);
    const diff = Math.abs(pt.x - target);
    if (diff < minDiff) {
      minDiff = diff;
      closestT = t;
      finalY = pt.y;
    }
  }

  console.log(`X: ${target} (${(target/10)}%), Y: ${finalY.toFixed(2)} (${(finalY/500 * 100).toFixed(2)}%)`);
});
