export const parseImages = (line: string) => {
  let newLine = "";
  let charIndex = 0;

  while (charIndex < line.length) {
    if (
      line[charIndex] === "!" &&
      charIndex + 1 < line.length &&
      line[charIndex + 1] === "["
    ) {
      let altText = "";
      charIndex += 2;

      while (charIndex < line.length && line[charIndex] !== "]") {
        altText += line[charIndex];
        charIndex++;
      }

      charIndex++;

      if (charIndex < line.length && line[charIndex] === "(") {
        let url = "";
        charIndex++;

        while (charIndex < line.length && line[charIndex] !== ")") {
          url += line[charIndex];
          charIndex++;
        }

        charIndex++;

        newLine += `<img src='${url}' alt='${altText}' />`;
      }
    } else {
      newLine += line[charIndex];
      charIndex++;
    }
  }

  return newLine;
};
