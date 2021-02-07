import 'twin.macro';
import React from 'react';
import { Link } from 'react-router-dom';

import links from '_links';

import Annotation from '_assets/icons/solid/annotation.svg';
import Bell from '_assets/icons/solid/bell.svg';

import Avatar from '_components/atoms/avatar';
import Button from '_components/atoms/button';
import UserAvailability from '_components/atoms/user-availability';

import ModeBadges from '../mode-badges';

type Props = Pick<
  User,
  | '_id'
  | 'preferences'
  | 'availability'
  | 'avatar_url'
  | 'community_role'
  | 'name'
>;

const UserCard: React.FC<Props> = ({
  preferences,
  availability,
  avatar_url,
  community_role,
  name,
}) => {
  return (
    <section tw="flex space-x-4 flex-grow">
      <Avatar size="big" src={avatar_url} />
      <section tw="flex flex-col justify-between flex-grow">
        <section tw="flex flex-row justify-between">
          {/* User */}
          <section tw="flex flex-col">
            <span tw="text-2xl font-bold dark:(text-white)">
              <Link to={links.user.profile({ id: name })}>{name}</Link>
            </span>
            <span tw="font-bold text-gray-700 dark:(text-gray-300)">
              {community_role}
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
          <ModeBadges modes={preferences} />
          <UserAvailability {...availability} />
        </section>
      </section>
    </section>
  );
};

export default UserCard;
