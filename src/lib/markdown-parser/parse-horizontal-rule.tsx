export const parseHorizontalRule = (line: string) => {
  if (line.trim() === "---") {
    return <hr />;
  }
  return null;
};
