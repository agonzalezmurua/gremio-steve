import api from '@api';
import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { useAsync } from 'react-use';
import tw, { styled } from 'twin.macro';

import Skeleton from '@components/atoms/Skeleton';

import MusicNote from '@assets/icons/outline/music-note.svg';
import Avatar from '@components/atoms/Avatar';

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
        <section tw="flex items-center h-32 p-4 bg-gray-300">
          {(journey?.title && <h1>{journey.title}</h1>) || (
            <Skeleton tw="w-72 h-16" />
          )}
        </section>
        {/* Meta */}
        <section tw="flex h-16 p-4 bg-gray-200 space-x-4">
          {journey?.metadata || (
            <>
              <Skeleton tw="w-24 h-8" />
              <Skeleton tw="w-24 h-8" />
              <Skeleton tw="w-24 h-8" />
              <Skeleton tw="w-24 h-8" />
            </>
          )}
        </section>
        <section tw="flex w-full h-12 bg-gray-300 justify-center items-center">
          {journey?.open || <Skeleton tw="w-12 h-6" />}
        </section>
        {/* Main Content */}
        <section tw="p-4 space-y-2">
          {(journey?.organizer && <h2>Organizer</h2>) || (
            <Skeleton tw="w-32 h-6" />
          )}
          <section tw="flex space-x-2">
            <Avatar isSkeleton />
            <Skeleton tw="w-48 h-12" />
          </section>
          <section>
            <Skeleton tw="w-full h-64" />
          </section>

          {/* Assigneees */}
          <section>
            <Skeleton tw="w-full h-64" />
          </section>
        </section>
      </article>
    </main>
  );
};

JourneyPage.displayName = `JourneyPage`;

export default JourneyPage;
