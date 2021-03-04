import 'twin.macro';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import React from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import * as Styles from './styles';

import HistoryControls from '_/components/molecules/history-controls';
import UserInfo from '_/components/molecules/user-info';
import NavigationLinks from '_/components/molecules/navigation-links';
import SearchJourney from '_/components/organisms/search-journey';

const SideBar: React.FC = (props) => {
  return (
    <Styles.Container>
      {/* Sidebar */}
      <Styles.SideBar>
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
      </Styles.SideBar>
      {/* Content */}
      <OverlayScrollbarsComponent
        tw="
          flex-grow
          bg-white
          border-2
          dark:(bg-gray-900 border-gray-700)
          rounded-lg
          shadow-xl
          overflow-y-auto
        "
        options={{ scrollbars: { autoHide: 'scroll' } }}
      >
        {props.children}
      </OverlayScrollbarsComponent>
    </Styles.Container>
  );
};

export default SideBar;
