export const parseUnorderedList = (markdownText: string) => {
  const lines = markdownText.split("\n");
  let inUnorderedList = false;
  const newList = [];

  for (const line of lines) {
    if (line.startsWith("- ")) {
      if (!inUnorderedList) {
        inUnorderedList = true;
        newList.push("<ul>");
      }
      newList.push(`<li>${line.substring(2)}</li>`);
    } else {
      if (inUnorderedList) {
        inUnorderedList = false;
        newList.push("</ul>");
      }
      newList.push(line);
    }
  }

  if (inUnorderedList) {
    newList.push("</ul>");
  }

  return newList.join("\n");
};
