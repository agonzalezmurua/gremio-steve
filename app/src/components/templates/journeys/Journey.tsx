import 'twin.macro';
import React from 'react';

import JourneyBanner from '@components/atoms/JourneyBanner';
import Skeleton from '@components/atoms/Skeleton';
import { FormattedMessage } from 'react-intl';
import UserCardSmall from '@components/molecules/UserCard.small';
import JourneyStatusBadge from '@components/atoms/JourneyStatusBadge';
import GameMapTable from '@components/molecules/GameMapTable';

type JourneyTemplateProps = {
  journey: Journey | null;
};

const JourneyTemplate: React.FC<JourneyTemplateProps> = ({ journey }) => {
  return (
    <section>
      {/* Title */}
      <JourneyBanner
        src={journey?.banner.url}
        tw="h-40 bg-gray-300 space-y-1 dark:bg-gray-800 rounded-t-md"
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
          {(journey?.maps && (
            <>
              <FormattedMessage
                id="components.templates.journeys.difficultiesHeader"
                defaultMessage="Diffs"
                description="Journey page, difficulties header"
                tagName="h2"
              />
              <GameMapTable maps={journey.maps} />
            </>
          )) || (
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
