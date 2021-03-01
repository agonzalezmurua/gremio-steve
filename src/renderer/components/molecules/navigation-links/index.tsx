import React, { useContext } from 'react';
import tw, { styled } from 'twin.macro';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import AppContext from '_/contexts/app';
import links from '_/services/links';

import LightNingBolt from '_/assets/icons/outline/lightning-bolt.svg';
import Collection from '_/assets/icons/outline/collection.svg';
import Bookmark from '_/assets/icons/outline/bookmark.svg';
import Plus from '_/assets/icons/outline/plus.svg';
import User from '_/assets/icons/outline/user.svg';

const NavigationItem = styled.li`
  ${tw`text-center rounded transition-colors duration-100 light:hover:(bg-gray-200) dark:hover:(bg-gray-700)`}
  a {
    ${tw`
      inline-flex
      md:(flex)
      items-center
      space-x-4
      p-2
      cursor-pointer
      rounded
      transition-colors
      duration-100
      ease-in-out
      outline-none
      no-underline
    `}
  }
  svg {
    ${tw`h-6 w-6`}
  }
`;

export const NavigationLinks: React.FunctionComponent = () => {
  const { user, isLoggedIn } = useContext(AppContext);

  return (
    <ul tw="space-y-2 flex-grow">
      {isLoggedIn === false ? (
        <NavigationItem>
          <Link to={links.pages.login()}>
            <User />
            <span tw="hidden md:(block)">
              <FormattedMessage
                id="components.molecules.navigationLinks.loginLink"
                description="Navigation links, name for link that redirects to 'Log in'"
                defaultMessage="Log in"
              />
            </span>
          </Link>
        </NavigationItem>
      ) : (
        <>
          <NavigationItem>
            <Link to={links.user.queue({ id: user.id })}>
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
            <Link to={links.user.activity({ id: user.id })}>
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
            <Link to={links.user.bookmarks({ id: user.id })}>
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
        </>
      )}
    </ul>
  );
};

export default NavigationLinks;
