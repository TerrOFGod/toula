"use client";
import { v4 as uuidv4 } from 'uuid';
import { BoardList } from "./_components/board-list";
import { EmptyOrganization } from "./_components/empty-org";
import { useOrganization } from "@clerk/nextjs";

interface DashboardPageProps {
  searchParams: {
    search?: string;
    favorites?: string;
  };
}

const DashboardPage = ({ searchParams }: DashboardPageProps) => {

  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
        <BoardList orgId={uuidv4()} query={searchParams} />

    </div>
  );
};

export default DashboardPage;
