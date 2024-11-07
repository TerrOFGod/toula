import { useChangeEdgeType } from "@/app/store/use-custom-edge";
import useStore from "@/app/store/use-store";
import React, { useEffect, useState } from "react";

import {
  BaseEdge,
  BezierEdge,
  EdgeLabelRenderer,
  EdgeProps,
  StepEdge,
  getBezierPath,
  getStraightPath,
} from "reactflow";

export default function CustomEdge(props: EdgeProps) {

  const { error, setError, currentType } = useChangeEdgeType();
  const [localError, setLocalError] = useState<string | null>(null);

  const { setEdgeData } = useStore();
  const {
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    id,
    data
  } = props;
  const initial = data.data 
  const [inputValue, setInputValue] = useState<number>(initial);
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [basePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const onChange = (event: any) => {
    setInputValue(event.target.value);
    setEdgeData(id, event.target.value);
  };

  useEffect(() => {
    if (typeof +inputValue !== "number" || isNaN(+inputValue)) {
      setLocalError("Must be a numeric");
      setError("error");
    } else {
      setLocalError(null);
      setError(null);
    }
  }, [inputValue]);

  return (
    <>
      {currentType === "SmoothStep" && <StepEdge {...props} />}
      {currentType === "Default" && <BaseEdge path={basePath} {...props} />}
      {currentType == "Bezier" && <BezierEdge {...props} />}
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          <input
            className={
              localError
                ? "border-2 border-red-500 w-16 h-7 text-center rounded-sm"
                : "w-16 h-7 text-center rounded-sm"
            }
            value={inputValue}
            onChange={onChange}
          />
          {localError && (
            <p className="text-center text-2 font-bold text-red-500">
              {localError}
            </p>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
