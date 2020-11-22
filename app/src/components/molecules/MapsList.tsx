import React, { useMemo } from 'react';
import tw, { styled } from 'twin.macro';

import Standard from '@assets/icons/steve/standard.svg';
import CatchTheBeat from '@assets/icons/steve/catch_the_beat.svg';
import Taiko from '@assets/icons/steve/taiko.svg';

type MapsProps = {
  maps: DifficultyMap[];
};

const MapTypeIcon: React.FC<{
  type: DifficultyMap['type'];
  difficulty: DifficultyMap['difficulty'];
}> = (props) => {
  switch (props.type) {
    case 'std':
      return <Standard data-difficulty={props.difficulty} />;
    case 'ctb':
      return <CatchTheBeat />;
    case 'taiko':
      return <Taiko />;
    default:
      return null;
  }
};

const MapsList: React.FC<MapsProps> = (props) => {
  const {
    ctb,
    std,
    taiko,
  }: {
    [key in DifficultyMap['type']]: DifficultyMap[];
  } = useMemo(() => {
    const ctb: DifficultyMap[] = [];
    const std: DifficultyMap[] = [];
    const taiko: DifficultyMap[] = [];

    const _maps = props.maps.sort((a, b) => {
      if (a.index > b.index) {
        return 1;
      }
      if (a.index < b.index) {
        return -1;
      }
      return 0;
    });

    _maps.map((diff) => {
      switch (diff.type) {
        case 'ctb':
          ctb.push(diff);
          break;
        case 'std':
          std.push(diff);
        case 'taiko':
          taiko.push(diff);
        default:
          break;
      }
    });

    return {
      ctb,
      std,
      taiko,
    };
  }, [props.maps]);

  return (
    <section {...props}>
      {std && (
        <section>
          <h2>Standard</h2>
          <ul>
            {std.map((map) => (
              <li key={map.__id} tw="flex items-center space-x-2">
                <MapTypeIcon type={map.type} difficulty={map.difficulty} />
                <span>{map.name}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </section>
  );
};

export default styled(MapsList)`
  li {
    svg {
      ${tw`h-6 w-6`}
      & [data-difficulty="easy"] {
        ${tw`text-green-500`}
      }
    }
  }
`;
