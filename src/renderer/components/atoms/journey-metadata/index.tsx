import React, { useMemo } from 'react';
import tw, { styled } from 'twin.macro';

import Calendar from '_/assets/icons/outline/calendar.svg';
import MusicNote from '_/assets/icons/outline/music-note.svg';
import DocumentText from '_/assets/icons/outline/document-text.svg';
import Clock from '_/assets/icons/outline/clock.svg';
import useMs from '_/hooks/useMs';

const Base = styled.section`
  ${tw`flex items-center space-x-1`}
  > svg {
    ${tw`h-5 w-5`}
  }
`;

const Duration: React.FC<{ value: number }> = (props) => {
  const ms = useMs();

  return (
    <Base>
      <Clock id="journey-metadata-duration" />
      <label htmlFor="journey-metadata-duration">
        {ms(props.value, { long: true })}
      </label>
    </Base>
  );
};

const Genre: React.FC<{ value: string }> = (props) => (
  <Base>
    <DocumentText id="journey-metadata-genre" />
    <label htmlFor="journey-metadata-genre">{props.value}</label>
  </Base>
);

const Bpm: React.FC<{ value: number[] }> = (props) => {
  const bpm = useMemo(() => {
    if (props.value.length === 1) {
      return props.value[0];
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

const Closure: React.FC<{ value?: string }> = (props) =>
  (props.value && (
    <Base>
      <Calendar id="journey-metadata-closure" />
      <label htmlFor="journey-metadata-closure">
        {new Date(props.value).toDateString()}
      </label>
    </Base>
  )) ||
  null;

const JourneyMetadata = {
  Closure,
  Bpm,
  Genre,
  Duration,
};

export default JourneyMetadata;
