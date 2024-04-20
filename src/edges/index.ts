import type { Edge, EdgeTypes } from "reactflow";

export const initialEdges = [
  { id: "1->2", source: "1", target: "2", animated: false },
] satisfies Edge[];

export const edgeTypes = {
  // Add your custom edge types here!
} satisfies EdgeTypes;
