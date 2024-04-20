import React, { useCallback, useState, useEffect, useRef } from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Panel,
  ReactFlowProvider
} from "reactflow";

import "reactflow/dist/style.css";

import { initialNodes, nodeTypes } from "./nodes";
import { initialEdges, edgeTypes } from "./edges";
import NodesPanel from "./panel/NodesPanel";
import { validateIfConnected } from "./utils/validate";

export default function App() {
  const reactFlowWrapper = useRef(null);
  const textRef = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [nodeName, setNodeName] = useState("Node 1");
  const [error, setError] = useState(false)

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, markerEnd: { type: "arrowclosed" } }, eds)
      ),
    [setEdges]
  );

  const onInit = (reactFlowInstance) => setReactFlowInstance(reactFlowInstance);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

    const type = event.dataTransfer.getData("application/reactflow");
    const label = event.dataTransfer.getData("message");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top
    });
    const newNode = {
      id: Date.now().toString(),
      type,
      position,
      data: { heading: "Send Message", message: label },
    };
    setNodes((es) => es.concat(newNode));
    setSelectedNode(newNode.id);
  };

  useEffect(() => {
    const node = nodes.find((node) => node.selected);
    setIsSelected(!!node);
    setSelectedNode(node || null);
  }, [nodes]);

  useEffect(() => {
    setNodeName(selectedNode?.data?.message || "");
  }, [selectedNode]);

  useEffect(() => {
    textRef.current?.focus();
  }, [selectedNode]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode?.id) {
          node.data = {
            ...node.data,
            message: nodeName || " "
          };
        }
        return node;
      })
    );
  }, [nodeName, selectedNode, setNodes]);

  const saveHandler = () => {
    if (validateIfConnected(nodes, edges)) {
      setError(false)
      alert("Success");
    } else {
      setError(true)
    }
  };

  return (
    <ReactFlowProvider>
      <div ref={reactFlowWrapper} style={{ height: "100vh", width: "100vw" }}>
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          edges={edges}
          edgeTypes={edgeTypes}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={onInit}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
        >
          <div className="top-panel">
            {error && <Panel position="top-center">
              <div className="error-div">Cannot Save Flow</div>
            </Panel>}
            <Panel position="top-right">
              <button onClick={saveHandler}>Save Changes</button>
            </Panel>
          </div>
          <Panel position="top-right">
            <NodesPanel
              isSelected={isSelected}
              textRef={textRef}
              nodeName={nodeName}
              setNodeName={setNodeName}
            />
          </Panel>
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}
