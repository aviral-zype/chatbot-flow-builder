import React from "react";
import { Handle, Position } from "reactflow";
import './textNode.css';

export function TextNode({ xPos, yPos, data }) {

    return (
        <div className="react-flow__node-default">
            <div className="text-node">
                <div className="heading-wrapper">
                    <div>
                        <img src="https://cdn-icons-png.flaticon.com/128/1370/1370907.png" />
                        {data.heading && <span>{data.heading}</span>}
                    </div>
                    <img src="https://cdn-icons-png.flaticon.com/128/2626/2626279.png" />
                </div>
                <div className="message-wrapper">{data.message && <span>{data.message}</span>}</div>
            </div>
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
        </div>
    );
}
