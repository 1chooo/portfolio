export const parseBold = (line: string) => {
  let newLine = "";
  let charIndex = 0;

  while (charIndex < line.length) {
    if (
      (line[charIndex] === "*" && line[charIndex + 1] === "*") ||
      (line[charIndex] === "_" && line[charIndex + 1] === "_")
    ) {
      charIndex += 2;
      let boldText = "";
      let endFound = false;

      while (charIndex < line.length) {
        if (
          (line[charIndex] === "*" && line[charIndex + 1] === "*") ||
          (line[charIndex] === "_" && line[charIndex + 1] === "_")
        ) {
          charIndex += 2;
          endFound = true;
          break;
        } else {
          boldText += line[charIndex];
          charIndex++;
        }
      }

      if (endFound) {
        newLine += `<strong>${boldText}</strong>`;
      } else {
        newLine += `**${boldText}`;
      }
    } else {
      newLine += line[charIndex];
      charIndex++;
    }
  }

  return newLine;
};
