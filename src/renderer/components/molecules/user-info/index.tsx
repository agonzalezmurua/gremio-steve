import 'twin.macro';
import React, { useContext } from 'react';
import AppContext from '@/App.context';
import { Link } from 'react-router-dom';

import Avatar from '@/components/atoms/avatar';
import links from '@/services/links';

const UserInfo: React.FunctionComponent = () => {
  const { isLoggedIn, user } = useContext(AppContext);
  if (isLoggedIn === false) {
    return null;
  }

  return (
    <Link
      to={links.user.profile({ id: user.id })}
      tw="flex space-x-2 items-center justify-center "
    >
      <Avatar tw="border" size="medium" src={user.avatar_url} />
      {/* Name */}
      <section tw="flex-grow hidden md:(block)">
        <strong>{user.name}</strong>
      </section>
    </Link>
  );
};

export default UserInfo;
