import React from "react";
import "reactflow/dist/style.css";
import "./nodePanel.css";

const NodesPanel = ({ isSelected, textRef, nodeName, setNodeName }) => {
  const onDragStart = (event, nodeType, content) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("message", content);
    event.dataTransfer.effectAllowed = "move";
  };

  const renderNodePanel = () => {
    return (
      <div className="nodes-panel-wrapper">
        {isSelected ? (
          <SelectedPanel textRef={textRef} nodeName={nodeName} setNodeName={setNodeName} />
        ) : (
          <DraggablePanel onDragStart={onDragStart} />
        )}
      </div>
    );
  };

  return <>{renderNodePanel()}</>;
};

const SelectedPanel = ({ textRef, nodeName, setNodeName }) => {
  return (
    <div className="updatenode__controls edit_node_panel">
      <div className="edit_node_header">
        <div className="back_btn">
          <img src="https://cdn-icons-png.flaticon.com/512/9312/9312240.png" />
        </div>
        <p>Message</p>
      </div>
      <hr />
      <label>Text</label>
      <textarea ref={textRef} value={nodeName} onChange={(evt) => setNodeName(evt.target.value)} />
    </div>
  );
};

const DraggablePanel = ({ onDragStart }) => {
  return (
    <div className="draggable_input_node input" onDragStart={(event) => onDragStart(event, "text-node", "message")} draggable>
      <img src="https://cdn-icons-png.flaticon.com/128/1370/1370907.png" />
      <p>Message</p>
    </div>
  );
};

export default NodesPanel;
