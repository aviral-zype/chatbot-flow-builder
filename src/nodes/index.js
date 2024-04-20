import { TextNode } from "./TextNode";

export const initialNodes = [
  { id: "1", type: "text-node", position: { x: 0, y: 0 }, data: { heading: "Send Message", message: "This is text 1" } },
  { id: "2", type: "text-node", position: { x: 100, y: 100 }, data: { heading: "Send Message", message: "This is text 2" } },
];

export const nodeTypes = {
  "text-node": TextNode,
  // Add any of your custom nodes here!
};
