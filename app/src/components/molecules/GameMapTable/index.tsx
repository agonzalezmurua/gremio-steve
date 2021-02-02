import tw, { styled } from 'twin.macro';
import React, { useMemo, useState } from 'react';
import Selector from './Selector';
import Avatar from '@components/atoms/Avatar';
import links from '@links';
import { Link } from 'react-router-dom';
import GamemodeIcon from '@components/atoms/GamemodeIcon';

type Props = {
  maps: GameMap[];
};

const GameMapTable: React.FC<Props> = ({ maps, ...props }) => {
  const gamemaps: {
    [key in GameMap['mode']]: GameMap[];
  } = useMemo(() => {
    const ctb: GameMap[] = [];
    const std: GameMap[] = [];
    const taiko: GameMap[] = [];
    const mania: GameMap[] = [];

    const _maps = maps.sort(() => {
      // TODO: Sorting algorithm based on difficulty ordering
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
  }, [maps]);
  const [selected, setSelected] = useState<Gamemodes>('std');

  return (
    <section {...props} tw="light:text-gray-900 dark:text-white">
      <Selector
        selected={selected}
        onClick={setSelected}
        modes={
          Object.entries(gamemaps)
            .filter(([, entries]) => entries.length !== 0)
            .map(([key]) => key) as Gamemodes[]
        }
      />
      <table tw="w-full rounded-lg rounded-tl-none bg-gray-200 dark:(bg-gray-800)">
        <thead>
          <tr tw="font-bold">
            <td>Asignee</td>
            <td>Difficulty</td>
            <td />
          </tr>
        </thead>
        <tbody>
          {gamemaps[selected].map((map) => (
            <tr key={map._id}>
              <td>
                {map.assignee ? (
                  <div tw="flex space-x-2 items-center">
                    <Avatar size="small" src={map.assignee.avatar.url} />
                    <Link to={links.user.profile({ id: map.assignee.__id })}>
                      {map.assignee.name}
                    </Link>
                  </div>
                ) : null}
              </td>
              <td>
                <div tw="flex space-x-2 items-center">
                  <GamemodeIcon
                    gamemode={map.mode}
                    difficulty={map.difficulty}
                    tw="h-5 w-5"
                  />
                  <span>{map.name}</span>
                </div>
              </td>
              <td>
                <section tw="flex justify-end">
                  <span>Actions here</span>
                </section>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default styled(GameMapTable)`
  table {
    thead,
    tbody {
      tr {
        ${tw`border-b border-gray-300 dark:(border-gray-600)`}
        td {
          ${tw`p-2`}
        }
      }
    }

    td:nth-child(1),
    td:nth-child(3) {
      ${tw`w-1/4`}
    }
    td:nth-child(2) {
      ${tw`w-2/4`}
    }

    tbody {
      tr:last-child {
        ${tw`border-none`}
      }
      tr:nth-child(odd) {
        ${tw`bg-gray-50 dark:(bg-gray-900)`}
      }
    }
  }
`;
