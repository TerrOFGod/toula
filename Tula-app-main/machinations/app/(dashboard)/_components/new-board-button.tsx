"use client";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/app/hooks/use-api-mutation";

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}

export const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    toast.success("Board created");
    router.push(`/test/${uuidv4()}`);
  };

  return (
    <button
      disabled={false}
      onClick={onClick}
      className={cn(
        "col-span-1 aspect-[100/130] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
        (false) &&
          "opacity-75 hover:bg-blue-600 cursor-not-allowed"
      )}
    >
      <div />
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-sm text-white font-light">Create new board</p>
    </button>
  );
};
