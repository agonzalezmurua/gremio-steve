import React from 'react';
import 'twin.macro';

import UserInfo from '@components/molecules/UserInfo';
import NavigationLinks from '@components/molecules/NavigationLinks';
import SearchJourney from '../molecules/SearchJourney';
import NavigationControls from '@components/atoms/NavigationControls';

const NavBar: React.FunctionComponent = (props) => {
  return (
    <section tw="flex h-screen w-screen text-gray-900">
      {/* Sidebar */}
      <section tw="flex-shrink py-6 px-4 pr-2 space-y-4 w-20 md:(w-60)">
        <section tw="border-b pb-2">
          <NavigationControls />
        </section>
        {/* User Info */}
        <section>
          <UserInfo />
        </section>
        {/* Navigation */}
        <nav tw="flex flex-row justify-center md:(justify-start)">
          <NavigationLinks />
        </nav>
        <section tw="border-t pt-4 space-y-2 hidden md:(block)">
          <SearchJourney />
        </section>
      </section>
      {/* Content */}
      <section tw="flex-grow p-2">
        <section tw="bg-white border-2 rounded-lg h-full overflow-y-auto shadow-xl">
          {props.children}
        </section>
      </section>
    </section>
  );
};

export default NavBar;
