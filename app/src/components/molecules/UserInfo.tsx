import React from 'react';
import 'twin.macro';

import Avatar from '@components/atoms/Avatar';
import DotsVerticalIcon from '@assets/icons/solid/dots-vertical.svg';

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
      />
      {/* Name */}
      <section tw="flex flex-grow flex-col items-start">
        <strong>{props.username}</strong>
        {props.role && <span tw="text-xs">{props.role}</span>}
      </section>
      {/* Actions */}
      <DotsVerticalIcon tw="w-5 h-5 self-center" />
    </section>
  );
};

export default UserHeader;
