import React, { useMemo } from 'react';
import 'twin.macro';

import Input from '@components/atoms/form-controls/Input';
import Label from '@components/atoms/form-controls/Label';
import GameMapDifficultySelect from '@components/atoms/GameMapDifficultySelect';
import GameMapModeSelect from '@components/atoms/GameMapModeSelect';
import Button from '@components/atoms/form-controls/Button';

import Minus from '@assets/icons/outline/minus.svg';
import { useField } from 'formik';
import { GameMapForm } from '@components/templates/journeys/NewJourney.form';

type GameMapFormEntryProps = {
  index: number;
  onDelete?: () => void;
};

const GameMapFormEntry: React.FC<GameMapFormEntryProps> = ({
  onDelete,
  index,
}) => {
  const names = useMemo(
    () => ({
      name: `maps[${index}].name`,
      mode: `maps[${index}].mode`,
      difficulty: `maps[${index}].difficulty`,
    }),
    [index]
  );
  const [name] = useField({
    name: names.name,
    type: 'text',
  });
  const [mode] = useField({ name: names.mode });
  const [difficulty] = useField({ name: names.difficulty });

  return (
    <React.Fragment>
      <Button
        kind="self-contained"
        tw=" h-8 px-2"
        color="red"
        onClick={() => onDelete && onDelete()}
      >
        <Minus tw="h-4 w-4" />
      </Button>

      <Label text="Name" htmlFor={`maps[${index}].name`}>
        <Input {...name} />
      </Label>

      <Label text="Mode" htmlFor={names.mode}>
        <GameMapModeSelect {...mode} />
      </Label>

      <Label text="Difficulty" htmlFor={names.difficulty}>
        <GameMapDifficultySelect {...difficulty} mode={mode.value} />
      </Label>
    </React.Fragment>
  );
};

export default GameMapFormEntry;
