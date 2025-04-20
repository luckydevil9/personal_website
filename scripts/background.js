console.log("Script running");

window.addEventListener('load', () => {
  const container = document.querySelector('.math-symbols');
  const symbols = ['∑', '√', 'π', '∫', '∞', '∆', '≈', '∇', '∂', '∈', '⊥', '∀', '∅', '∃'];
  const gridCols = 6;
  const gridRows = 5;
  const spacingMargin = 40;
  const fontMin = 70;
  const fontMax = 100;
  const usedPositions = [];
  const totalSymbols = gridCols * gridRows;
  const bottomBuffer = 180; // 🔒 prevent symbols from being in bottom 180px

  if (!container) {
    console.error("No .math-symbols container found");
    return;
  }

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const cellWidth = screenWidth / gridCols;
  const cellHeight = screenHeight / gridRows;

  for (let i = 0; i < totalSymbols; i++) {
    const span = document.createElement('span');
    span.textContent = symbols[i % symbols.length]; // repeat safely

    let left, top;
    let tries = 0;
    let valid = false;

    while (!valid && tries < 100) {
      const col = i % gridCols;
      const row = Math.floor(i / gridCols);

      left = col * cellWidth + spacingMargin + Math.random() * (cellWidth - spacingMargin * 2);
      top = row * cellHeight + spacingMargin + Math.random() * (cellHeight - spacingMargin * 2);

      const notTooCloseToOthers = usedPositions.every(pos => {
        const dx = pos.left - left;
        const dy = pos.top - top;
        return Math.sqrt(dx * dx + dy * dy) > 120; // spacing check
      });

      const notInBottomZone = top < (screenHeight - bottomBuffer); // 🔒 avoid bottom

      valid = notTooCloseToOthers && notInBottomZone;
      tries++;
    }

    usedPositions.push({ top, left });

    const rotate = Math.floor(Math.random() * 60) - 30;
    const size = Math.floor(Math.random() * (fontMax - fontMin)) + fontMin;

    span.style.position = 'absolute';
    span.style.left = `${left}px`;
    span.style.top = `${top}px`;
    span.style.transform = `rotate(${rotate}deg)`;
    span.style.fontSize = `${size}px`;
    span.style.color = 'rgba(0, 0, 0, 0.04)';
    span.style.userSelect = 'none';

    container.appendChild(span);
  }
});










  