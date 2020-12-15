import tw, { css } from 'twin.macro';
import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import Avatar from '@components/atoms/Avatar';
import Button from '@components/atoms/form-controls/Button';
import Skeleton from '@components/atoms/Skeleton';
import UserAvailability from '@components/atoms/UserAvailability';
import { UserMessages } from '@globals/constants/GenericMessages';

import Markdown from '@components/atoms/Markdown';
import JourneyCard from '@components/molecules/JourneyCard';
import GamemodeBadges from '@components/molecules/GamemodeBadges';

type Props = {
  user?: User;
};

const JourneyGrid: React.FC<{ journeys: Journey[] }> = (props) => {
  return (
    <section tw="grid gap-4 grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {props.journeys.map((journey) => (
        <JourneyCard showStatus={false} key={journey.__id} journey={journey} />
      ))}
    </section>
  );
};

const UserProfileTemplate: React.FC<Props> = (props) => {
  const { open, closed, suspended } = useMemo(() => {
    const open: Journey[] = [];
    const closed: Journey[] = [];
    const suspended: Journey[] = [];

    if (props.user) {
      for (const journey of props.user.journeys) {
        switch (journey.status) {
          case 'open':
            open.push(journey);
            break;
          case 'closed':
            closed.push(journey);
            break;
          case 'suspended':
            suspended.push(journey);
            break;
          default:
            break;
        }
      }
    }

    return {
      open,
      closed,
      suspended,
    };
  }, [props.user?.journeys]);
  return (
    <>
      <section
        css={[
          (!props.user?.banner.url && tw`bg-gray-300`) ||
            css`
              background-image: url(${props.user?.banner.url});
              background-size: cover;
              background-position: 50%;
            `,
        ]}
        tw="h-40 w-full"
      />
      <section tw="space-y-4 -mt-16 p-4">
        <section tw="flex flex-row justify-start items-start space-x-4 top-0">
          <Avatar size="jumbo" src={props.user?.avatar.url} isSkeleton />
          <section tw="flex flex-col self-end flex-grow space-y-1">
            {/* Info */}
            <section tw="flex flex-row flex-grow justify-between">
              {/* Headers */}
              <section tw="truncate space-y-1">
                {(props.user && <h1 tw="text-2xl">{props.user?.name}</h1>) || (
                  <Skeleton tw="h-8 w-60" />
                )}
                {(props.user && (
                  <strong tw="text-lg text-gray-700 dark:(text-gray-300)">
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
                <GamemodeBadges gamemodes={props.user.preferences} />
              )) || <Skeleton tw="w-32 h-8" />}
              <span tw="flex flex-row text-xs text-gray-700 space-x-2">
                <span tw="font-bold text-gray-700 dark:text-gray-300 sm:(hidden) md:(hidden) lg:(hidden) xl:(block)">
                  {(props.user && (
                    <FormattedMessage
                      id="templates.user.profile.availability"
                      defaultMessage="Available for"
                    />
                  )) || <Skeleton tw="h-4 w-24" />}
                </span>
                {(props.user?.availability && (
                  <UserAvailability {...props.user.availability} />
                )) || <Skeleton tw="h-4 w-32" />}
              </span>
            </section>
          </section>
        </section>

        <article>
          {(props.user?.description && (
            <Markdown value={props.user.description} />
          )) || <Skeleton tw="h-16 w-full" />}
        </article>

        {props.user && (
          <FormattedMessage
            id="templates.user.profile.journeys"
            defaultMessage="Journey"
            description="User profile Journeys header"
            tagName="h2"
          />
        )}

        {props.user ? null : (
          <>
            <Skeleton tw="h-8 w-24" />
            <Skeleton tw="h-48 w-full" />
          </>
        )}

        {open.length !== 0 && (
          <>
            <FormattedMessage
              id="templates.user.profile.openJourneys"
              defaultMessage="Open"
              description="User profile open Journeys header"
              tagName="h3"
            />
            <JourneyGrid journeys={open} />
          </>
        )}

        {closed.length !== 0 && (
          <>
            <FormattedMessage
              id="templates.user.profile.closedJourneys"
              defaultMessage="Closed"
              description="User profile closed Journeys header"
              tagName="h3"
            />
            <JourneyGrid journeys={closed} />
          </>
        )}

        {suspended.length !== 0 && (
          <>
            <FormattedMessage
              id="templates.user.profile.suspendedJourneys"
              defaultMessage="Suspended"
              description="User profile suspended Journeys header"
              tagName="h3"
            />
            <JourneyGrid journeys={suspended} />
          </>
        )}
      </section>
    </>
  );
};

export default UserProfileTemplate;
