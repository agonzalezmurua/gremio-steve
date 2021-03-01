import 'twin.macro';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import React from 'react';

import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import HistoryControls from '@/components/molecules/history-controls';
import UserInfo from '@/components/molecules/user-info';
import NavigationLinks from '@/components/molecules/navigation-links';
import SearchJourney from '@/components/molecules/search-journey';

type Props = {
  sidebar: boolean;
};

const SideBar: React.FC<Props> = (props) => {
  return (
    <section tw="h-full flex flex-row overflow-hidden light:(text-gray-900) dark:(text-gray-300) px-4 space-x-4 py-2">
      {/* Sidebar */}
      <section tw="flex-shrink space-y-4 w-20 md:(w-60)">
        <section tw="border-b dark:(border-gray-500) pb-2">
          <HistoryControls />
        </section>
        {/* User Info */}
        <section>
          <UserInfo />
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
  );
};

SideBar.defaultProps = {
  sidebar: true,
};

export default SideBar;
