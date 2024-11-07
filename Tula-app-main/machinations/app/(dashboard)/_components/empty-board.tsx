"use client";
import { v4 as uuidv4 } from 'uuid';

import { useRouter } from "next/navigation";

import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";

import { useApiMutation } from "@/app/hooks/use-api-mutation";
import { toast } from "sonner";

export const EmptyBoard = () => {
  const router = useRouter();

  const onClick = () => {
    toast.success("Board created");
    router.push(`/test/${uuidv4()}`);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="text-xl font-semibold">Empty now</div>
      <h2 className="text-2xl font-semibold mt-6">Create your first board!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button disabled={false} onClick={onClick} size="lg">
          Create board
        </Button>
      </div>
    </div>
  );
};
