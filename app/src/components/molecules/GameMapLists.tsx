import React, { useMemo } from 'react';
import tw, { styled } from 'twin.macro';
import { Link } from 'react-router-dom';

import links from '@links';

import Standard from '@assets/icons/steve/standard.svg';
import CatchTheBeat from '@assets/icons/steve/catch_the_beat.svg';
import Taiko from '@assets/icons/steve/taiko.svg';
import Alert from '@assets/icons/steve/alert.svg';
import Cross from '@assets/icons/steve/cross.svg';
import Neutral from '@assets/icons/steve/neutral.svg';
import Tick from '@assets/icons/steve/tick.svg';

import Avatar from '@components/atoms/Avatar';
import Button from '@components/atoms/form-controls/Button';

type MapsProps = {
  maps: GameMap[];
};

const GamemapTypeItem: React.FC<GameMap> = (props) => {
  const Icon = useMemo(() => {
    const iconProps = { 'data-difficulty': props.difficulty };
    switch (props.mode) {
      case 'std':
        return <Standard {...iconProps} />;
      case 'ctb':
        return <CatchTheBeat {...iconProps} />;
      case 'taiko':
        return <Taiko {...iconProps} />;
      default:
        return null;
    }
  }, [props.mode]);
  const Status = useMemo(() => {
    const iconProps = { 'data-status': props.status };
    switch (props.status) {
      case 'alert':
        return <Alert {...iconProps} />;
      case 'problem':
        return <Cross {...iconProps} />;
      case 'ready':
        return <Tick {...iconProps} />;
      case 'pending':
      default:
        return <Neutral {...iconProps} />;
    }
  }, [props.status]);

  return (
    <li tw="grid grid-cols-3 gap-4 p-1">
      {/* Status */}
      <section tw="flex col-span-2 items-center space-x-2" className="status">
        <span>{Status}</span>
        {/* Assignee */}
        <span>
          <Avatar size="small" src={props.assignee?.avatar.url} />
        </span>
        <span tw="flex-grow">
          {(props.assignee && (
            <Link to={links.user[':id']({ id: props.assignee?.__id })}>
              {props.assignee.name}
            </Link>
          )) ||
            'Unasigned'}
        </span>
        {!props.assignee && (
          <Button tw="justify-self-end self-end">Apply</Button>
        )}
      </section>
      {/* Difficulty */}
      <section tw="flex items-center space-x-2" className="difficulty">
        <span>{Icon}</span>
        <span tw="text-sm">{props.name}</span>
      </section>
    </li>
  );
};

const GameMapList: React.FC<{ maps: GameMap[]; title: string }> = (props) => (
  <section>
    <h3>{props.title}</h3>
    <ul>
      {props.maps.map((map) => (
        <GamemapTypeItem
          key={map.__id}
          __id={map.__id}
          mode={map.mode}
          difficulty={map.difficulty}
          name={map.name}
          status={map.status}
          assignee={map.assignee}
          index={map.index}
        />
      ))}
    </ul>
  </section>
);

const GameMapLists: React.FC<MapsProps> = (props) => {
  const {
    ctb,
    std,
    taiko,
    mania,
  }: {
    [key in GameMap['mode']]: GameMap[];
  } = useMemo(() => {
    const ctb: GameMap[] = [];
    const std: GameMap[] = [];
    const taiko: GameMap[] = [];
    const mania: GameMap[] = [];

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
      switch (diff.mode) {
        case 'ctb':
          ctb.push(diff);
          break;
        case 'std':
          std.push(diff);
          break;
        case 'taiko':
          taiko.push(diff);
          break;
        case 'mania':
          mania.push(diff);
          break;
        default:
          break;
      }
    });

    return {
      ctb,
      std,
      taiko,
      mania,
    };
  }, [props.maps]);

  return (
    <section {...props}>
      <h2>Maps</h2>
      {Boolean(std.length) && <GameMapList title="Standard" maps={std} />}
      {Boolean(taiko.length) && <GameMapList title="Taiko" maps={taiko} />}
      {Boolean(ctb.length) && <GameMapList title="Catch the beat" maps={ctb} />}
      {Boolean(mania.length) && <GameMapList title="Mania" maps={ctb} />}
    </section>
  );
};

export default styled(GameMapLists)`
  li {
    .status svg {
      ${tw`h-5 w-5`}
      &[data-status="alert"] {
        ${tw`text-red-500`}
      }
      &[data-status='problem'] {
        ${tw`text-yellow-500`}
      }
      &[data-status='ready'] {
        ${tw`text-green-500`}
      }
      &[data-status='pending'] {
        ${tw`text-gray-500`};
      }
    }
    .difficulty svg {
      ${tw`h-6 w-6`}
      &[data-difficulty="easy"] {
        ${tw`text-green-500`}
      }
      &[data-difficulty='normal'] {
        ${tw`text-blue-500`}
      }
      &[data-difficulty='hard'] {
        ${tw`text-yellow-500`}
      }
      &[data-difficulty='insane'] {
        ${tw`text-red-500`}
      }
      &[data-difficulty='expert'] {
        ${tw`text-purple-500`}
      }
      &[data-difficulty='expert+'] {
        ${tw`text-gray-900`}
      }
    }

    &:not(:first-child) {
      ${tw`border-t`}
    }
  }
`;
