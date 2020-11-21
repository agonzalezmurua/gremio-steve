import React from "react";
import tw, { styled } from "twin.macro";

import UserInfo from "./UserInfo";
import { NavigationList } from "./NavigationList";
import SearchBeatmap from "../../molecules/SearchJourney";

export const NavigationItem = styled.li`
  ${tw`flex items-center space-x-4 hover:bg-gray-300 p-2 cursor-pointer rounded`}
  > svg {
    ${tw`h-6 w-6`}
  }
`;

const NavBar: React.FunctionComponent = (props) => {
  return (
    <section tw="flex h-screen w-screen text-gray-900">
      {/* Sidebar */}
      <section tw="p-6 pr-1 space-y-4 w-72">
        {/* User Info */}
        <section>
          <UserInfo username="Ferret" role="Admin" />
        </section>
        {/* Navigation */}
        <nav>
          <NavigationList />
        </nav>
        <section tw="border-t pt-4 space-y-2">
          <SearchBeatmap />
        </section>
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
