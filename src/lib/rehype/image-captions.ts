import { visit } from "unist-util-visit";

export default function rehypeImageCaptions() {
  return (tree: any) => {
    visit(tree, "element", (node, index, parent) => {
      if (
        node.tagName === "img" &&
        node.properties?.alt &&
        parent &&
        typeof index === "number"
      ) {
        // Create a copy of the original img node
        const imgNode = {
          type: "element",
          tagName: "img",
          properties: { ...node.properties },
          children: [],
        };

        // Create a figure element to wrap the image and caption
        const figure = {
          type: "element",
          tagName: "figure",
          properties: {
            className: ["image-with-caption"],
          },
          children: [
            imgNode,
            {
              type: "element",
              tagName: "figcaption",
              properties: {
                className: ["image-caption"],
              },
              children: [
                {
                  type: "text",
                  value: node.properties.alt,
                },
              ],
            },
          ],
        };

        // Replace the img node with the figure in the parent
        parent.children[index] = figure;
      }
    });
  };
}
