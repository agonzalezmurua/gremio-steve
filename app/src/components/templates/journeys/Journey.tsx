import 'twin.macro';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

import Avatar from '@components/atoms/Avatar';
import JourneyBanner from '@components/atoms/JourneyBanner';
import JourneyMetadata from '@components/atoms/JourneyMetadata';
import JourneyStatus from '@components/atoms/JourneyStatus';
import Skeleton from '@components/atoms/Skeleton';
import GameMapLists from '@components/molecules/GameMapLists';
import links from '@links';
import { FormattedMessage } from 'react-intl';
import Markdown from '@components/atoms/Markdown';
import UserCardSmall from '@components/molecules/UserCard.small';
import JourneyStatusBadge from '@components/atoms/JourneyStatusBadge';

type JourneyTemplateProps = {
  journey: Journey | null;
};

const JourneyTemplate: React.FC<JourneyTemplateProps> = ({ journey }) => {
  return (
    <section>
      {/* Title */}
      <JourneyBanner
        src={journey?.banner.url}
        tw="h-40 bg-gray-300 space-y-1 dark:bg-gray-800"
      />

      <section tw="mx-4 -mt-24 p-3 border space-y-2 rounded-lg bg-white border-gray-300 dark:(bg-gray-900 border-gray-500)">
        <section tw="flex flex-col border-b space-y-2 pb-2 border-gray-300 dark:(border-gray-500)">
          {journey?.title ? (
            <h1>{journey.title}</h1>
          ) : (
            <Skeleton tw="w-72 h-8" />
          )}
          {journey?.artist ? (
            <span tw="font-semibold">{journey.artist}</span>
          ) : (
            <Skeleton tw="w-40 h-6" />
          )}
        </section>
        <section tw="flex">
          {journey?.status ? (
            <JourneyStatusBadge status={journey.status} />
          ) : (
            <Skeleton tw="w-16 h-9" />
          )}
        </section>
      </section>

      {/* Meta */}
      {/* <section tw="flex h-16 p-4 bg-gray-100 space-x-4">
        {(journey?.metadata && (
          <>
            <JourneyMetadata.Genre value={journey.metadata.genre} />
            <JourneyMetadata.Bpm value={journey.metadata.bpm} />
            <JourneyMetadata.Closure value={journey.metadata.closure} />
            <JourneyMetadata.Duration value={journey.metadata.duration} />
          </>
        )) || (
          <>
            <Skeleton tw="w-24 h-8" />
            <Skeleton tw="w-24 h-8" />
            <Skeleton tw="w-24 h-8" />
            <Skeleton tw="w-24 h-8" />
          </>
        )}
      </section> */}

      {/* Status */}
      {/* <section tw="flex w-full h-10 bg-gray-300 justify-center items-center">
        {(journey?.status && <JourneyStatus status={journey.status} />) || (
          <Skeleton tw="w-12 h-6" />
        )}
      </section> */}
      {/* Main Content */}
      <section tw="p-4 space-y-8">
        <section tw="space-y-4">
          {(journey?.organizer && (
            <FormattedMessage
              id="components.templates.journeys.organizerHeader"
              defaultMessage="Organizer"
              description="Journey page, organizer header"
              tagName="h2"
            />
          )) || <Skeleton tw="w-32 h-6" />}
          {/* Organizer */}
          <section tw="flex flex-grow space-x-2">
            {(journey?.organizer.name && (
              <UserCardSmall
                __id={journey.organizer.__id}
                availability={journey.organizer.availability}
                avatar={journey.organizer.avatar}
                communityRole={journey.organizer.communityRole}
                name={journey.organizer.name}
                preferences={journey.organizer.preferences}
              />
            )) || <Skeleton tw="w-full h-28" />}
          </section>
        </section>

        {/* Maps */}
        <section tw="space-y-4">
          {(journey?.maps && <GameMapLists maps={journey.maps} />) || (
            <>
              <Skeleton tw="w-32 h-6" />
              <Skeleton tw="w-full h-64" />
            </>
          )}
        </section>
      </section>
    </section>
  );
};

export default JourneyTemplate;
