import 'twin.macro';
import React from 'react';
import 'overlayscrollbars/css/OverlayScrollbars.css';

import TopMenu from '@/components/molecules/top-menu';
import UserHeader from '@/components/molecules/user-info';
import NavigationLinks from '@/components/molecules/navigation-links';
import SearchJourney from '@/components/molecules/search-journey';
import NavigationControls from '@/components/atoms/navigation-controls';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

const Navigation: React.FunctionComponent = (props) => {
  return (
    <section tw="flex flex-col h-screen w-screen overflow-hidden light:(text-gray-900) dark:(text-gray-300)">
      <TopMenu />
      <section tw="flex flex-grow py-2 px-4 space-x-4">
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
        <OverlayScrollbarsComponent
          options={{ scrollbars: { autoHide: 'scroll' } }}
          tw="flex-grow bg-white border-2 dark:(bg-gray-900 border-gray-700) rounded-lg h-full w-full shadow-xl"
        >
          {props.children}
        </OverlayScrollbarsComponent>
      </section>
    </section>
  );
};

export default Navigation;
