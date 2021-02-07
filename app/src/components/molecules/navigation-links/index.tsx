import React, { useContext } from 'react';
import tw, { styled } from 'twin.macro';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import AppContext from 'App.context';
import links from '_links';
import LightNingBolt from '_assets/icons/outline/lightning-bolt.svg';
import Collection from '_assets/icons/outline/collection.svg';
import Bookmark from '_assets/icons/outline/bookmark.svg';
import Plus from '_assets/icons/outline/plus.svg';

const NavigationItem = styled.li`
  ${tw`text-center`}
  a {
    ${tw`inline-flex md:(flex) items-center space-x-4 p-2 cursor-pointer rounded transition-colors duration-100 ease-in-out outline-none`}
  }
  svg {
    ${tw`h-6 w-6`}
  }
`;

export const NavigationList: React.FunctionComponent = () => {
  const {
    currentUser: { _id },
  } = useContext(AppContext);
  return (
    <ul tw="space-y-2 flex-grow">
      <NavigationItem>
        <Link to={links.user.queue({ id: _id })}>
          <Collection />
          <span tw="hidden md:(block)">
            <FormattedMessage
              id="components.molecules.navigationLinks.myQueueLink"
              description="Navigation links, name for link that redirects to 'My Queue'"
              defaultMessage="My Queue"
            />
          </span>
        </Link>
      </NavigationItem>
      <NavigationItem>
        <Link to={links.user.activity({ id: _id })}>
          <LightNingBolt />
          <span tw="hidden md:(block)">
            <FormattedMessage
              id="components.molecules.navigationLinks.activityLink"
              description="Navigation links, name for link that redirects to 'My Activity'"
              defaultMessage="Activity"
            />
          </span>
        </Link>
      </NavigationItem>
      <NavigationItem>
        <Link to={links.user.bookmarks({ id: _id })}>
          <Bookmark />
          <span tw="hidden md:(block)">
            <FormattedMessage
              id="components.molecules.navigationLinks.bookmarksLink"
              description="Navigation links, name for link that redirects to 'Bookmarks'"
              defaultMessage="Bookmarks"
            />
          </span>
        </Link>
      </NavigationItem>
      <NavigationItem>
        <Link to={links.journeys.new()}>
          <Plus />
          <span tw="hidden md:(block)">
            <FormattedMessage
              id="components.molecules.navigationLinks.newJourneyLink"
              description="Navigation links, name for link that redirects to 'New Journey'"
              defaultMessage="New Journey"
            />
          </span>
        </Link>
      </NavigationItem>
    </ul>
  );
};

export default NavigationList;
