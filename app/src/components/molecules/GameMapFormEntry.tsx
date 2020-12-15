import React, { useMemo } from 'react';
import 'twin.macro';

import Input from '@components/atoms/form-controls/Input';
import Label from '@components/atoms/form-controls/Label';
import GameMapDifficultySelect from '@components/atoms/GameMapDifficultySelect';
import GameMapModeSelect from '@components/atoms/GameMapModeSelect';
import Button from '@components/atoms/form-controls/Button';

import Trash from '@assets/icons/outline/trash.svg';
import { useField } from 'formik';

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
  const [name, nameMeta] = useField({
    name: names.name,
    type: 'text',
  });
  const [mode] = useField({ name: names.mode });
  const [difficulty] = useField({ name: names.difficulty });

  return (
    <React.Fragment>
      <Button
        variant="self-contained"
        tw="h-8 p-2"
        color="red"
        onClick={onDelete}
      >
        <Trash tw="h-4 w-4" />
      </Button>

      <Label tw="flex-grow" text="Name" htmlFor={`maps[${index}].name`}>
        <Input {...name} error={nameMeta.error} />
      </Label>

      <Label tw="flex-grow" text="Mode" htmlFor={names.mode}>
        <GameMapModeSelect {...mode} />
      </Label>

      <Label tw="flex-grow" text="Difficulty" htmlFor={names.difficulty}>
        <GameMapDifficultySelect {...difficulty} mode={mode.value} />
      </Label>
    </React.Fragment>
  );
};

export default GameMapFormEntry;
