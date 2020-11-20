import React from "react";
import tw, { styled } from "twin.macro";

import UserInformation from "@components/molecules/UserInformation";

import Search from "@assets/icons/outline/search.svg";
import { NavigationList } from "./NavigationList";

export const NavigationItem = styled.li`
  ${tw`flex items-center space-x-4 hover:bg-gray-300 p-2 cursor-pointer rounded`}
  > svg {
    ${tw`h-6 w-6`}
  }
`;

const NavBar: React.FunctionComponent = (props) => {
  return (
    <section tw="flex h-screen text-gray-900">
      {/* Sidebar */}
      <section tw="p-6 pr-1 space-y-4">
        {/* User Info */}
        <UserInformation
          firstName="Agustin"
          lastName="Gonzalez"
          role="Web developer"
        />
        {/* Search */}
        <section tw="flex bg-white rounded p-2 shadow items-center">
          <Search tw="h-5 w-5" />
          <input
            type="text"
            tw="bg-transparent pl-2 pr-2 text-sm"
            placeholder="Jump to"
          />
        </section>
        {/* Navigation */}
        <nav tw="space-y-4">
          <NavigationList />
        </nav>
      </section>
      {/* Content */}
      <section tw="flex-grow p-2">
        <section tw="bg-white rounded-lg h-full p-4 overflow-y-auto shadow">
          {props.children}
        </section>
      </section>
    </section>
  );
};

export default NavBar;
