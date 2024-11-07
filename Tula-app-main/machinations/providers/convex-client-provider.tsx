"use client";

import {  
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton, 
  ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProvider } from "convex/react";
import { AuthLoading, Authenticated, ConvexReactClient } from "convex/react";
import { Loading } from "@/components/loading";

interface ConvexClientProviderProps {
  children: React.ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider = ({
  children,
}: ConvexClientProviderProps) => {
  return (
      <ConvexProvider client={convex}>
        {children}
      </ConvexProvider>
  );
};
