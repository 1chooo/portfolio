import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

function remarkReadingTime() {
  return function (tree: any, file: any) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);

    // Store reading time in file data for later retrieval
    file.data.readingTime = readingTime.text;
  };
}

export default remarkReadingTime;
export { remarkReadingTime };
