"use client";

import {
  OrganizationSwitcher,
  UserButton,
  useOrganization,
} from "@clerk/nextjs";
import { SearchInput } from "./search-input";
import { InviteButton } from "./invite-button";

export const Navbar = () => {

  return (
    <div className="flex items-center gap-x-4 p-5 bg-white">
      <div className="hidden lg:flex lg:flex-1">
        <SearchInput />
      </div>
    </div>
  );
};
