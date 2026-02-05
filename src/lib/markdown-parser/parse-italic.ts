export const parseItalic = (line: string) => {
  let newLine = "";
  let charIndex = 0;
  let isPotentialItalic = false;
  let italicText = "";
  let italicMarker = "";

  while (charIndex < line.length) {
    if (
      (line[charIndex] === "*" || line[charIndex] === "_") &&
      !isPotentialItalic
    ) {
      isPotentialItalic = true;
      italicMarker = line[charIndex];
      italicText = "";
      charIndex++;
    } else if (line[charIndex] === italicMarker && isPotentialItalic) {
      isPotentialItalic = false;
      charIndex++;
      newLine += "<em>" + italicText + "</em>";
    } else if (isPotentialItalic) {
      italicText += line[charIndex];
      charIndex++;
    } else {
      newLine += line[charIndex];
      charIndex++;
    }
  }

  if (isPotentialItalic) {
    newLine += italicMarker + italicText;
  }

  return newLine;
};
