"use client";
import { useAnimateScheme } from "@/app/store/use-animate-scheme";
import { memo, useEffect } from "react";
import {
  Edge,
  Node,
  NodeResizer,
  useEdges,
  useNodeId,
  useNodes,
} from "reactflow";
import useStore from "@/app/store/use-store";
import { StructType } from "@/app/types/structs";
import { StyledNode } from "./styled-node";

interface DataProps {
  data: {
    label: string;
    struct: StructType;
    name: string;
  };
  selected: boolean;
}

const GateNode = ({ data: { label, struct, name }, selected }: DataProps) => {
  const { isPlay, onStop, onReset, time } = useAnimateScheme();
  const { setNodeLabel, getEdgeValues } = useStore();
  const nodeId = useNodeId();
  const edges = useEdges();
  const nodes = useNodes();

  useEffect(() => {
    let intervalId = null;
    if (!isPlay) {
      setNodeLabel(nodeId, "not");
    } else {
      setNodeLabel(nodeId, "worked");
      let sourceEdge: Edge = edges.find((edge) => edge?.target === nodeId);
      // тут в sourceEdge.data хранится значение количество ресурсов
      let targetEdge: Edge = edges.find((edge) => edge?.source === nodeId);

      // тут в targetEdge.data хранится значение количества млсекунд * 1000 - то что задержка

      let targetNodeId: Node = nodes.find(
        (node) => node.id === targetEdge?.target
      );
      let initialData = +sourceEdge?.data || 0;

      intervalId = setInterval(() => {
        // Увеличиваем значение sourceEdge.data каждую секунду на 1
        initialData += +sourceEdge?.data;

        // Обновляем метку узла с новым значением sourceEdge.data
        setNodeLabel(targetNodeId?.id, +initialData);
      }, time * 1000); // Интервал в миллисекундах (1000 миллисекунд = 1 секунда)
    }
    return () => clearInterval(intervalId);
  }, [isPlay, onStop, onReset]);

  return (
    <>
      <NodeResizer
        color="blue"
        isVisible={selected}
        minWidth={45}
        minHeight={45}
      />
      <StyledNode struct={struct} label={label} name={name} />
    </>
  );
};

export default memo(GateNode);
