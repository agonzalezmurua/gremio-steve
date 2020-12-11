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
    <section tw="flex space-x-2 items-center justify-center ">
      <Avatar
        tw="border"
        size="medium"
        src={avatar.url}
        alt="Current logged user profile image"
      />
      {/* Name */}
      <section tw="flex-grow hidden md:(block)">
        <strong>{name}</strong>
      </section>
      {/* Actions */}
      <Cog tw="w-6 h-6 self-center transition-opacity hover:(opacity-75) cursor-pointer hidden md:(block)" />
    </section>
  );
};

export default UserHeader;
