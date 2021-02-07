import tw, { css } from 'twin.macro';
import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import Avatar from '_components/atoms/avatar';
import Button from '_components/atoms/button';
import SkeletonLoader from '_components/atoms/skeleton-loader';
import UserAvailability from '_components/atoms/user-availability';
import Markdown from '_components/atoms/markdown';

import JourneyCard from '_components/molecules/journey-card';
import ModeBadges from '_components/molecules/mode-badges';

import { UserMessages } from '_constants/messages/generic';

type Props = {
  user?: User;
};

const JourneyGrid: React.FC<{ journeys: Journey[] }> = (props) => {
  return (
    <section tw="grid gap-4 grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {props.journeys.map((journey) => (
        <JourneyCard showStatus={false} key={journey._id} journey={journey} />
      ))}
    </section>
  );
};

const UserProfileTemplate: React.FC<Props> = (props) => {
  const { open, closed, pending } = useMemo(() => {
    const open: Journey[] = [];
    const closed: Journey[] = [];
    const pending: Journey[] = [];

    if (props.user) {
      for (const journey of props.user.journeys) {
        switch (journey.status) {
          case 'open':
            open.push(journey);
            break;
          case 'closed':
            closed.push(journey);
            break;
          case 'pending':
            pending.push(journey);
            break;
          default:
            break;
        }
      }
    }

    return {
      open,
      closed,
      pending,
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
                  <SkeletonLoader tw="h-8 w-60" />
                )}
                {(props.user && (
                  <strong tw="text-lg text-gray-700 dark:(text-gray-300)">
                    {props.user?.community_role}
                  </strong>
                )) || <SkeletonLoader tw="h-6 w-40" />}
              </section>

              {/* Actions */}
              <section tw="flex flex-col space-y-1 space-x-0 md:(flex-row space-y-0 space-x-1)">
                <Button tw="h-8" size="small">
                  <FormattedMessage
                    {...UserMessages['generic.user.messageAction']}
                  />
                </Button>
                <Button tw="h-8" color="blue" size="small">
                  <FormattedMessage
                    {...UserMessages['generic.user.followAction']}
                  />
                </Button>
              </section>
            </section>

            {/* Availability & Preferences */}
            <section tw="flex flex-row items-center space-x-1">
              {(props.user && (
                <ModeBadges modes={props.user.preferences} />
              )) || <SkeletonLoader tw="w-32 h-8" />}
              <span tw="flex flex-row text-xs text-gray-700 space-x-2">
                <span tw="font-bold text-gray-700 dark:text-gray-300 sm:(hidden) md:(hidden) lg:(hidden) xl:(block)">
                  {(props.user && (
                    <FormattedMessage
                      id="templates.user.profile.availability"
                      defaultMessage="Available for"
                    />
                  )) || <SkeletonLoader tw="h-4 w-24" />}
                </span>
                {(props.user?.availability && (
                  <UserAvailability {...props.user.availability} />
                )) || <SkeletonLoader tw="h-4 w-32" />}
              </span>
            </section>
          </section>
        </section>

        <article>
          {(props.user?.description && (
            <Markdown value={props.user.description} />
          )) || <SkeletonLoader tw="h-16 w-full" />}
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
            <SkeletonLoader tw="h-8 w-24" />
            <SkeletonLoader tw="h-48 w-full" />
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

        {pending.length !== 0 && (
          <>
            <FormattedMessage
              id="templates.user.profile.suspendedJourneys"
              defaultMessage="Suspended"
              description="User profile suspended Journeys header"
              tagName="h3"
            />
            <JourneyGrid journeys={pending} />
          </>
        )}
      </section>
    </>
  );
};

export default UserProfileTemplate;
