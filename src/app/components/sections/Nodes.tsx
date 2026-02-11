"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Section from "./Section";
import SectionTitle from "./SectionTitle";

type KnowledgeNode = {
  name: string;
  id: number;
  description: string;
  parent: number[];
};

type UserRole = "元" | "insider" | "outsider" | "妃";

const privilegeRootsByEmail: Record<string, number[]> = {
  "hanwokki@gmail.com": [1],
  "seeker.wokki@gmail.com": [1],
  "christine.huingaman@gmail.com": [1],
};

const privilegeRootsByRole: Record<UserRole, number[]> = {
  元: [0],
  insider: [1],
  outsider: [],
  妃: [1],
};

const worldviews: Record<string, { label: string; nodes: KnowledgeNode[] }> = {
  wokki: {
    label: "Wokki",
    nodes: [
      {
        name: "node1",
        id: 0,
        description: "元",
        parent: [],
      },
      {
        name: "node1",
        id: 1,
        description: "Mind",
        parent: [0],
      },
      {
        name: "node1",
        id: 2,
        description: "Matter",
        parent: [0],
      },
      {
        name: "node1",
        id: 3,
        description: "Form",
        parent: [0],
      },
      {
        name: "node1",
        id: 4,
        description: "Energy",
        parent: [0],
      },
      {
        name: "node1",
        id: 5,
        description: "Life",
        parent: [0],
      },
      {
        name: "node1",
        id: 6,
        description: "Society",
        parent: [0],
      },
      {
        name: "node1",
        id: 7,
        description: "Culture",
        parent: [0],
      },
      {
        name: "node1",
        id: 8,
        description: "Technology",
        parent: [0],
      },
      {
        name: "node1",
        id: 9,
        description: "Nature",
        parent: [0],
      },
      {
        name: "node1",
        id: 10,
        description: "Meaning",
        parent: [0],
      },
      {
        name: "node1",
        id: 11,
        description: "Perception",
        parent: [1],
      },
      {
        name: "node1",
        id: 12,
        description: "Memory",
        parent: [1],
      },
      {
        name: "node1",
        id: 13,
        description: "Substance",
        parent: [2],
      },
      {
        name: "node1",
        id: 14,
        description: "Structure",
        parent: [2],
      },
      {
        name: "node1",
        id: 15,
        description: "Symmetry",
        parent: [3],
      },
      {
        name: "node1",
        id: 16,
        description: "Pattern",
        parent: [3],
      },
      {
        name: "node1",
        id: 17,
        description: "Force",
        parent: [4],
      },
      {
        name: "node1",
        id: 18,
        description: "Motion",
        parent: [4],
      },
      {
        name: "node1",
        id: 19,
        description: "Growth",
        parent: [5],
      },
      {
        name: "node1",
        id: 20,
        description: "Adaptation",
        parent: [5],
      },
      {
        name: "node1",
        id: 21,
        description: "Governance",
        parent: [6],
      },
      {
        name: "node1",
        id: 22,
        description: "Economy",
        parent: [6],
      },
      {
        name: "node1",
        id: 23,
        description: "Language",
        parent: [7],
      },
      {
        name: "node1",
        id: 24,
        description: "Art",
        parent: [7],
      },
      {
        name: "node1",
        id: 25,
        description: "Tools",
        parent: [8],
      },
      {
        name: "node1",
        id: 26,
        description: "Systems",
        parent: [8],
      },
      {
        name: "node1",
        id: 27,
        description: "Ecology",
        parent: [9],
      },
      {
        name: "node1",
        id: 28,
        description: "Evolution",
        parent: [9],
      },
      {
        name: "node1",
        id: 29,
        description: "Purpose",
        parent: [10],
      },
      {
        name: "node1",
        id: 30,
        description: "Value",
        parent: [10],
      },
    ],
  },
  abcdxyz: {
    label: "abcd....xyz",
    nodes: [
      {
        name: "node1",
        id: 0,
        description: "元",
        parent: [],
      },
      {
        name: "node1",
        id: 1,
        description: "Mind",
        parent: [0],
      },
      {
        name: "node1",
        id: 2,
        description: "Matter",
        parent: [0],
      },
      {
        name: "node1",
        id: 3,
        description: "Form",
        parent: [0],
      },
      {
        name: "node1",
        id: 4,
        description: "Energy",
        parent: [0],
      },
      {
        name: "node1",
        id: 5,
        description: "Life",
        parent: [0],
      },
      {
        name: "node1",
        id: 6,
        description: "Society",
        parent: [0],
      },
      {
        name: "node1",
        id: 7,
        description: "Culture",
        parent: [0],
      },
      {
        name: "node1",
        id: 8,
        description: "Technology",
        parent: [0],
      },
      {
        name: "node1",
        id: 9,
        description: "Nature",
        parent: [0],
      },
      {
        name: "node1",
        id: 10,
        description: "Meaning",
        parent: [0],
      },
      {
        name: "node1",
        id: 11,
        description: "Perception",
        parent: [1],
      },
      {
        name: "node1",
        id: 12,
        description: "Memory",
        parent: [1],
      },
      {
        name: "node1",
        id: 13,
        description: "Substance",
        parent: [2],
      },
      {
        name: "node1",
        id: 14,
        description: "Structure",
        parent: [2],
      },
      {
        name: "node1",
        id: 15,
        description: "Symmetry",
        parent: [3],
      },
      {
        name: "node1",
        id: 16,
        description: "Pattern",
        parent: [3],
      },
      {
        name: "node1",
        id: 17,
        description: "Force",
        parent: [4],
      },
      {
        name: "node1",
        id: 18,
        description: "Motion",
        parent: [4],
      },
      {
        name: "node1",
        id: 19,
        description: "Growth",
        parent: [5],
      },
      {
        name: "node1",
        id: 20,
        description: "Adaptation",
        parent: [5],
      },
      {
        name: "node1",
        id: 21,
        description: "Governance",
        parent: [6],
      },
      {
        name: "node1",
        id: 22,
        description: "Economy",
        parent: [6],
      },
      {
        name: "node1",
        id: 23,
        description: "Language",
        parent: [7],
      },
      {
        name: "node1",
        id: 24,
        description: "Art",
        parent: [7],
      },
      {
        name: "node1",
        id: 25,
        description: "Tools",
        parent: [8],
      },
      {
        name: "node1",
        id: 26,
        description: "Systems",
        parent: [8],
      },
      {
        name: "node1",
        id: 27,
        description: "Ecology",
        parent: [9],
      },
      {
        name: "node1",
        id: 28,
        description: "Evolution",
        parent: [9],
      },
      {
        name: "node1",
        id: 29,
        description: "Purpose",
        parent: [10],
      },
      {
        name: "node1",
        id: 30,
        description: "Value",
        parent: [10],
      },
    ],
  },
};

