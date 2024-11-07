import { useChangeEdgeType } from "@/app/store/use-custom-edge";
import React from "react";

export const EdgeTypePanel = () => {
  const { onChangeType, currentType } = useChangeEdgeType();
  return (
    <div className="flex gap-x-2 items-center">
      <button
        className={`bg-blue-100 rounded-md p-2 ${
          currentType === "Default" ? "bg-blue-500 text-white" : ""
        }`}
        onClick={() => onChangeType("Default")}
      >
        Default
      </button>
      <button
        className={`bg-blue-100 rounded-md p-2 ${
          currentType === "SmoothStep" ? "bg-blue-500 text-white" : ""
        }`}
        onClick={() => onChangeType("SmoothStep")}
      >
        SmoothStep
      </button>
      <button
        className={`bg-blue-100 rounded-md mr-16 p-2 ${
          currentType === "Bezier" ? "bg-blue-500 text-white" : ""
        }`}
        onClick={() => onChangeType("Bezier")}
      >
        Bezier
      </button>
    </div>
  );
};
