import React, { useContext } from 'react';
import 'twin.macro';

import Avatar from '@components/atoms/Avatar';
import Cog from '@assets/icons/solid/cog.svg';
import AppContext from 'AppContext';

const UserHeader: React.FunctionComponent = () => {
  const {
    currentUser: { avatar, name },
  } = useContext(AppContext);
  return (
    <section tw="flex flex-grow space-x-4 w-64">
      <Avatar
        tw="border"
        size="medium"
        src={avatar.url}
        alt="Current logged user profile image"
      />
      {/* Name */}
      <section tw="flex flex-grow flex-col items-start justify-center">
        <strong>{name}</strong>
      </section>
      {/* Actions */}
      <Cog tw="w-6 h-6 self-center transition-opacity hover:(opacity-75) cursor-pointer" />
    </section>
  );
};

export default UserHeader;
