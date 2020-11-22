import React from 'react';
import tw, { styled } from 'twin.macro';
import { Link } from 'react-router-dom';

import LightNingBolt from '@assets/icons/outline/lightning-bolt.svg';
import Collection from '@assets/icons/outline/collection.svg';
import Bookmark from '@assets/icons/outline/bookmark.svg';
import Home from '@assets/icons/outline/home.svg';

const NavigationItem = styled.li`
  ${tw`flex items-center space-x-4 hover:bg-gray-300 p-2 cursor-pointer rounded`}
  > svg {
    ${tw`h-6 w-6`}
  }
`;

export const NavigationList: React.FunctionComponent = () => {
  return (
    <ul tw="space-y-2">
      <Link to="/">
        <NavigationItem>
          <Home />
          <span>Home</span>
        </NavigationItem>
      </Link>
      <NavigationItem>
        <Collection />
        <span>My Queue</span>
      </NavigationItem>
      <NavigationItem>
        <LightNingBolt />
        <span>Activity</span>
      </NavigationItem>
      <NavigationItem>
        <Bookmark />
        <span>Bookmarks</span>
      </NavigationItem>
    </ul>
  );
};

export default NavigationList;
