export const parseBlockquote = (line: string) => {
  if (line.startsWith("> ")) {
    return <blockquote>{line.slice(2)}</blockquote>;
  }
  return null;
};
