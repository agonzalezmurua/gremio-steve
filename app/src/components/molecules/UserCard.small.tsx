import 'twin.macro';
import React from 'react';

import Annotation from '@assets/icons/solid/annotation.svg';
import Bell from '@assets/icons/solid/bell.svg';

import Avatar from '@components/atoms/Avatar';
import Button from '@components/atoms/form-controls/Button';
import GamemodeBadges from './GamemodeBadges';
import UserAvailability from '@components/atoms/UserAvailability';
import links from '@links';
import { Link } from 'react-router-dom';

type Props = Pick<
  User,
  '__id' | 'preferences' | 'availability' | 'avatar' | 'communityRole' | 'name'
>;

const UserCardSmall: React.FC<Props> = ({
  __id,
  preferences,
  availability,
  avatar,
  communityRole,
  name,
}) => {
  return (
    <section tw="flex space-x-4 flex-grow">
      <Avatar size="big" src={avatar.url} />
      <section tw="flex flex-col justify-between flex-grow">
        <section tw="flex flex-row justify-between">
          {/* User */}
          <section tw="flex flex-col">
            <span tw="text-2xl font-bold dark:(text-white)">
              <Link to={links.user.profile({ id: name })}>{name}</Link>
            </span>
            <span tw="font-bold text-gray-700 dark:(text-gray-300)">
              {communityRole}
            </span>
          </section>

          {/* Button */}
          <section tw="space-x-1 ">
            <Button tw="p-1" size="self-contained">
              <Annotation tw="h-5 w-5" />
            </Button>
            <Button tw="p-1" size="self-contained" color="blue">
              <Bell tw="h-5 w-5" />
            </Button>
          </section>
        </section>
        <section tw="flex flex-row space-x-3">
          <GamemodeBadges gamemodes={preferences} />
          <UserAvailability {...availability} />
        </section>
      </section>
    </section>
  );
};

export default UserCardSmall;
