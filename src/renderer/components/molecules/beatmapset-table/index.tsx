import tw, { styled } from 'twin.macro';
import React, { useMemo, useState } from 'react';
import Selector from './selector';
import Avatar from '_/components/atoms/avatar';
import links from '_/services/links';
import { Link } from 'react-router-dom';
import ModeIcon from '_/components/atoms/mode-icon';

type Props = {
  maps: Beatmap[];
};

const BeatmapsetTable: React.FC<Props> = ({ maps, ...props }) => {
  const gamemaps: {
    [key in Beatmap['mode']]: Beatmap[];
  } = useMemo(() => {
    const ctb: Beatmap[] = [];
    const std: Beatmap[] = [];
    const taiko: Beatmap[] = [];
    const mania: Beatmap[] = [];

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
  const [selected, setSelected] = useState<Mode>(
    Object.keys(gamemaps)[0] as Mode
  );

  return (
    <section {...props} tw="light:text-gray-900 dark:text-white">
      <Selector
        selected={selected}
        onClick={setSelected}
        modes={
          Object.entries(gamemaps)
            .filter(([, entries]) => entries.length !== 0)
            .map(([key]) => key) as Mode[]
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
                    <Avatar size="small" src={map.assignee.avatar_url} />
                    <Link to={links.user.profile({ id: map.assignee._id })}>
                      {map.assignee.name}
                    </Link>
                  </div>
                ) : null}
              </td>
              <td>
                <div tw="flex space-x-2 items-center">
                  <ModeIcon
                    gamemode={map.mode}
                    difficulty={map.difficulty}
                    tw="h-7 w-7"
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

export default styled(BeatmapsetTable)`
  table {
    thead,
    tbody {
      tr {
        ${tw`border-b border-gray-300 dark:(border-gray-600)`}
        td {
          ${tw`px-2 h-12`}
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
