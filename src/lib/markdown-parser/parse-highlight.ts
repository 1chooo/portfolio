export const parseHighlight = (line: string) => {
  let newLine = "";
  let charIndex = 0;
  let isInsideHighlight = false;
  let highlightText = "";

  while (charIndex < line.length) {
    if (
      line[charIndex] === "=" &&
      charIndex + 1 < line.length &&
      line[charIndex + 1] === "=" &&
      !isInsideHighlight
    ) {
      isInsideHighlight = true;
      highlightText = "";
      charIndex += 2;
    } else if (
      line[charIndex] === "=" &&
      charIndex + 1 < line.length &&
      line[charIndex + 1] === "=" &&
      isInsideHighlight
    ) {
      isInsideHighlight = false;
      charIndex += 2;
      newLine += `<span class='highlight'>${highlightText}</span>`;
    } else if (isInsideHighlight) {
      highlightText += line[charIndex];
      charIndex++;
    } else {
      newLine += line[charIndex];
      charIndex++;
    }
  }

  if (isInsideHighlight) {
    newLine += "==" + highlightText;
  }

  return newLine;
};
