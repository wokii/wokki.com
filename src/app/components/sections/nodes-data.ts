/**
 * NODE(S) section data — types, base taxonomy, worldview presets, layout
 * positions and privilege configuration. Extracted from `Nodes.tsx` so the
 * component file stays focused on rendering & interaction logic.
 *
 * Note: the original file declared `wokki` and `abcdxyz` worldviews with
 * identical 30-node arrays. They now share a single BASE_NODES constant —
 * fork the array into its own const if/when the two worldviews diverge.
 */

export type KnowledgeNode = {
  name: string;
  id: number;
  description: string;
  parent: number[];
};

export type UserRole = "元" | "insider" | "outsider" | "妃";

export const privilegeRootsByEmail: Record<string, number[]> = {
  "hanwokki@gmail.com": [1],
  "seeker.wokki@gmail.com": [1],
  "christine.huingaman@gmail.com": [1],
};

export const privilegeRootsByRole: Record<UserRole, number[]> = {
  元: [0],
  insider: [1],
  outsider: [],
  妃: [1],
};

/**
 * Canonical 元 → 11 first-tier → 20 second-tier taxonomy.
 *
 * id 0 is the 元 root. ids 1–10 are first-tier roots
 * (Mind / Matter / Form / Energy / Life / Society / Culture / Technology /
 *  Nature / Meaning). ids 11–30 are second-tier children grouped by parent.
 */
const BASE_NODES: KnowledgeNode[] = [
  { name: "node1", id: 0, description: "元", parent: [] },
  { name: "node1", id: 1, description: "Mind", parent: [0] },
  { name: "node1", id: 2, description: "Matter", parent: [0] },
  { name: "node1", id: 3, description: "Form", parent: [0] },
  { name: "node1", id: 4, description: "Energy", parent: [0] },
  { name: "node1", id: 5, description: "Life", parent: [0] },
  { name: "node1", id: 6, description: "Society", parent: [0] },
  { name: "node1", id: 7, description: "Culture", parent: [0] },
  { name: "node1", id: 8, description: "Technology", parent: [0] },
  { name: "node1", id: 9, description: "Nature", parent: [0] },
  { name: "node1", id: 10, description: "Meaning", parent: [0] },
  { name: "node1", id: 11, description: "Perception", parent: [1] },
  { name: "node1", id: 12, description: "Memory", parent: [1] },
  { name: "node1", id: 13, description: "Substance", parent: [2] },
  { name: "node1", id: 14, description: "Structure", parent: [2] },
  { name: "node1", id: 15, description: "Symmetry", parent: [3] },
  { name: "node1", id: 16, description: "Pattern", parent: [3] },
  { name: "node1", id: 17, description: "Force", parent: [4] },
  { name: "node1", id: 18, description: "Motion", parent: [4] },
  { name: "node1", id: 19, description: "Growth", parent: [5] },
  { name: "node1", id: 20, description: "Adaptation", parent: [5] },
  { name: "node1", id: 21, description: "Governance", parent: [6] },
  { name: "node1", id: 22, description: "Economy", parent: [6] },
  { name: "node1", id: 23, description: "Language", parent: [7] },
  { name: "node1", id: 24, description: "Art", parent: [7] },
  { name: "node1", id: 25, description: "Tools", parent: [8] },
  { name: "node1", id: 26, description: "Systems", parent: [8] },
  { name: "node1", id: 27, description: "Ecology", parent: [9] },
  { name: "node1", id: 28, description: "Evolution", parent: [9] },
  { name: "node1", id: 29, description: "Purpose", parent: [10] },
  { name: "node1", id: 30, description: "Value", parent: [10] },
];

export const worldviews: Record<
  string,
  { label: string; nodes: KnowledgeNode[] }
> = {
  wokki: { label: "Wokki", nodes: BASE_NODES },
  abcdxyz: { label: "abcd....xyz", nodes: BASE_NODES },
};

/**
 * Hand-tuned 2D positions for the 11 root + first-tier nodes (id 0–10).
 * Used only for the visible cluster at the top of the canvas; downstream
 * nodes are placed procedurally by `getNodePosition`.
 */
export const nodePositions: Record<number, { x: number; y: number }> = {
  0: { x: 50, y: 50 },
  1: { x: 22, y: 30 },
  2: { x: 78, y: 30 },
  3: { x: 10, y: 55 },
  4: { x: 30, y: 72 },
  5: { x: 70, y: 72 },
  6: { x: 90, y: 55 },
  7: { x: 50, y: 18 },
  8: { x: 84, y: 86 },
  9: { x: 16, y: 86 },
  10: { x: 50, y: 88 },
};

export const TOTAL_NODES = 1111;
