"use client";
import "reactflow/dist/style.css";
import ReactFlow, { Controls, Background, Panel } from "reactflow";
import { shallow } from "zustand/shallow";
import { useMyPresence, useOthers } from "@/liveblocks.config";
import { Cursor } from "./cursor";
import { Toolbar } from "./panels/toolbar";
import { BottomPanel } from "./panels/bottom-panel";
import { DownloadBtn } from "./ui/download-btn";
import useStore, { RFState } from "@/app/store/use-store";
import { edgeTypes, nodeTypes } from "@/app/types/structs";
import { useCallback, useEffect, useRef, useState } from "react";
import ContextMenu from "./context-menu";
import { useChangeEdgeType } from "@/app/store/use-custom-edge";
import { Metrics } from "./metrics/metrics";
import EditorComponent from "./editor/editorCoder";
import "./../style-test.css";
import { useRenameModal } from "@/app/store/use-rename-modal";
import InfoBoardComponent from "./infoBoard/infoBoard";
import { ToolButton } from "./ui/tool-button";
import { FileJson2, LayoutDashboard } from "lucide-react";

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  deleteNode: state.deleteNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  addNode: state.addNode,
});
interface FlowProps {
  boardId: string;
}

interface IContextMenu {
  id: string;
  top: number;
  left: number;
  right: number | boolean;
  bottom: number | boolean;
}

const Flow = ({ boardId }: FlowProps) => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, deleteNode } =
    useStore(selector, shallow);
  const [{ cursor }, updateMyPresence] = useMyPresence();
  const others = useOthers();
  const { isVisibleEditor, setIsVisisble, isVisibleBoard, setIsVisisbleBoard } =
    useRenameModal();
  const { analytics, setAnalytics } = useChangeEdgeType();
  const [menu, setMenu] = useState<IContextMenu | null>(null);
  const ref = useRef(null);

  const onNodeContextMenu = useCallback(
    (event: any, node: any) => {
      event.preventDefault();
      //@ts-ignore
      const pane = ref.current?.getBoundingClientRect();
      let menu = {
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width + 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY,
      };
      setMenu(menu);
    },
    [setMenu]
  );

  const onPaneClick = useCallback(() => {
    setMenu(null);
  }, [setMenu]);

  return (
    <main
      className="h-full w-full relative bg-neutral-100 touch-none"
      onPointerMove={(event) => {
        updateMyPresence({
          cursor: {
            x: Math.round(event.clientX),
            y: Math.round(event.clientY),
          },
        });
      }}
      onPointerLeave={() =>
        updateMyPresence({
          cursor: null,
        })
      }
    >
      {!isVisibleEditor && (
        <div className="z-10 w-full relative">
          <Toolbar />
        </div>
      )}

      {others.map(({ connectionId, presence }) => {
        if (presence.cursor === null) {
          return null;
        }
        return <Cursor key={connectionId} connectionId={connectionId} />;
      })}

      <ReactFlow
        ref={ref}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onPaneClick={onPaneClick}
        onNodeContextMenu={onNodeContextMenu}
      >
        {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
        <Controls position="bottom-right" />

        {isVisibleEditor && (
          <Panel position="top-left" className="position_panel">
            <EditorComponent />
          </Panel>
        )}

        <Panel position="top-center">
          <div className="bg-white rounded-md p-1.5 flex gap-x-2 items-center shadow-md">
            <ToolButton
              label="Editor"
              onClick={setIsVisisble}
              isActive={false}
              icon={FileJson2}
            />
            <DownloadBtn />
            <ToolButton
              label="Board"
              onClick={setIsVisisbleBoard}
              isActive={false}
              icon={LayoutDashboard}
            />
          </div>
        </Panel>

        {!analytics && isVisibleBoard && (
          <Panel position="top-right" className="info_panel">
            <InfoBoardComponent boardId={boardId} />
          </Panel>
        )}
        <Background color="blue" gap={16} className="bg-blue-100" />
        {analytics && <Metrics />}
        <BottomPanel />
      </ReactFlow>
    </main>
  );
};

export default Flow;
