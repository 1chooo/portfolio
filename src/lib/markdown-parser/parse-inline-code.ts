export const parseInlineCode = (line: string) => {
  let newLine = "";
  let charIndex = 0;
  let isInsideCode = false;
  let codeText = "";

  while (charIndex < line.length) {
    if (line[charIndex] === "`" && !isInsideCode) {
      isInsideCode = true;
      codeText = "";
      charIndex++;
    } else if (line[charIndex] === "`" && isInsideCode) {
      isInsideCode = false;
      charIndex++;
      newLine += `<code>${codeText}</code>`;
    } else if (isInsideCode) {
      codeText += line[charIndex];
      charIndex++;
    } else {
      newLine += line[charIndex];
      charIndex++;
    }
  }

  if (isInsideCode) {
    newLine += "`" + codeText;
  }

  return newLine;
};