const nodePositions: Record<number, { x: number; y: number }> = {
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

const TOTAL_NODES = 1111;
const generateNodes = (baseNodes: KnowledgeNode[]) => {
  const generatedNodes: KnowledgeNode[] = Array.from(
    { length: TOTAL_NODES - baseNodes.length },
    (_, index) => {
      const id = baseNodes.length + index;
      const parentId = Math.max(0, Math.floor((id - 1) / 10));
      return {
        name: "node",
        id,
        description: `Node ${id}`,
        parent: parentId === id ? [0] : [parentId],
      };
    },
  );
  const allNodes = [...baseNodes, ...generatedNodes];
  const edges = allNodes.flatMap((node) =>
    node.parent.map((parentId) => ({
      from: parentId,
      to: node.id,
    })),
  );
  return { allNodes, edges };
};

const buildChildrenMap = (nodes: KnowledgeNode[]) => {
  const map = new Map<number, number[]>();
  nodes.forEach((node) => {
    node.parent.forEach((parentId) => {
      const existing = map.get(parentId);
      if (existing) {
        existing.push(node.id);
      } else {
        map.set(parentId, [node.id]);
      }
    });
  });
  return map;
};

const collectDescendants = (
  nodes: KnowledgeNode[],
  rootIds: number[],
  maxDepth?: number,
) => {
  const childrenMap = buildChildrenMap(nodes);
  const visited = new Set<number>();
  const depths = new Map<number, number>();
  const queue: number[] = [];

  rootIds.forEach((rootId) => {
    visited.add(rootId);
    depths.set(rootId, 0);
    queue.push(rootId);
  });

  while (queue.length > 0) {
    const current = queue.shift();
    if (current === undefined) {
      continue;
    }
    const depth = depths.get(current) ?? 0;
    if (maxDepth !== undefined && depth >= maxDepth) {
      continue;
    }
    const children = childrenMap.get(current) ?? [];
    for (const childId of children) {
      if (!visited.has(childId)) {
        visited.add(childId);
        depths.set(childId, depth + 1);
        queue.push(childId);
      }
    }
  }

  return visited;
};

const goldenAngle = 2.399963229728653;

const getNodePosition = (id: number) => {
  const pinned = nodePositions[id];
  if (pinned) {
    return pinned;
  }
  const index = id - 1;
  const t = index / Math.max(TOTAL_NODES - 2, 1);
  const radius = 12 + t * 36;
  const angle = index * goldenAngle;
  return {
    x: 50 + Math.cos(angle) * radius,
    y: 50 + Math.sin(angle) * radius,
  };
};

export default function Nodes() {
  const { data: session } = useSession();
  const [selectedNodeId, setSelectedNodeId] = React.useState<number | null>(
    null,
  );
  const [selectedWorldview, setSelectedWorldview] = React.useState("wokki");
  const [rootDepth, setRootDepth] = React.useState(3);
  const { allNodes, edges } = React.useMemo(
    () => generateNodes(worldviews[selectedWorldview].nodes),
    [selectedWorldview],
  );
  const privilegedRootIds = React.useMemo(() => {
    const email = session?.user?.email?.toLowerCase();
    const role = (session?.user?.role ?? "guest") as UserRole;
    if (email && privilegeRootsByEmail[email]) {
      return privilegeRootsByEmail[email];
    }
    return privilegeRootsByRole[role] ?? [];
  }, [session?.user?.email, session?.user?.role]);
  const accessNodeIds = React.useMemo(() => {
    if (privilegedRootIds.length === 0) {
      return new Set<number>();
    }
    return collectDescendants(allNodes, privilegedRootIds);
  }, [allNodes, privilegedRootIds]);
  const visibleNodes = React.useMemo(
    () => allNodes.filter((node) => accessNodeIds.has(node.id)),
    [allNodes, accessNodeIds],
  );
  const visibleEdges = React.useMemo(
    () =>
      edges.filter(
        (edge) => accessNodeIds.has(edge.from) && accessNodeIds.has(edge.to),
      ),
    [edges, accessNodeIds],
  );
  const worldviewLabel = "Worldview";
  const maxWorldviewLength = Math.max(
    worldviewLabel.length,
    ...Object.values(worldviews).map((worldview) => worldview.label.length),
  );
  const selectWidthCh = maxWorldviewLength + worldviewLabel.length + 2;
  const selectedNode =
    selectedNodeId !== null
      ? (visibleNodes.find((node) => node.id === selectedNodeId) ?? null)
      : null;
  const parentIds = selectedNode?.parent ?? [];
  const parentNodes = parentIds
    .map((parentId) => visibleNodes.find((node) => node.id === parentId))
    .filter((node): node is KnowledgeNode => Boolean(node));
  const rootNode = visibleNodes.find((node) => node.id === 0) ?? null;
  const rootNodeId = rootNode?.id ?? null;
  const siblingNodes = selectedNode
    ? visibleNodes
        .filter(
          (node) =>
            node.id !== selectedNode.id &&
            node.parent.some((parentId) => parentIds.includes(parentId)),
        )
        .sort((a, b) => a.id - b.id)
    : [];
  const childNodes = selectedNode
    ? visibleNodes
        .filter((node) => node.parent.includes(selectedNode.id))
        .sort((a, b) => a.id - b.id)
    : [];
  const isTreeView = selectedNodeId !== null && selectedNodeId !== 0;
  const middleNodes = selectedNode
    ? [...siblingNodes, selectedNode].sort((a, b) => a.id - b.id)
    : siblingNodes;
  const rootDescendants = React.useMemo(() => {
    const rootStartIds = rootNodeId !== null ? [rootNodeId] : privilegedRootIds;
    if (visibleNodes.length === 0 || rootStartIds.length === 0) {
      return new Set<number>();
    }
    const maxDepth = Math.max(0, rootDepth);
    return collectDescendants(visibleNodes, rootStartIds, maxDepth);
  }, [privilegedRootIds, rootDepth, rootNodeId, visibleNodes]);
  const rootViewNodes = visibleNodes.filter((node) =>
    rootDescendants.has(node.id),
  );
  const rootViewEdges = visibleEdges.filter(
    (edge) => rootDescendants.has(edge.from) && rootDescendants.has(edge.to),
  );

  React.useEffect(() => {
    if (visibleNodes.length === 0) {
      if (selectedNodeId !== null) {
        setSelectedNodeId(null);
      }
      return;
    }
    if (selectedNodeId !== null && !accessNodeIds.has(selectedNodeId)) {
      setSelectedNodeId(privilegedRootIds[0] ?? visibleNodes[0].id);
      return;
    }
    if (selectedNodeId === null && !accessNodeIds.has(0)) {
      setSelectedNodeId(privilegedRootIds[0] ?? visibleNodes[0].id);
    }
  }, [accessNodeIds, privilegedRootIds, selectedNodeId, visibleNodes]);
  const treeTierPositions = (
    tierNodes: KnowledgeNode[],
    y: number,
    spread = 70,
  ) => {
    if (tierNodes.length === 0) {
      return new Map<number, { x: number; y: number }>();
    }
    if (tierNodes.length === 1) {
      return new Map([[tierNodes[0].id, { x: 50, y }]]);
    }
    const start = 50 - spread / 2;
    const step = spread / (tierNodes.length - 1);
    return new Map(
      tierNodes.map((node, index) => [node.id, { x: start + step * index, y }]),
    );
  };
  const rootPositions = rootNode
    ? new Map([[rootNode.id, { x: 50, y: 10 }]])
    : new Map<number, { x: number; y: number }>();
  const parentPositions = treeTierPositions(parentNodes, 32);
  const middlePositions = treeTierPositions(middleNodes, 62);
  const childPositions = treeTierPositions(childNodes, 88);

  return (
    <Section id="nodes" minHeight="screen" paddingY="md" centerContent={false}>
      <SectionTitle>NODE(S)</SectionTitle>
      <div className="relative mt-8 rounded-3xl border border-foreground/10 bg-background/60 p-6 shadow-sm">
        <div className="absolute right-[15px] top-[15px] z-20 flex flex-col items-end gap-2">
          <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-foreground/60">
            <span>Worldview</span>
            <select
              value={selectedWorldview}
              onChange={(event) => setSelectedWorldview(event.target.value)}
              style={{ width: `${selectWidthCh}ch` }}
              className="cursor-pointer rounded-full border border-foreground/20 bg-background/80 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-foreground/70 shadow-sm backdrop-blur transition-colors hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            >
              {Object.entries(worldviews).map(([key, worldview]) => (
                <option key={key} value={key}>
                  {worldview.label}
                </option>
              ))}
            </select>
          </div>
          <div className="w-[200px] rounded-2xl border border-foreground/10 bg-background/70 p-3 shadow-sm">
            <p className="text-[9px] uppercase tracking-[0.2em] text-foreground/50">
              Selector
            </p>
            <label className="mt-2 block text-xs font-semibold">
              Node Number
            </label>
            <input
              type="number"
              min={0}
              max={TOTAL_NODES - 1}
              value={selectedNodeId ?? ""}
              onChange={(event) => {
                const value = event.target.value;
                if (value === "") {
                  setSelectedNodeId(null);
                  return;
                }
                const parsed = Number.parseInt(value, 10);
                if (Number.isNaN(parsed)) {
                  setSelectedNodeId(null);
                  return;
                }
                const clamped = Math.min(Math.max(parsed, 0), TOTAL_NODES - 1);
                if (!accessNodeIds.has(clamped)) {
                  setSelectedNodeId(null);
                  return;
                }
                setSelectedNodeId(clamped);
              }}
              disabled={visibleNodes.length === 0}
              className="mt-2 w-full rounded-xl border border-foreground/10 bg-background px-3 py-2 text-xs text-foreground shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="0 - 1110"
            />
            <p className="mt-2 text-[10px] text-foreground/50">
              Range: 0 - {TOTAL_NODES - 1}
            </p>
          </div>
        </div>
        <div className="grid gap-6">
          <div className="relative mx-auto h-[420px] w-full max-w-5xl md:h-[520px]">
            {visibleNodes.length === 0 ? (
              <div className="flex h-full items-center justify-center rounded-3xl border border-dashed border-foreground/15 bg-background/70 text-center text-sm text-foreground/60">
                Your account does not have access to this tree.
              </div>
            ) : isTreeView ? (
              <div className="relative h-full w-full">
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  {rootNode
                    ? parentNodes.map((parent) => {
                        const from = rootPositions.get(rootNode.id);
                        const to = parentPositions.get(parent.id);
                        if (!from || !to) {
                          return null;
                        }
                        const isDirectChild = parent.parent.includes(0);
                        return (
                          <line
                            key={`r-${rootNode.id}-${parent.id}`}
                            x1={from.x}
                            y1={from.y}
                            x2={to.x}
                            y2={to.y}
                            stroke="currentColor"
                            strokeOpacity="0.35"
                            strokeWidth="0.6"
                            strokeDasharray={
                              isDirectChild ? undefined : "1.2 1.6"
                            }
                          />
                        );
                      })
                    : null}
                  {middleNodes.flatMap((node) =>
                    node.parent
                      .filter((parentId) => parentIds.includes(parentId))
                      .map((parentId) => {
                        const from = parentPositions.get(parentId);
                        const to = middlePositions.get(node.id);
                        if (!from || !to) {
                          return null;
                        }
                        return (
                          <line
                            key={`p-${parentId}-${node.id}`}
                            x1={from.x}
                            y1={from.y}
                            x2={to.x}
                            y2={to.y}
                            stroke="currentColor"
                            strokeOpacity="0.25"
                            strokeWidth="0.6"
                          />
                        );
                      }),
                  )}
                  {selectedNode
                    ? childNodes.map((node) => {
                        const from = middlePositions.get(selectedNode.id);
                        const to = childPositions.get(node.id);
                        if (!from || !to) {
                          return null;
                        }
                        return (
                          <line
                            key={`c-${selectedNode.id}-${node.id}`}
                            x1={from.x}
                            y1={from.y}
                            x2={to.x}
                            y2={to.y}
                            stroke="currentColor"
                            strokeOpacity="0.25"
                            strokeWidth="0.6"
                          />
                        );
                      })
                    : null}
                </svg>

                {[rootNode, ...parentNodes, ...middleNodes, ...childNodes]
                  .filter((node): node is KnowledgeNode => Boolean(node))
                  .map((node) => {
                    const isSelected = selectedNodeId === node.id;
                    const position =
                      rootPositions.get(node.id) ??
                      parentPositions.get(node.id) ??
                      middlePositions.get(node.id) ??
                      childPositions.get(node.id);
                    if (!position) {
                      return null;
                    }
                    return (
                      <div
                        key={node.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedNodeId(node.id)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            setSelectedNodeId(node.id);
                          }
                        }}
                        className={`absolute z-10 cursor-pointer transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                          isSelected ? "z-30" : ""
                        }`}
                        style={{
                          left: `${position.x}%`,
                          top: `${position.y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <div
                          className={`rounded-2xl border border-foreground/10 bg-background/80 px-3 py-2 text-center shadow-sm ${
                            isSelected
                              ? "ring-2 ring-accent shadow-md"
                              : "ring-1 ring-transparent"
                          }`}
                        >
                          <div className="text-[9px] uppercase tracking-[0.2em] text-foreground/50">
                            Node {node.id}
                          </div>
                          <div className="mt-1 text-sm font-semibold text-foreground">
                            {node.description}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <>
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  {rootViewEdges.map((edge) => {
                    const from = getNodePosition(edge.from);
                    const to = getNodePosition(edge.to);
                    if (!from || !to) {
                      return null;
                    }
                    return (
                      <line
                        key={`${edge.from}-${edge.to}`}
                        x1={from.x}
                        y1={from.y}
                        x2={to.x}
                        y2={to.y}
                        stroke="currentColor"
                        strokeOpacity="0.2"
                        strokeWidth="0.6"
                      />
                    );
                  })}
                </svg>

                {rootViewNodes.map((node) => {
                  const position = getNodePosition(node.id);
                  if (!position) {
                    return null;
                  }
                  const isRoot = node.id === 0;
                  const isSelected = selectedNodeId === node.id;
                  return (
                    <div
                      key={node.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedNodeId(node.id)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          setSelectedNodeId(node.id);
                        }
                      }}
                      className={`absolute z-10 cursor-pointer hover:z-30 ${
                        isSelected ? "z-30" : ""
                      }`}
                      style={{
                        left: `${position.x}%`,
                        top: `${position.y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <div
                        className={`rounded-2xl border border-foreground/10 bg-background/80 px-3 py-2 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                          isRoot ? "ring-1 ring-accent/50" : ""
                        } ${
                          isSelected
                            ? "ring-2 ring-accent shadow-md"
                            : "ring-1 ring-transparent"
                        }`}
                      >
                        <div className="text-[9px] uppercase tracking-[0.2em] text-foreground/50">
                          Node {node.id}
                        </div>
                        <div className="mt-1 text-sm font-semibold text-foreground">
                          {node.description}
                        </div>
                        {isRoot ? (
                          <div className="mt-3 flex items-center justify-between gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-foreground/70 shadow-sm">
                            <span>Levels</span>
                            <select
                              value={rootDepth}
                              onChange={(event) =>
                                setRootDepth(Number(event.target.value))
                              }
                              className="cursor-pointer rounded-full border border-accent/70 bg-background px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-foreground shadow-[0_0_12px_rgba(217,119,6,0.25)] transition-colors hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40 focus:bg-accent/10 focus:text-accent"
                            >
                              {[1, 2, 3, 4, 5].map((level) => (
                                <option key={level} value={level}>
                                  {level}
                                </option>
                              ))}
                            </select>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
