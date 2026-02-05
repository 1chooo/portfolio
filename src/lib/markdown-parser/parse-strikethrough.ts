export const parseStrikethrough = (line: string) => {
  let newLine = "";
  let charIndex = 0;
  let isInsideStrikethrough = false;
  let strikethroughText = "";

  while (charIndex < line.length) {
    if (
      line[charIndex] === "~" &&
      charIndex + 1 < line.length &&
      line[charIndex + 1] === "~" &&
      !isInsideStrikethrough
    ) {
      isInsideStrikethrough = true;
      strikethroughText = "";
      charIndex += 2;
    } else if (
      line[charIndex] === "~" &&
      charIndex + 1 < line.length &&
      line[charIndex + 1] === "~" &&
      isInsideStrikethrough
    ) {
      isInsideStrikethrough = false;
      charIndex += 2;
      newLine += `<del>${strikethroughText}</del>`;
    } else if (isInsideStrikethrough) {
      strikethroughText += line[charIndex];
      charIndex++;
    } else {
      newLine += line[charIndex];
      charIndex++;
    }
  }

  if (isInsideStrikethrough) {
    newLine += "~~" + strikethroughText;
  }

  return newLine;
};
