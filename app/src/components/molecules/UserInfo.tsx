import React from 'react';
import 'twin.macro';

import Avatar from '@components/atoms/Avatar';
import Cog from '@assets/icons/solid/cog.svg';

type UserHeaderProps = {
  username: string;
  role?: string;
};

const UserHeader: React.FunctionComponent<UserHeaderProps> = (props) => {
  return (
    <section tw="flex flex-grow space-x-4 w-64">
      <Avatar
        tw="border"
        size="medium"
        src="https://a.ppy.sh/1869277?1462143398.jpg"
        alt="Current logged user profile image"
      />
      {/* Name */}
      <section tw="flex flex-grow flex-col items-start">
        <strong>{props.username}</strong>
        {props.role && <span tw="text-xs">{props.role}</span>}
      </section>
      {/* Actions */}
      <Cog tw="w-6 h-6 self-center transition-opacity hover:(opacity-75) cursor-pointer" />
    </section>
  );
};

export default UserHeader;
