import 'twin.macro';
import React, { useContext } from 'react';
import AppContext from 'AppContext';
import { Link } from 'react-router-dom';

import Avatar from '@components/atoms/avatar';
import links from '@links';

const UserHeader: React.FunctionComponent = () => {
  const {
    currentUser: { avatar, name, _id },
  } = useContext(AppContext);
  return (
    <Link
      to={links.user.profile({ id: _id })}
      tw="flex space-x-2 items-center justify-center "
    >
      <Avatar tw="border" size="medium" src={avatar.url} />
      {/* Name */}
      <section tw="flex-grow hidden md:(block)">
        <strong>{name}</strong>
      </section>
    </Link>
  );
};

export default UserHeader;
