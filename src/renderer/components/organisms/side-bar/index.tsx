import 'twin.macro';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import React from 'react';

import * as Styles from './styles';

import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import HistoryControls from '_/components/molecules/history-controls';
import UserInfo from '_/components/molecules/user-info';
import NavigationLinks from '_/components/molecules/navigation-links';
import SearchJourney from '_/components/molecules/search-journey';

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
      <Styles.Content>{props.children}</Styles.Content>
    </Styles.Container>
  );
};

SideBar.defaultProps = {
  sidebar: true,
};

export default SideBar;
