import api from '@api';
import React from 'react';
import { generatePath } from 'react-router';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import { useAsync } from 'react-use';
import 'twin.macro';

import Skeleton from '@components/atoms/Skeleton';

import Avatar from '@components/atoms/Avatar';
import JourneyMetadata from '@components/atoms/JourneyMetadata';
import JourneyStatus from '@components/atoms/JourneyStatus';
import JourneyBanner from '@components/atoms/JourneyBanner';
import MapsList from '@components/molecules/MapsList';

type RouteProps = {
  id: string;
};

const JourneyPage: React.FC<RouteComponentProps<RouteProps>> = (props) => {
  const {
    match: {
      params: { id },
    },
  } = props;
  const { value: journey = null, error } = useAsync(async () => {
    const response = await api.journeys.getById(id);
    return response.data;
  }, [id]);

  if (error) {
    return <Redirect to="/not-found" />;
  }

  return (
    <main tw="relative h-full">
      <article>
        {/* Title */}
        <JourneyBanner
          src={journey?.banner.url}
          tw="flex flex-col p-4 bg-gray-300 space-y-1"
        >
          {(journey?.title && <h1>{journey.title}</h1>) || (
            <Skeleton tw="w-72 h-12" />
          )}
          {(journey?.artist && <span>{journey.artist}</span>) || (
            <Skeleton tw="w-40 h-8" />
          )}
        </JourneyBanner>
        {/* Meta */}
        <section tw="flex h-16 p-4 bg-gray-200 space-x-4">
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
              {<p>{journey?.description}</p> || <Skeleton tw="w-full h-64" />}
            </section>
          </section>

          {/* Maps */}
          <section tw="space-y-2">
            {(journey?.maps && <MapsList maps={journey.maps} />) || (
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

JourneyPage.displayName = `JourneyPage`;

export default JourneyPage;
