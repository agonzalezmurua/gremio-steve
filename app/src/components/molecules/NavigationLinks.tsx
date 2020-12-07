import React, { useContext } from 'react';
import tw, { styled } from 'twin.macro';
import { Link } from 'react-router-dom';

import LightNingBolt from '@assets/icons/outline/lightning-bolt.svg';
import Collection from '@assets/icons/outline/collection.svg';
import Bookmark from '@assets/icons/outline/bookmark.svg';
import Plus from '@assets/icons/outline/plus.svg';
import links from '@links';
import AppContext from 'AppContext';
import { FocusFlatStyle } from '@globals/ElementFocusStyle';

const NavigationItem = styled.li`
  a {
    ${tw`flex items-center space-x-4 p-2 cursor-pointer rounded transition-colors duration-100 ease-in-out outline-none`}
    &:focus, &:hover {
      ${tw`bg-gray-200`}
    }
    ${FocusFlatStyle}
  }
  svg {
    ${tw`h-6 w-6`}
  }
`;

export const NavigationList: React.FunctionComponent = () => {
  const {
    currentUser: { __id },
  } = useContext(AppContext);
  return (
    <ul tw="space-y-2">
      <NavigationItem>
        <Link to={links.user.queue({ id: __id })}>
          <Collection />
          <span>My Queue</span>
        </Link>
      </NavigationItem>
      <NavigationItem>
        <Link to={links.user.activity({ id: __id })}>
          <LightNingBolt />
          <span>Activity</span>
        </Link>
      </NavigationItem>
      <NavigationItem>
        <Link to={links.user.bookmarks({ id: __id })}>
          <Bookmark />
          <span>Bookmarks</span>
        </Link>
      </NavigationItem>
      <NavigationItem>
        <Link to={links.journeys.new()}>
          <Plus />
          <span>New Journey</span>
        </Link>
      </NavigationItem>
    </ul>
  );
};

export default NavigationList;
