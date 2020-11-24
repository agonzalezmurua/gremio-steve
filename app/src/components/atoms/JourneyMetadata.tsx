import React, { useMemo } from 'react';
import tw, { styled } from 'twin.macro';

import Calendar from '@assets/icons/outline/calendar.svg';
import MusicNote from '@assets/icons/outline/music-note.svg';
import DocumentText from '@assets/icons/outline/document-text.svg';
import Clock from '@assets/icons/outline/clock.svg';

const Base = styled.section`
  ${tw`flex items-center space-x-1`}
  > svg {
    ${tw`h-5 w-5`}
  }
`;

const Duration: React.FC<{ value: number }> = (props) => (
  <Base>
    <Clock id="journey-metadata-duration" />
    <label htmlFor="journey-metadata-duration">{props.value}</label>
  </Base>
);

const Genre: React.FC<{ value: string }> = (props) => (
  <Base>
    <DocumentText id="journey-metadata-genre" />
    <label htmlFor="journey-metadata-genre">{props.value}</label>
  </Base>
);

const Bpm: React.FC<{ value: number | number[] }> = (props) => {
  const bpm = useMemo(() => {
    if (typeof props.value === 'number') {
      return props.value;
    } else {
      return `${props.value[0]} ~ ${props.value[props.value.length - 1]}`;
    }
  }, [props.value]);
  return (
    <Base>
      <MusicNote id="journey-metadata-bpm" />
      <label htmlFor="journey-metadata-bpm">{bpm}</label>
    </Base>
  );
};

const Closure: React.FC<{ value: string }> = (props) => (
  <Base>
    <Calendar id="journey-metadata-closure" />
    <label htmlFor="journey-metadata-closure">
      {new Date(props.value).toDateString()}
    </label>
  </Base>
);

const JourneyMetadata = {
  Closure,
  Bpm,
  Genre,
  Duration,
};

export default JourneyMetadata;