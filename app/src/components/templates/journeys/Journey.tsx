import 'twin.macro';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { generatePath, Link } from 'react-router-dom';

import Avatar from '@components/atoms/Avatar';
import JourneyBanner from '@components/atoms/JourneyBanner';
import JourneyMetadata from '@components/atoms/JourneyMetadata';
import JourneyStatus from '@components/atoms/JourneyStatus';
import Skeleton from '@components/atoms/Skeleton';
import GameMapLists from '@components/molecules/GameMapLists';

type JourneyTemplateProps = {
  journey: Journey | null;
};

const JourneyTemplate: React.FC<JourneyTemplateProps> = ({ journey }) => {
  return (
    <main tw="relative h-full">
      <article>
        {/* Title */}
        <JourneyBanner
          src={journey?.banner.url}
          tw="flex flex-col p-4 bg-gray-300 space-y-1 bg-gray-900 relative"
        >
          {(journey?.title && <h1>{journey.title}</h1>) || (
            <Skeleton tw="w-72 h-12" />
          )}
          {(journey?.artist && (
            <span tw="font-semibold">{journey.artist}</span>
          )) || <Skeleton tw="w-40 h-8" />}
        </JourneyBanner>
        {/* Meta */}
        <section tw="flex h-16 p-4 bg-gray-100 space-x-4">
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
        </section>
        {/* Status */}
        <section tw="flex w-full h-10 bg-gray-300 justify-center items-center">
          {(journey?.status && <JourneyStatus status={journey.status} />) || (
            <Skeleton tw="w-12 h-6" />
          )}
        </section>
        {/* Main Content */}
        <section tw="p-4 space-y-4">
          <section tw="space-y-2">
            {(journey?.organizer && <h2>Organizer</h2>) || (
              <Skeleton tw="w-32 h-6" />
            )}
            <section tw="flex space-x-2">
              <Avatar isSkeleton src={journey?.organizer.avatar.url} />
              {(journey?.organizer.name && (
                <section>
                  <Link
                    to={generatePath('/user/:id', {
                      id: journey.organizer.__id,
                    })}
                  >
                    {journey.organizer.name}
                  </Link>
                </section>
              )) || <Skeleton tw="w-48 h-12" />}
            </section>
            <section>
              {(journey?.description && (
                // eslint-disable-next-line react/no-children-prop
                <ReactMarkdown children={journey?.description} />
              )) || <Skeleton tw="w-full h-64" />}
            </section>
          </section>

          {/* Maps */}
          <section tw="space-y-2">
            {(journey?.maps && <GameMapLists maps={journey.maps} />) || (
              <>
                <Skeleton tw="w-32 h-6" />
                <Skeleton tw="w-full h-64" />
              </>
            )}
          </section>
        </section>
      </article>
    </main>
  );
};

export default JourneyTemplate;
