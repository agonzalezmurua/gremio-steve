import React from 'react';
import 'twin.macro';

import UserInfo from '@components/molecules/UserInfo';
import NavigationList from '@components/molecules/NavigationList';
import SearchBeatmap from '../molecules/SearchJourney';
import NavigationControls from '@components/atoms/NavigationControls';

const NavBar: React.FunctionComponent = (props) => {
  return (
    <section tw="flex h-screen w-screen text-gray-900">
      {/* Sidebar */}
      <section tw="flex-shrink p-6 pr-2 space-y-4">
        <section tw="border-b pb-2">
          <NavigationControls />
        </section>
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
        <section tw="bg-white rounded-lg h-full overflow-y-auto shadow">
          {props.children}
        </section>
      </section>
    </section>
  );
};

export default NavBar;
