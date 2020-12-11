import tw, { css } from 'twin.macro';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Avatar from '@components/atoms/Avatar';
import Button from '@components/atoms/form-controls/Button';
import Skeleton from '@components/atoms/Skeleton';
import UserAvailability from '@components/atoms/UserAvailability';
import { UserMessages } from '@globals/constants/GenericMessages';
import Annotation from '@assets/icons/solid/annotation.svg';
import Bell from '@assets/icons/solid/bell.svg';

import { GamemodeIcon } from '../../atoms/GamemodeIcon';
import Markdown from '@components/atoms/Markdown';

type Props = {
  user?: User;
};

const UserProfileTemplate: React.FC<Props> = (props) => {
  return (
    <>
      <section
        css={[
          (!props.user?.banner.url &&
            tw` bg-gradient-to-b from-blue-400 to-blue-600`) ||
            css`
              background-image: url(${props.user?.banner.url});
              background-size: cover;
              background-position: 50%;
            `,
        ]}
        tw="h-40 w-full"
      />
      <section tw="space-y-4 -mt-16 p-4">
        <section tw="flex flex-row justify-start items-start space-x-4">
          <Avatar size="jumbo" src={props.user?.avatar.url} />
          <section tw="flex flex-col self-end flex-grow space-y-1">
            {/* Info */}
            <section tw="flex flex-row flex-grow justify-between">
              {/* Headers */}
              <section tw="truncate space-y-1">
                {(props.user && <h1 tw="text-2xl">{props.user?.name}</h1>) || (
                  <Skeleton tw="h-8 w-60" />
                )}
                {(props.user && (
                  <strong tw="text-lg text-gray-700">
                    {props.user?.communityRole}
                  </strong>
                )) || <Skeleton tw="h-6 w-40" />}
              </section>

              {/* Actions */}
              <section tw="flex flex-col space-y-1 space-x-0 md:(flex-row space-y-0 space-x-1)">
                <Button tw="h-8" variant="small">
                  <FormattedMessage
                    {...UserMessages['generic.user.messageAction']}
                  />
                </Button>
                <Button tw="h-8" color="blue" variant="small">
                  <FormattedMessage
                    {...UserMessages['generic.user.followAction']}
                  />
                </Button>
              </section>
            </section>

            {/* Availability & Preferences */}
            <section tw="flex flex-row items-center space-x-1">
              {(props.user && (
                <section tw="flex space-x-2 bg-gray-100 p-1 rounded-md">
                  {props.user?.preferences.map((mode) => (
                    <GamemodeIcon gamemode={mode} key={mode} tw="h-6 w-6" />
                  ))}
                </section>
              )) || <Skeleton tw="w-80 h-8" />}
              <span tw="flex flex-row text-xs font-bold text-gray-700 space-x-2">
                <span tw="sm:(hidden) md:(hidden) lg:(hidden) xl:(block)">
                  <FormattedMessage
                    id="templates.user.profile.availability"
                    defaultMessage="Available for"
                  />
                </span>
                {props.user?.availability && (
                  <UserAvailability {...props.user.availability} />
                )}
              </span>
            </section>
          </section>
        </section>

        <article>
          {props.user?.description && (
            <Markdown value={props.user.description} />
          )}
        </article>
      </section>
    </>
  );
};

export default UserProfileTemplate;
