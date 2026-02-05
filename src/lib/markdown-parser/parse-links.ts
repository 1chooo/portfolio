export const parseLinks = (line: string) => {
  let newLine = "";
  let charIndex = 0;

  while (charIndex < line.length) {
    if (line[charIndex] === "[") {
      let title = "";
      charIndex++;

      while (charIndex < line.length && line[charIndex] !== "]") {
        title += line[charIndex];
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

        if (!url.startsWith("http://") && !url.startsWith("https://")) {
          url = `http://${url}`;
        }

        newLine += `<a href='${url}' target='_blank' rel='noopener noreferrer'>${title}</a>`;
      }
    } else {
      newLine += line[charIndex];
      charIndex++;
    }
  }

  return newLine;
};
