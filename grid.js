let frame = 1;

function gridify(align=true, size=24) {
  let drawCall = (el) => {
    drawGrid(el, size, size, ["#fef287", "#ffcd93", "#f5b7ff"], 0.02, align)
  }
  for (let el of document.getElementsByClassName("gridded")) {
    drawCall(el);
  }
    document.addEventListener("scroll", () => { requestAnimationFrame(() => {
      if (frame % 20 == 0) {
        for (let el of document.getElementsByClassName("gridded")) {
          drawCall(el);
        }
        frame = 1;
      }
      frame += 1;
    //document.addEventListener("scroll", () => { drawCall(el) });
  })});
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function ensureCanvas(el) {
  let canvas = el.querySelector(":scope > canvas");
  let addCanvas = true;
  if (canvas) {
    addCanvas = false;
  } else {
    canvas = document.createElement("canvas");
  }
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio;
  const rect = el.getBoundingClientRect();

  // Set the "actual" size of the canvas
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  // Scale the context to ensure correct drawing operations
  ctx.scale(dpr, dpr);

  // Set the "drawn" size of the canvas
  canvas.style.width = `${rect.width}px`;
  canvas.style.height = `${rect.height}px`;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  return [canvas, ctx, addCanvas, rect];
}


function drawGrid(el, gridWidth, gridHeight, colors, colorProb, align) {
  const [canvas, ctx, addCanvas, rect] = ensureCanvas(el);
  const width = rect.width;
  const height = rect.height;
  let origin = [0.5, 0.5];

  if (align) {
    origin = [-rect.left % gridWidth, -rect.top % gridHeight];
  } 

  for (let i = 0; i < Math.ceil(width / gridWidth); i += 1) {
    for (let j = 0; j < Math.ceil(height / gridHeight); j += 1) {
      const colorThisSquare = Math.random() < colorProb;
      if (colorThisSquare) {
        const color = colors[getRandomInt(0, colors.length)];
        const location = [
          origin[0] + i * gridWidth,
          origin[1] + j * gridHeight,
        ];
        ctx.fillStyle = color;
        ctx.fillRect(location[0], location[1], gridWidth, gridHeight);
      }
    }
  }

  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  ctx.beginPath();

  for (let x = origin[0]; x < width; x += gridWidth) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }
  for (let y = origin[1]; y < height; y += gridHeight) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }
  ctx.closePath();
  ctx.stroke();
  //el.insertBefore(canvas, el.firstChild);
  if (addCanvas) {
    el.appendChild(canvas);
  }
}