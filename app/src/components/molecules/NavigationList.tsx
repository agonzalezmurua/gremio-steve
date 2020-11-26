import React from 'react';
import tw, { styled } from 'twin.macro';
import { Link } from 'react-router-dom';

import LightNingBolt from '@assets/icons/outline/lightning-bolt.svg';
import Collection from '@assets/icons/outline/collection.svg';
import Bookmark from '@assets/icons/outline/bookmark.svg';
import Plus from '@assets/icons/outline/plus.svg';
import { link } from 'fs';
import links from '@links';

const NavigationItem = styled.li`
  > a {
    ${tw`flex items-center space-x-4 hover:bg-gray-300 p-2 cursor-pointer rounded transition-colors duration-200 ease-in-out`}
  }
  svg {
    ${tw`h-6 w-6`}
  }
`;

export const NavigationList: React.FunctionComponent = () => {
  return (
    <ul tw="space-y-2">
      <NavigationItem>
        <Link to="#">
          <Collection />
          <span>My Queue</span>
        </Link>
      </NavigationItem>
      <NavigationItem>
        <Link to="#">
          <LightNingBolt />
          <span>Activity</span>
        </Link>
      </NavigationItem>
      <NavigationItem>
        <Link to="#">
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
