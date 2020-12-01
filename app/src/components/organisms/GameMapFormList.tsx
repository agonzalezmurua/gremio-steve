import React, { useCallback, useState } from 'react';
import uuid from 'uuid';
import { FormattedMessage } from 'react-intl';

import Plus from '@assets/icons/outline/plus.svg';
import Button from '@components/atoms/form-controls/Button';
import GameMapFormEntry from '@components/molecules/GameMapFormEntry';

import Styles from './GameMapFormList.styles';

export const GameMapFormList = () => {
  const [gameMaps, setGameMaps] = useState<
    Array<
      Optional<GameMap, 'assignee' | 'mode' | 'name' | 'status' | 'difficulty'>
    >
  >([]);
  const handleAddGameMap = useCallback(() => {
    setGameMaps((old) => [...old, { __id: uuid.v4() }]);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setGameMaps((old) => {
      const copy = [...old];
      copy.splice(
        old.findIndex(({ __id }) => __id === id),
        1
      );
      return copy;
    });
  }, []);

  return (
    <section css={[Styles.Wrapper]}>
      <Button name="add" onClick={handleAddGameMap}>
        <Plus />
        <span>
          <FormattedMessage
            defaultMessage="Add Game Map"
            description="Add a new GameMap"
          />
        </span>
      </Button>
      <section css={[Styles.GameMaps]}>
        <ul>
          {gameMaps.map(({ __id }) => {
            return (
              <li key={__id}>
                <GameMapFormEntry id={__id} onDelete={handleDelete} />
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
};
