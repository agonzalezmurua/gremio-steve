import 'twin.macro';
import React, { useCallback, useContext } from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import { FocusRingFlatStyle } from '_/globals/styles/focus';

import AppContext from '_/contexts/app';

import Avatar from '_/components/atoms/avatar';
import links from '_/services/links';
import Button from '_/components/atoms/button';

import Logout from '_/assets/icons/outline/logout.svg';

const UserInfo: React.FunctionComponent = () => {
  const { isLoggedIn, user, actions } = useContext(AppContext);
  const intl = useIntl();

  const handleLogout = useCallback(() => {
    if (
      isLoggedIn &&
      confirm(
        intl.formatMessage({
          id: 'molecules.user-info.confirmLogout',
          defaultMessage: 'Do you really want to log out?',
          description: 'Log out confirmation message',
        })
      )
    ) {
      actions.logout();
    }
  }, [isLoggedIn]);

  if (isLoggedIn === false) {
    return null;
  }

  return (
    <section tw="flex flex-row items-center space-x-2">
      <Link
        to={links.user.profile({ id: user.id })}
        tw="flex w-full space-x-2 items-center justify-center rounded-lg light:hover:(bg-gray-200) dark:hover:(bg-gray-700) outline-none"
        css={[FocusRingFlatStyle]}
      >
        <Avatar tw="border" size="medium" src={user.avatar_url} />
        {/* Name */}
        <section tw="flex-grow hidden md:(block)">
          <strong>{user.name}</strong>
        </section>
      </Link>
      <Button tw="self-start my-auto" color="default" variant="icon" onClick={handleLogout}>
        <Logout />
      </Button>
    </section>
  );
};

export default UserInfo;
