import 'twin.macro';
import React from 'react';

import JourneyBanner from '@/components/atoms/journey-banner';
import SkeletonLoader from '@/components/atoms/skeleton-loader';
import { FormattedMessage } from 'react-intl';
import UserCard from '@/components/molecules/user-card';
import JourneyStatusBadge from '@/components/atoms/journey-status-badge';
import GameMapTable from '@/components/molecules/beatmapset-table';
import { Definitions } from '@/services/api';

type JourneyTemplateProps = {
  journey: Definitions['Journey'] | null;
};

const JourneyTemplate: React.FC<JourneyTemplateProps> = ({ journey }) => {
  return (
    <section>
      {/* Title */}
      <JourneyBanner
        src={journey?.banner_url}
        tw="h-40 bg-gray-300 space-y-1 dark:bg-gray-800 rounded-t-md"
      />

      <section tw="mx-4 -mt-24 p-3 border space-y-2 rounded-lg bg-white border-gray-300 dark:(bg-gray-900 border-gray-500)">
        <section tw="flex flex-col border-b space-y-2 pb-2 border-gray-300 dark:(border-gray-500)">
          {journey ? (
            <h1>{journey.title}</h1>
          ) : (
            <SkeletonLoader tw="w-72 h-8" />
          )}
          {journey ? (
            <span tw="font-semibold">{journey.artist}</span>
          ) : (
            <SkeletonLoader tw="w-40 h-6" />
          )}
        </section>
        <section tw="flex">
          {journey ? (
            <JourneyStatusBadge status={journey.status} />
          ) : (
            <SkeletonLoader tw="w-16 h-9" />
          )}
        </section>
      </section>

      <section tw="p-4 space-y-8">
        <section tw="space-y-4">
          {journey ? (
            <FormattedMessage
              id="components.templates.journeys.organizerHeader"
              defaultMessage="Organizer"
              description="Journey page, organizer header"
              tagName="h2"
            />
          ) : (
            <SkeletonLoader tw="w-32 h-6" />
          )}
          {/* Organizer */}
          <section tw="flex flex-grow space-x-2">
            {journey ? (
              <UserCard
                id={journey.organizer.id}
                availability={journey.organizer.availability}
                avatar_url={journey.organizer.avatar_url}
                community_role={journey.organizer.community_role}
                name={journey.organizer.name}
                preferences={journey.organizer.preferences}
              />
            ) : (
              <SkeletonLoader tw="w-full h-28" />
            )}
          </section>
        </section>

        {/* Maps */}
        <section tw="space-y-4">
          {journey ? (
            <>
              <FormattedMessage
                id="components.templates.journeys.difficultiesHeader"
                defaultMessage="Diffs"
                description="Journey page, difficulties header"
                tagName="h2"
              />
              <GameMapTable maps={journey.beatmaps} />
            </>
          ) : (
            <>
              <SkeletonLoader tw="w-32 h-6" />
              <SkeletonLoader tw="w-full h-64" />
            </>
          )}
        </section>
      </section>
    </section>
  );
};

export default JourneyTemplate;
