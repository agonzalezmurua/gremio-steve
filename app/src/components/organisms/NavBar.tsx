import React from 'react';
import 'twin.macro';

import UserHeader from '@components/molecules/UserInfo';
import NavigationLinks from '@components/molecules/NavigationLinks';
import SearchJourney from '@components/molecules/SearchJourney';
import NavigationControls from '@components/atoms/NavigationControls';

const NavBar: React.FunctionComponent = (props) => {
  return (
    <section tw="flex h-screen w-screen text-gray-900 dark:(text-gray-300) py-2 px-4 space-x-4">
      {/* Sidebar */}
      <section tw="flex-shrink space-y-4 w-20 md:(w-60)">
        <section tw="border-b dark:(border-gray-500) pb-2">
          <NavigationControls />
        </section>
        {/* User Info */}
        <section>
          <UserHeader />
        </section>
        {/* Navigation */}
        <nav tw="flex flex-row justify-center md:(justify-start)">
          <NavigationLinks />
        </nav>
        <section tw="border-t dark:(border-gray-500) pt-4 space-y-2 hidden md:(block)">
          <SearchJourney />
        </section>
      </section>
      {/* Content */}
      <section tw="flex-grow">
        <section tw="bg-white border-2 dark:(bg-gray-900 border-gray-700) rounded-lg h-full w-full overflow-y-auto shadow-xl">
          {props.children}
        </section>
      </section>
    </section>
  );
};

export default NavBar;
